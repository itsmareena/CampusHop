import { useState } from "react";

function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [status, setStatus] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/register", {
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
      <h2>Create your account</h2>
      <p className="subtext">Only verified college email addresses can register.</p>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Full Name</label>
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>

        <div className="field">
          <label>College Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </div>

        <div className="field">
          <label>Password</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} required />
        </div>

        <div className="field">
          <label>I am a</label>
          <div className="role-select">
            <label>
              <input
                type="radio"
                name="role"
                value="student"
                checked={form.role === "student"}
                onChange={handleChange}
              />
              Student
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="faculty"
                checked={form.role === "faculty"}
                onChange={handleChange}
              />
              Faculty
            </label>
          </div>
        </div>

        <button type="submit" className="submit-btn">Register</button>
      </form>

      {status && (
        <div className={`status-msg ${status.type}`}>{status.text}</div>
      )}
    </>
  );
}

export default RegisterPage;