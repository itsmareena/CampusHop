-- CampusHop: every migration, in order, in one run.
--
-- Paste this whole file into the Supabase SQL editor and run it once.
-- Every statement is idempotent, so running it again is harmless — use
-- it to bring a database up to date whatever state it is starting from.
--
-- The individual files (001 … 004) are kept alongside this one for
-- reference; this is only their contents concatenated.


-- ============================================================
-- 001 — store real road routes on each ride
-- ============================================================
--
-- The route is computed once, when a driver posts a ride, and saved here.
-- Browsing the ride board then costs zero routing API calls.

alter table rides
  add column if not exists pickup_lat       double precision,
  add column if not exists pickup_lng       double precision,
  add column if not exists dropoff_lat      double precision,
  add column if not exists dropoff_lng      double precision,
  add column if not exists route_geometry   jsonb,
  add column if not exists distance_meters  integer,
  add column if not exists duration_seconds integer;


-- ============================================================
-- 002 — one request per rider, per ride
-- ============================================================
--
-- The API already refuses a second request, but that check and the insert
-- are two separate round trips: two clicks landing at the same moment can
-- both pass it. This index is what actually makes it impossible.

-- Collapse any duplicates that already exist, keeping the earliest — the
-- request that genuinely came first. The index cannot be created while
-- duplicate rows are still present.
delete from trip_requests a
using trip_requests b
where a.ride_id = b.ride_id
  and a.rider_id = b.rider_id
  and a.created_at > b.created_at;

create unique index if not exists trip_requests_one_per_rider
  on trip_requests (ride_id, rider_id);

-- Requests are answered oldest-first, so the driver's queue is ordered by
-- arrival. This index keeps that read cheap.
create index if not exists trip_requests_ride_created
  on trip_requests (ride_id, created_at);


-- ============================================================
-- 003 — the vehicle a driver actually turns up in
-- ============================================================
--
-- A rider standing on a kerb needs to know which car is theirs. The
-- profile already said "car"; it never said which one.

alter table profiles
  add column if not exists vehicle_number text;


-- ============================================================
-- 004 — a number to ring
-- ============================================================
--
-- Only ever shown between a driver and a rider whose request has been
-- accepted. Browsing the board never reveals one.

alter table profiles
  add column if not exists phone text;


-- ============================================================
-- 005 — live tracking
-- ============================================================
--
-- Where the driver is, and how far along the trip is. Read back only by
-- the riders they have accepted; the API enforces that, not the client.

alter table rides
  add column if not exists live_lat     double precision,
  add column if not exists live_lng     double precision,
  add column if not exists live_heading double precision,
  add column if not exists live_at      timestamptz,

  -- scheduled -> to_pickup -> arrived -> started -> completed
  add column if not exists trip_status  text default 'scheduled';

create index if not exists rides_driver_trip_status
  on rides (driver_id, trip_status);


-- ============================================================
-- 006 — an address to notify people at
-- ============================================================
--
-- Notifications are about reaching the *other* person: the driver who is
-- not looking at the app when a seat is requested, the rider waiting on
-- an answer. The API can read the caller's own email from their token,
-- but never anybody else's, so each profile carries its owner's address.
-- It is written from the verified token, never the request body.

alter table profiles
  add column if not exists email text;

create index if not exists profiles_email_idx on profiles (email);

-- 007 — messages, and reporting a trip that went wrong
--
-- See 007_messages_and_reports.sql for the reasoning. Threads belong to an
-- accepted request, so they exist only between two people actually
-- travelling together; reports outlive the trip they refer to, because a
-- report about a deleted ride is exactly the one worth keeping.
 create if not exists trip_messages (
  id         uuid primary key default gen_random_uuid(),

  -- The thread. One per accepted request, cascading: if the trip itself is
  -- removed there is nobody left who is allowed to read this.
  request_id uuid not null references trip_requests (id) on delete cascade,
  sender_id  uuid not null references profiles (id) on delete cascade,

  body       text not null,
  created_at timestamptz not null default now(),

  -- Set when the *other* person has loaded the thread. Drives the unread
  -- count, nothing more.
  read_at    timestamptz
);

-- Every read is "this thread, in order", which is exactly this index.
create index if not exists trip_messages_thread
  on trip_messages (request_id, created_at);

-- Counting what the other person has not read yet.
create index if not exists trip_messages_unread
  on trip_messages (request_id, sender_id) where read_at is null;

create table if not exists safety_reports (
  id          uuid primary key default gen_random_uuid(),

  -- Null rather than cascade: the trip may be gone, the report stands.
  request_id  uuid references trip_requests (id) on delete set null,
  ride_id     uuid references rides (id) on delete set null,

  reporter_id uuid not null references profiles (id) on delete cascade,

  -- Who it is about. Null is allowed for a report about the trip itself
  -- rather than about a person.
  subject_id  uuid references profiles (id) on delete set null,

  -- Kept as text with a check rather than an enum: adding a category to an
  -- enum needs a migration, and this list will grow.
  category    text not null check (category in (
    'unsafe_driving',
    'no_show',
    'wrong_vehicle',
    'harassment',
    'payment',
    'other'
  )),

  details     text,

  -- open -> reviewing -> resolved | dismissed. Moved by whoever handles
  -- these; the app only ever writes 'open'.
  status      text not null default 'open',

  created_at  timestamptz not null default now()
);

-- "What has been reported about this person" — the question that matters
-- when deciding whether an account should keep driving.
create index if not exists safety_reports_subject
  on safety_reports (subject_id, created_at desc);

-- "What have I reported", for showing someone their own history.
create index if not exists safety_reports_reporter
  on safety_reports (reporter_id, created_at desc);

-- One report per person, per trip, per category. A second click, or a
-- second tab, is not a second incident.
create unique index if not exists safety_reports_one_per_trip
  on safety_reports (reporter_id, request_id, category)
  where request_id is not null;

-- Note on row-level security: like the other tables here, these are
-- reached only through the API, which resolves the caller from a signed
-- token and decides who may read what. Nothing in the browser holds a key
-- that can touch them directly.
--
-- What has been reported, most recent first:
--
--   select r.created_at, r.category, r.status,
--          reporter.name as by, subject.name as about, r.details
--   from safety_reports r
--   left join profiles reporter on reporter.id = r.reporter_id
--   left join profiles subject  on subject.id  = r.subject_id
--   order by r.created_at desc;

-- ============================================================
-- Check it worked
-- ============================================================
--
-- Should list: vehicle_number, phone, email, and the ride columns.

select table_name, column_name
from information_schema.columns
where (table_name = 'profiles' and column_name in ('vehicle_number', 'phone', 'email'))
   or (table_name = 'rides' and column_name in (
        'pickup_lat', 'pickup_lng', 'dropoff_lat', 'dropoff_lng',
        'route_geometry', 'distance_meters', 'duration_seconds',
        'live_lat', 'live_lng', 'live_heading', 'live_at', 'trip_status'))
order by table_name, column_name;

-- And the two tables added in 007.

select table_name
from information_schema.tables
where table_schema = 'public'
  and table_name in ('trip_messages', 'safety_reports')
order by table_name;
