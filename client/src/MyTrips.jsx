import React, { useState } from "react";

export default function MyTrips({ trips = [] }) {
  const [tab, setTab] = useState("upcoming");

  return (
    <main className="page-shell">

      <section className="page-heading">
        <div>
          <span className="eyebrow">MY TRIPS</span>

          <h1>
            Your rides,
            <br />
            <em>all in one place.</em>
          </h1>

          <p>
            Keep track of your upcoming commutes
            and the rides you've requested.
          </p>
        </div>
      </section>

      <div className="trip-tabs">

        <button
          className={tab === "upcoming" ? "active" : ""}
          onClick={() => setTab("upcoming")}
        >
          Upcoming
        </button>

        <button
          className={tab === "history" ? "active" : ""}
          onClick={() => setTab("history")}
        >
          History
        </button>

      </div>

      {tab === "upcoming" ? (

        <section className="trip-list">

          {trips.length === 0 ? (

            <section className="empty-trips">

              <div className="empty-sticker">
                HOP
              </div>

              <h2>
                No rides yet.
              </h2>

              <p>
                Find a ride and request a seat.
                Your upcoming commute will appear here.
              </p>

            </section>

          ) : (

            trips.map((trip) => (

              <article
                className="trip-card"
                key={trip.tripId}
              >

                <div className="trip-date">
                  <span>{trip.date}</span>
                  <strong>{trip.time}</strong>
                </div>

                <div className="trip-route">

                  <div>
                    <small>FROM</small>
                    <strong>{trip.pickup}</strong>
                  </div>

                  <div className="trip-line">
                    ─────────→
                  </div>

                  <div>
                    <small>TO</small>
                    <strong>{trip.dropoff}</strong>
                  </div>

                </div>

                <div className="trip-person">

                  <div className="avatar">
                    {trip.person
                      ?.slice(0, 2)
                      .toUpperCase()}
                  </div>

                  <div>
                    <strong>{trip.person}</strong>

                    <span>
                      {trip.role} · {trip.vehicle}
                    </span>
                  </div>

                </div>

                <button className="secondary-button">
                  View ride →
                </button>

              </article>

            ))

          )}

        </section>

      ) : (

        <section className="empty-trips">

          <div className="empty-sticker">
            ✓
          </div>

          <h2>
            Your ride history
            <br />
            will live here.
          </h2>

          <p>
            Completed CampusHop rides will appear
            here after your trips.
          </p>

        </section>

      )}

    </main>
  );
}