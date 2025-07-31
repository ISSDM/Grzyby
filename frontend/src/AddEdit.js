import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddEdit() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    quantity: 1,
    status: "",
    date_added: "",  // yyyy-mm-dd
  });
  const nav = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === "quantity" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // pobierz istniejące grzyby z localStorage
    const existing = JSON.parse(localStorage.getItem("mushrooms") || "[]");

    // dodaj nowy grzyb
    const newMushrooms = [...existing, { ...form, id: Date.now() }];

    // zapisz z powrotem
    localStorage.setItem("mushrooms", JSON.stringify(newMushrooms));

    // przejdź do dashboardu
    nav("/dashboard");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: 20 }}>
      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gridGap: 10, width: 300 }}
      >
        <h2>Dodaj Grzyba</h2>
        <input
          name="name"
          placeholder="Nazwa"
          value={form.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Opis"
          value={form.description}
          onChange={handleChange}
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Kategoria</option>
          <option>Trujący</option>
          <option>Jadalny</option>
          <option>Chroniony</option>
          <option>Rzadki</option>
        </select>
        <input
          name="quantity"
          type="number"
          min={1}
          value={form.quantity}
          onChange={handleChange}
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          required
        >
          <option value="">Status</option>
          <option>Dostępny</option>
          <option>Mało</option>
          <option>Brak</option>
        </select>
        <input
          name="date_added"
          type="date"
          value={form.date_added}
          onChange={handleChange}
          required
        />
        <button type="submit">💾 Zapisz</button>
        <button type="button" onClick={() => nav("/dashboard")}>
          ↩ Wróć
        </button>
      </form>
    </div>
  );
}
