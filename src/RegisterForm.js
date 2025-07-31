// src/components/RegisterForm.js
import { useState } from "react";
import { registerUser } from "./api";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(email, password);
      setToken(data.access_token);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Rejestracja</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button type="submit">Zarejestruj</button>
      </form>
      {token && <p>Token: {token}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
