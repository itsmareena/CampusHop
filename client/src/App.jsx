import { useState } from "react";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import RouteIllustration from "./RouteIllustration";
import "./SplitAuth.css";

function App() {
  const [view, setView] = useState("login");

  return (
    <div className="split-page">

      {/* ================= LEFT SIDE ================= */}
      <div className="split-visual">

        {/* Brand */}
        <div className="brand">

          <div className="brand-logo">

            <svg
              width="42"
              height="42"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32 4C19.85 4 10 13.85 10 26C10 42.5 32 60 32 60C32 60 54 42.5 54 26C54 13.85 44.15 4 32 4Z"
                fill="url(#campusGradient)"
              />

              <path
                d="M21 31C25 24 29 20 35 21C41 22 43 29 39 34C36 38 29 38 25 34"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
              />

              <circle
                cx="21"
                cy="31"
                r="3"
                fill="white"
              />

              <circle
                cx="39"
                cy="34"
                r="3"
                fill="white"
              />

              <defs>
                <linearGradient
                  id="campusGradient"
                  x1="10"
                  y1="4"
                  x2="54"
                  y2="60"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#27C2FF" />
                  <stop offset="1" stopColor="#168CFF" />
                </linearGradient>
              </defs>
            </svg>

          </div>

          <div className="brand-name">
            Campus<span>Hop</span>
          </div>

        </div>


        {/* Hero Content */}
        <div className="visual-content">

          <div className="hero-badge">
            SMART CAMPUS MOBILITY
          </div>

          <h1>
            Your campus.
            <br />
            Your route.
            <br />
            <span>Your people.</span>
          </h1>

          <p className="tagline">
            Share rides with verified students and faculty
            travelling your way — safer, smarter and cheaper.
          </p>

          <RouteIllustration />

          <div className="hero-features">

            <div className="hero-feature">
              <span>✓</span>
              Verified Campus
            </div>

            <div className="hero-feature">
              <span>✓</span>
              Smart Matching
            </div>

            <div className="hero-feature">
              <span>✓</span>
              Safer Rides
            </div>

          </div>

        </div>


        {/* Footer */}
        <div className="visual-footer">
          CampusHop • Smart Campus Ride Sharing
        </div>

      </div>


      {/* ================= RIGHT SIDE ================= */}
      <div className="split-form-side">

        <div className="form-shell">

          {/* Mobile Logo */}
          <div className="mobile-brand">

            <div className="mobile-logo">

              <svg
                width="38"
                height="38"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M32 4C19.85 4 10 13.85 10 26C10 42.5 32 60 32 60C32 60 54 42.5 54 26C54 13.85 44.15 4 32 4Z"
                  fill="url(#mobileGradient)"
                />

                <path
                  d="M21 31C25 24 29 20 35 21C41 22 43 29 39 34C36 38 29 38 25 34"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                <circle
                  cx="21"
                  cy="31"
                  r="3"
                  fill="white"
                />

                <circle
                  cx="39"
                  cy="34"
                  r="3"
                  fill="white"
                />

                <defs>
                  <linearGradient
                    id="mobileGradient"
                    x1="10"
                    y1="4"
                    x2="54"
                    y2="60"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#27C2FF" />
                    <stop offset="1" stopColor="#168CFF" />
                  </linearGradient>
                </defs>

              </svg>

            </div>

            <span>
              Campus<span>Hop</span>
            </span>

          </div>


          {/* Login / Register */}
          <div className="form-toggle">

            <button
              type="button"
              className={view === "login" ? "active" : ""}
              onClick={() => {
                setView("login");
              }}
            >
              Login
            </button>

            <button
              type="button"
              className={view === "register" ? "active" : ""}
              onClick={() => {
                setView("register");
              }}
            >
              Register
            </button>

          </div>


          {/* Page */}
          {view === "login" ? (
            <LoginPage />
          ) : (
            <RegisterPage />
          )}

        </div>

      </div>

    </div>
  );
}

export default App;