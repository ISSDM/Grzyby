import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const res = await axios.post("http://localhost:8000/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      localStorage.setItem("token", res.data.access_token);
      navigate("/dashboard");
    } catch (err) {
      alert("Błąd logowania: " + (err.response?.data?.detail || err.message));
    }
  }; // <-- UWAGA: to jest prawidłowe zamknięcie funkcji

  return (
    <section style={{ display: "flex", justifyContent: "center", marginTop: "5rem" }}>
      <form onSubmit={handleLogin} style={{ width: "300px" }}>
        <h2 style={{ textAlign: "center" }}>Zaloguj się</h2>
        <div className="form-field" style={{ marginBottom: "1rem" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div className="form-field" style={{ marginBottom: "1rem" }}>
          <input
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <a href="#" style={{ fontSize: "0.9rem" }}>Nie pamiętasz hasła?</a><br /><br />
        <button type="submit" style={{ width: "100%", padding: "10px", marginBottom: "0.5rem" }}>
          Zaloguj się
        </button>
        <button
          type="button"
          className="btn-light"
          onClick={() => navigate("/register")}
          style={{ width: "100%", padding: "10px", background: "#eee" }}
        >
          Zarejestruj się
        </button>
      </form>
    </section>
  );
}
