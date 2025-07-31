import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddEdit() {
  const [form, setForm] = useState({
    name: "",
    desc: "",
    category: "",
    count: 1,
    status: "",
    date: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: połączenie z backendem
    navigate("/dashboard");
  };

  return (
    <section>
      <h2>Dodaj / Edytuj Grzyba</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <input name="name" type="text" placeholder="Nazwa grzyba" value={form.name} onChange={handleChange} required />
        </div>
        <div className="form-field">
          <textarea name="desc" placeholder="Opis" value={form.desc} onChange={handleChange} />
        </div>
        <div className="form-field">
          <select name="category" value={form.category} onChange={handleChange} required>
            <option value="">Kategoria</option>
            <option>Trujący</option>
            <option>Jadalny</option>
            <option>Chroniony</option>
            <option>Rzadki</option>
          </select>
        </div>
        <div className="form-field">
          <input name="count" type="number" placeholder="Ilość" value={form.count} onChange={handleChange} />
        </div>
        <div className="form-field">
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="">Status zapasu</option>
            <option>Dostępny</option>
            <option>Mało</option>
            <option>Brak</option>
          </select>
        </div>
        <div className="form-field">
          <input name="date" type="date" placeholder="Data dodania" value={form.date} onChange={handleChange} />
        </div>
        <button type="submit">💾 Zapisz</button>
        <button type="button" className="btn-light" onClick={() => navigate("/dashboard")}>Wróć do listy</button>
      </form>
    </section>
  );
}
