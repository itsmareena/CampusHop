import React, { useState } from "react";
import campushopLogo from "./assets/campushop-logo.png";

export default function RegisterPage({ onBack, onComplete }) {
  const [role, setRole] = useState("student");

  const submit = (e) => {
    e.preventDefault();

    onComplete({
      name: e.target.name.value,
      role,
      email: e.target.email.value,
    });
  };

  return (
    <main className="auth-page register-page">
      <section className="auth-brand">
        <img
  src={campushopLogo}
  alt="CampusHop"
  className="campushop-logo"
/>

        <div>
          <span className="eyebrow">JOIN THE HOP</span>
          <h1>
            Same campus.
            <br />
            <em>Less traffic.</em>
          </h1>
        </div>

        <div className="sticker sticker-yellow">
          <span>01</span>
          verify
          <br />
          your campus
        </div>

        <div className="sticker sticker-sage">
          <span>02</span>
          find a
          <br />
          matching route
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-inner">
          <button className="back-button" onClick={onBack}>
            ← Back
          </button>

          <div className="auth-heading">
            <span className="eyebrow">CREATE ACCOUNT</span>
            <h2>Let's get you moving.</h2>
            <p>Use your institutional email to join your campus.</p>
          </div>

          <form onSubmit={submit} className="auth-form">
            <label>
              Full name
              <input
                name="name"
                type="text"
                placeholder="Your name"
                required
              />
            </label>

            <label>
              Campus email
              <input
                name="email"
                type="email"
                placeholder="you@college.edu"
                required
              />
            </label>

            <div>
              <span className="input-title">I am a</span>

              <div className="role-grid">
                <button
                  type="button"
                  className={`role-option ${
                    role === "student" ? "selected" : ""
                  }`}
                  onClick={() => setRole("student")}
                >
                  <span className="role-icon">🎒</span>
                  <strong>Student</strong>
                  <small>Find or offer rides</small>
                </button>

                <button
                  type="button"
                  className={`role-option ${
                    role === "faculty" ? "selected" : ""
                  }`}
                  onClick={() => setRole("faculty")}
                >
                  <span className="role-icon">📚</span>
                  <strong>Faculty</strong>
                  <small>Find or offer rides</small>
                </button>
              </div>
            </div>

            <label>
              Password
              <input
                name="password"
                type="password"
                placeholder="Create a password"
                required
              />
            </label>

            <button className="primary-button" type="submit">
              Create account
              <span>→</span>
            </button>
          </form>

          <p className="verification-note">
            <span>✓</span>
            Your campus email will be verified before access is granted.
          </p>
        </div>
      </section>
    </main>
  );
}