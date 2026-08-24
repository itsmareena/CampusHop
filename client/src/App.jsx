import React, { useState } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import RouteIllustration from "./RouteIllustration";
import campushopLogo from "./assets/campushop-logo.png";

const rides = [
  {
    id: 1,
    name: "Ananya",
    initials: "AN",
    role: "Student",
    vehicle: "Scooty",
    pickup: "BTM Layout",
    dropoff: "BMS College",
    time: "8:10 AM",
    score: 96,
    rating: 4.9,
    trips: 42,
    accent: "coral",
    rotation: "-1.2deg",
  },
  {
    id: 2,
    name: "Rahul",
    initials: "RK",
    role: "Faculty",
    vehicle: "Car",
    pickup: "Jayanagar 4th Block",
    dropoff: "BMS College",
    time: "8:25 AM",
    score: 91,
    rating: 4.8,
    trips: 67,
    accent: "sage",
    rotation: "1deg",
  },
  {
    id: 3,
    name: "Meera",
    initials: "ME",
    role: "Student",
    vehicle: "Bike",
    pickup: "Basavanagudi",
    dropoff: "BMS College",
    time: "8:15 AM",
    score: 87,
    rating: 4.7,
    trips: 31,
    accent: "lavender",
    rotation: "-0.5deg",
  },
];

function Logo() {
  return (
    <img
      src={campushopLogo}
      alt="CampusHop"
      className="campushop-logo"
    />
  );
}

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

        <button className="more-button">•••</button>
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

      <button className="request-button" onClick={() => onRequest(ride)}>
        Request this ride
        <span>↗</span>
      </button>
    </article>
  );
}

function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("matches");
  const [requested, setRequested] = useState(null);

  const requestRide = (ride) => {
    setRequested(ride);
  };

  return (
    <div className="dashboard">
      <header className="topbar">
        <Logo />

        <nav className="main-nav">
          <button
            className={activeTab === "matches" ? "active" : ""}
            onClick={() => setActiveTab("matches")}
          >
            Find a ride
          </button>

          <button
            className={activeTab === "offer" ? "active" : ""}
            onClick={() => setActiveTab("offer")}
          >
            Offer a ride
          </button>

          <button
            className={activeTab === "trips" ? "active" : ""}
            onClick={() => setActiveTab("trips")}
          >
            My trips
          </button>
        </nav>

        <div className="profile-menu">
          <div className="mini-avatar">
            {user?.name?.slice(0, 2).toUpperCase() || "YO"}
          </div>

          <div>
            <strong>{user?.name || "You"}</strong>
            <span>{user?.role || "Student"}</span>
          </div>

          <button className="logout-button" onClick={onLogout}>
            ↪
          </button>
        </div>
      </header>

      <main className="dashboard-content">
        <section className="welcome-row">
          <div>
            <span className="eyebrow">MONDAY · AUGUST 24</span>
            <h1>
              Good evening,
              <br />
              <em>{user?.name?.split(" ")[0] || "rider"}.</em>
            </h1>
          </div>

          <div className="campus-status">
            <span className="status-dot" />
            <div>
              <strong>Campus network</strong>
              <span>Verified & active</span>
            </div>
          </div>
        </section>

        <section className="commute-panel">
          <div className="commute-copy">
            <span className="eyebrow">YOUR MORNING COMMUTE</span>
            <h2>Where are you headed?</h2>
            <p>
              Tell us your route and we'll find people already going your way.
            </p>
          </div>

          <div className="commute-form">
            <div className="location-input">
              <span className="location-dot pickup-dot" />
              <div>
                <small>FROM</small>
                <strong>BTM Layout</strong>
              </div>
            </div>

            <div className="location-arrow">→</div>

            <div className="location-input">
              <span className="location-dot campus-dot" />
              <div>
                <small>TO</small>
                <strong>BMS College</strong>
              </div>
            </div>

            <div className="time-input">
              <small>ARRIVE BY</small>
              <strong>8:30 AM</strong>
            </div>

            <button className="find-button">
              Find matches
              <span>↗</span>
            </button>
          </div>
        </section>

        <section className="matches-header">
          <div>
            <span className="eyebrow">ROUTE BOARD</span>
            <h2>People heading your way.</h2>
          </div>

          <div className="match-explanation">
            <div className="tiny-score">96</div>
            <span>
              Match scores combine
              <br />
              route, time & reliability.
            </span>
          </div>
        </section>

        <section className="ride-board">
          <div className="board-scribble">
            <span>best matches</span>
            <div>↘</div>
          </div>

          {rides.map((ride) => (
            <RideCard
              key={ride.id}
              ride={ride}
              onRequest={requestRide}
            />
          ))}
        </section>

        <section className="score-breakdown">
          <div>
            <span className="eyebrow">HOW WE SCORE</span>
            <h2>Not magic. Just useful.</h2>
            <p>
              Every match is explainable. We compare the things that actually
              matter when sharing a commute.
            </p>
          </div>

          <div className="score-factors">
            <div>
              <strong>35%</strong>
              <span>Route</span>
            </div>

            <div>
              <strong>25%</strong>
              <span>Time</span>
            </div>

            <div>
              <strong>20%</strong>
              <span>Pickup</span>
            </div>

            <div>
              <strong>15%</strong>
              <span>Reliability</span>
            </div>

            <div>
              <strong>5%</strong>
              <span>Vehicle</span>
            </div>
          </div>
        </section>
      </main>

      {requested && (
        <div className="modal-backdrop" onClick={() => setRequested(null)}>
          <div
            className="request-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-sticker">HOP!</div>

            <span className="eyebrow">RIDE REQUEST</span>

            <h2>Send a request to {requested.name}?</h2>

            <p>
              You’re requesting the {requested.vehicle.toLowerCase()} from{" "}
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
                onClick={() => setRequested(null)}
              >
                Send request →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);

  const login = (data) => {
    setUser(data);
    setPage("dashboard");
  };

  const register = (data) => {
    setUser(data);
    setPage("dashboard");
  };

  if (page === "login") {
    return (
      <LoginPage
        onLogin={login}
        onRegister={() => setPage("register")}
      />
    );
  }

  if (page === "register") {
    return (
      <RegisterPage
        onBack={() => setPage("login")}
        onComplete={register}
      />
    );
  }

  return (
    <Dashboard
      user={user}
      onLogout={() => {
        setUser(null);
        setPage("login");
      }}
    />
  );
}