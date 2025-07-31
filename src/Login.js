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
      const res = await axios.post("http://localhost:8000/login", {
        username: email,
        password: password,
      });
      localStorage.setItem("token", res.data.access_token);
      navigate("/dashboard");
    } catch (err) {
      alert("Błąd logowania: " + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <section>
      <h2>Zaloguj się</h2>
      <form onSubmit={handleLogin}>
        <div className="form-field">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <input
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <a href="#">Nie pamiętasz hasła?</a><br /><br />
        <button type="submit">Zaloguj się</button>
        <button
          type="button"
          className="btn-light"
          onClick={() => navigate("/register")}
        >
          Zarejestruj się
        </button>
      </form>
    </section>
  );
}
