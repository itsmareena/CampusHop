import { useState } from "react";

function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus({
          type: "error",
          text: data.error,
        });
      } else {
        setStatus({
          type: "success",
          text: data.message,
        });
      }
    } catch (err) {
      setStatus({
        type: "error",
        text: "Could not reach the server.",
      });
    }
  }

  return (
    <div className="login-content">

      {/* Welcome Icon */}
      <div className="welcome-icon">
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 3L14.09 8.26L20 9L15.5 12.74L16.82 18.7L12 15.77L7.18 18.7L8.5 12.74L4 9L9.91 8.26L12 3Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Heading */}
      <h2>Welcome back 👋</h2>

      <p className="subtext">
        Continue your journey with CampusHop.
      </p>

      {/* Login Form */}
      <form onSubmit={handleSubmit}>

        {/* Email */}
        <div className="field">

          <label htmlFor="email">
            College Email
          </label>

          <div className="input-wrapper">

            <span className="input-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <path
                  d="M22 6L12 13L2 6"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </span>

            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@college.edu"
              required
            />

          </div>

        </div>


        {/* Password */}
        <div className="field">

          <div className="password-heading">

            <label htmlFor="password">
              Password
            </label>

            <button
              type="button"
              className="forgot-btn"
              onClick={() => {
                setStatus({
                  type: "error",
                  text: "Password recovery will be added soon.",
                });
              }}
            >
              Forgot password?
            </button>

          </div>

          <div className="input-wrapper">

            <span className="input-icon">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect
                  x="3"
                  y="10"
                  width="18"
                  height="11"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <path
                  d="M7 10V7C7 4.24 9.24 2 12 2C14.76 2 17 4.24 17 7V10"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </span>

            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />

            <button
              type="button"
              className="show-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>

          </div>

        </div>


        {/* Login Button */}
        <button
          type="submit"
          className="submit-btn"
        >
          <span>Continue</span>

          <span className="arrow">
            →
          </span>
        </button>

      </form>


      {/* Security Card */}
      <div className="security-card">

        <div className="security-check">
          ✓
        </div>

        <div>
          <strong>
            Verified campus community
          </strong>

          <p>
            Only registered college members can join.
          </p>
        </div>

      </div>


      {/* Status */}
      {status && (
        <div className={`status-msg ${status.type}`}>
          {status.text}
        </div>
      )}

    </div>
  );
}

export default LoginPage;