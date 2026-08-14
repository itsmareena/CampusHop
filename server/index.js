const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Temporary in-memory "database" — resets every time the server restarts.
// We'll replace this with a real database later.
const users = [];

// The only email domain allowed to register (change this to your actual college domain)
const ALLOWED_DOMAIN = "college.edu";

app.get("/api/ping", (req, res) => {
  res.json({ message: "Hello from CampusHop backend!" });
});

app.post("/api/register", (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const domain = email.split("@")[1];
  if (domain !== ALLOWED_DOMAIN) {
    return res.status(403).json({ error: `Only ${ALLOWED_DOMAIN} email addresses can register.` });
  }

  const alreadyExists = users.find((u) => u.email === email);
  if (alreadyExists) {
    return res.status(409).json({ error: "An account with this email already exists." });
  }

  const newUser = { id: users.length + 1, name, email, password, role };
  users.push(newUser);

  console.log("Registered users so far:", users);

  res.status(201).json({ message: "Registration successful!", user: { id: newUser.id, name, email, role } });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const user = users.find((u) => u.email === email);

  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  res.status(200).json({
    message: `Welcome back, ${user.name}!`,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});