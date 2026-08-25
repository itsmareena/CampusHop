import React, { useState } from "react";
import RouteIllustration from "./RouteIllustration";



function ScoreSticker({ score }) {
  return (
    <div className="score-sticker">
      <strong>{score}%</strong>
      <span>match</span>
    </div>
  );
}

function RideCard({ ride, onRequest }) {
  return (
    <article
      className={`ride-card ride-card--${ride.accent}`}
      style={{ "--rotation": ride.rotation }}
    >
      <div className="washi-tape" />

      <ScoreSticker score={ride.score} />

      <div className="ride-card-top">
        <div className="avatar">{ride.initials}</div>

        <div className="rider-info">
          <strong>{ride.name}</strong>
          <span>
            {ride.role} · {ride.vehicle}
          </span>
        </div>
      </div>

      <RouteIllustration
        compact
        pickup={ride.pickup}
        dropoff={ride.dropoff}
      />

      <div className="ride-meta">
        <div>
          <span>DEPARTS</span>
          <strong>{ride.time}</strong>
        </div>

        <div>
          <span>RATING</span>
          <strong>★ {ride.rating}</strong>
        </div>

        <div>
          <span>RIDES</span>
          <strong>{ride.trips}</strong>
        </div>
      </div>

      <button
        className="request-button"
        onClick={() => onRequest(ride)}
      >
        Request this ride
        <span>↗</span>
      </button>
    </article>
  );
}

export default function FindRide({ rides, onRequest }) {
  const [requested, setRequested] = useState(null);

  return (
    <main className="page-shell">

      <section className="page-heading">
        <div>
          <span className="eyebrow">FIND A RIDE</span>

          <h1>
            Someone's already
            <br />
            <em>heading your way.</em>
          </h1>

          <p>
            Tell us where you're going and we'll find the closest
            campus routes.
          </p>
        </div>
      </section>

      <section className="search-panel">

        <div className="search-location">
          <small>FROM</small>
          <strong>BTM Layout</strong>
        </div>

        <div className="search-arrow">→</div>

        <div className="search-location">
          <small>TO</small>
          <strong>BMS College</strong>
        </div>

        <div className="search-time">
          <small>ARRIVE BY</small>
          <strong>8:30 AM</strong>
        </div>

        <button className="find-button">
          Search
          <span>↗</span>
        </button>

      </section>

      <section className="matches-header">
        <div>
          <span className="eyebrow">TODAY'S ROUTES</span>
          <h2>Best matches for you.</h2>
        </div>

        <div className="match-explanation">
          <div className="tiny-score">96</div>

          <span>
            Higher score means
            <br />
            a better route match.
          </span>
        </div>
      </section>

      <section className="ride-board">

        <div className="board-scribble">
          <span>pin your ride</span>
          <div>↘</div>
        </div>

        {rides.map((ride) => (
          <RideCard
            key={ride.id}
            ride={ride}
            onRequest={setRequested}
          />
        ))}

      </section>

      {requested && (
        <div
          className="modal-backdrop"
          onClick={() => setRequested(null)}
        >
          <div
            className="request-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-sticker">
              HOP!
            </div>

            <span className="eyebrow">
              RIDE REQUEST
            </span>

            <h2>
              Send a request to {requested.name}?
            </h2>

            <p>
              You're requesting the{" "}
              {requested.vehicle.toLowerCase()} from{" "}
              {requested.pickup} at {requested.time}.
            </p>

            <div className="modal-actions">

              <button
                className="secondary-button"
                onClick={() => setRequested(null)}
              >
                Not yet
              </button>

              <button
  className="primary-button"
  onClick={() => {
    onRequest(requested);
    setRequested(null);
  }}
>
  Send request →
</button>

            </div>
          </div>
        </div>
      )}

    </main>
  );
}