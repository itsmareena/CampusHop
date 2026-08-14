import { useState } from "react";

function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus({ type: "error", text: data.error });
      } else {
        setStatus({ type: "success", text: data.message });
      }
    } catch (err) {
      setStatus({ type: "error", text: "Could not reach the server." });
    }
  }

  return (
    <>
      <h2>Welcome back</h2>
      <p className="subtext">Log in with your college email to continue.</p>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>College Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </div>

        <div className="field">
          <label>Password</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} required />
        </div>

        <button type="submit" className="submit-btn">Login</button>
      </form>

      {status && (
        <div className={`status-msg ${status.type}`}>{status.text}</div>
      )}
    </>
  );
}

export default LoginPage;