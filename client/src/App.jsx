import { useState } from "react";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";
import RouteIllustration from "./RouteIllustration";
import "./SplitAuth.css";

function App() {
  const [view, setView] = useState("login");

  return (
    <div className="split-page">
      <div className="split-visual">
        <div className="brand">CampusHop</div>
        <p className="tagline">
          Share your commute with verified students and faculty from your own campus.
        </p>
        <RouteIllustration />
      </div>

      <div className="split-form-side">
        <div className="form-shell">
          <div className="mobile-brand">CampusHop</div>

          <div className="form-toggle">
            <button
              className={view === "login" ? "active" : ""}
              onClick={() => setView("login")}
            >
              Login
            </button>
            <button
              className={view === "register" ? "active" : ""}
              onClick={() => setView("register")}
            >
              Register
            </button>
          </div>

          {view === "login" ? <LoginPage /> : <RegisterPage />}
        </div>
      </div>
    </div>
  );
}

export default App;