// Home.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";


export default function Home() {
  const [mushrooms, setMushrooms] = useState([]);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchMushrooms();
  }, [category, status]);

  const fetchMushrooms = async () => {
    try {
      const params = {};
      if (category) params.category = category;
      const res = await axios.get("http://localhost:8000/mushrooms", { params });
      let data = res.data;
      if (status) {
        data = data.filter((m) => m.status === status);
      }
      setMushrooms(data);
    } catch (err) {
      console.error("Błąd przy pobieraniu grzybów:", err);
    }
  };

  return (
    <section className="home-section">
      <h2 className="welcome-title">Witamy!</h2>
      <p className="welcome-desc">
        Oglądasz publiczną listę grzybów. Zaloguj się, by edytować lub dodawać nowe.
      </p>

      <div className="filters">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Kategoria</option>
          <option value="Jadalny">Jadalny</option>
          <option value="Trujący">Trujący</option>
          <option value="Chroniony">Chroniony</option>
          <option value="Rzadki">Rzadki</option>
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Status</option>
          <option value="Dostępny">Dostępny</option>
          <option value="Mało">Mało</option>
          <option value="Brak">Brak</option>
        </select>
      </div>

      <table className="mushroom-table">
        <thead>
          <tr>
            <th>Nazwa</th>
            <th>Kategoria</th>
            <th>Ilość</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {mushrooms.map((m) => (
            <tr key={m.id}>
              <td>{m.name}</td>
              <td>{m.category}</td>
              <td>{m.count}</td>
              <td>{m.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="info-box">
        <span role="img" aria-label="lock">🔒</span> Aby dodać lub edytować grzyby, <a href="/login">zaloguj się</a> lub {" "}
        <a href="/register">stwórz konto</a>.
      </div>
    </section>
  );
}
