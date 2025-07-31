import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; // załaduj styl ogólny jeśli masz

export default function Home() {
  const [mushrooms, setMushrooms] = useState([]);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

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

      const local = JSON.parse(localStorage.getItem("mushrooms") || "[]");

      const mappedLocal = local.map((m) => ({
        ...m,
        id: "local-" + Math.random(),
        source: "local",
        count: m.quantity || m.count,
      }));

      const filteredLocal = mappedLocal.filter((m) =>
        (!category || m.category === category) &&
        (!status || m.status === status)
      );

      const all = [...data, ...filteredLocal];
      setMushrooms(sortData(all));
    } catch (err) {
      console.error("Błąd przy pobieraniu grzybów:", err);
    }
  };

  const sortData = (data) => {
  return [...data].sort((a, b) => {
    if (sortBy === "status") {
      const order = { "Dostępny": 1, "Mało": 2, "Brak": 3 };
      const valA = order[a.status] || 99;
      const valB = order[b.status] || 99;
      return sortOrder === "asc" ? valA - valB : valB - valA;
    }

    const valA = (a[sortBy] || "").toString().toLowerCase();
    const valB = (b[sortBy] || "").toString().toLowerCase();
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });
};


  const handleSort = (key) => {
    const newOrder = sortBy === key ? (sortOrder === "asc" ? "desc" : "asc") : "asc";
    setSortBy(key);
    setSortOrder(newOrder);
    setMushrooms(sortData(mushrooms));
  };

  return (
    <section className="home-section">
      <h2 className="welcome-title">🍄 Lista grzybów</h2>
      <p className="welcome-desc">Zobacz grzyby publiczne i lokalne</p>

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
            <th onClick={() => handleSort("name")}>Nazwa {sortBy === "name" && (sortOrder === "asc" ? "⬆" : "⬇")}</th>
            <th onClick={() => handleSort("category")}>Kategoria {sortBy === "category" && (sortOrder === "asc" ? "⬆" : "⬇")}</th>
            <th onClick={() => handleSort("count")}>Ilość {sortBy === "count" && (sortOrder === "asc" ? "⬆" : "⬇")}</th>
            <th onClick={() => handleSort("status")}>Status {sortBy === "status" && (sortOrder === "asc" ? "⬆" : "⬇")}</th>
          </tr>
        </thead>
        <tbody>
          {mushrooms.length > 0 ? (
            mushrooms.map((m) => (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td>{m.category}</td>
                <td>{m.count || m.quantity}</td>
                <td>{m.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "1rem" }}>
                Brak grzybów do wyświetlenia.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="info-box">
        <span role="img" aria-label="lock">🔒</span> Zaloguj się, by dodawać lub edytować grzyby.
      </div>
    </section>
  );
}
