import React, { useState } from "react";

export default function LoginPage({ onLogin, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onLogin({
      email,
      name: email.split("@")[0] || "Campus rider",
    });
  };

  return (
    <main className="auth-page">
      <section className="auth-brand">
        <div className="brand-mark">CH</div>

        <div>
          <span className="eyebrow">CAMPUS MOBILITY</span>
          <h1>
            Your route.
            <br />
            <em>Shared.</em>
          </h1>
        </div>

        <div className="auth-note">
          <div className="note-tape" />
          <p>
            A private ride-sharing space for people who already belong to the
            same campus.
          </p>
          <span>students + faculty only</span>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-inner">
          <div className="mobile-brand">
            <div className="brand-mark">CH</div>
            <strong>CampusHop</strong>
          </div>

          <div className="auth-heading">
            <span className="eyebrow">WELCOME BACK</span>
            <h2>Hop back in.</h2>
            <p>Sign in with your institutional account.</p>
          </div>

          <form onSubmit={submit} className="auth-form">
            <label>
              Campus email
              <input
                type="email"
                placeholder="you@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <div className="form-row">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>

              <button type="button" className="text-button">
                Forgot password?
              </button>
            </div>

            <button className="primary-button" type="submit">
              Sign in
              <span>→</span>
            </button>
          </form>

          <div className="auth-divider">
            <span>new around here?</span>
          </div>

          <button className="secondary-button" onClick={onRegister}>
            Create campus account
          </button>

          <p className="auth-footer">
            Access is limited to verified members of your institution.
          </p>
        </div>
      </section>
    </main>
  );
}