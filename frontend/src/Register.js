import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm: "",
    name: "",
    accept: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value, type, checked} = e.target;
    setForm({...form, [name]: type === "checkbox" ? checked : value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Walidacja frontendowa
    if (form.password !== form.confirm) {
      alert("Hasła nie są takie same");
      return;
    }

    if (!form.accept) {
      alert("Musisz zaakceptować regulamin");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8000/register", {
        email: form.email,
        password: form.password,
      });

      // Zapis tokena i przekierowanie
      localStorage.setItem("token", res.data.access_token);
      navigate("/dashboard");
    } catch (err) {
      alert("Błąd rejestracji: " + (err.response?.data?.detail || err.message));
    }
  };

  return (
      <section className="auth-section">
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>Rejestracja</h2>

          <div className="form-field">
            <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
            />
          </div>

          <div className="form-field">
            <input
                name="password"
                type="password"
                placeholder="Hasło"
                value={form.password}
                onChange={handleChange}
                required
            />
          </div>

          <div className="form-field">
            <input
                name="confirm"
                type="password"
                placeholder="Potwierdź hasło"
                value={form.confirm}
                onChange={handleChange}
                required
            />
          </div>

          <div className="form-field">
            <input
                name="name"
                type="text"
                placeholder="Imię i nazwisko (opcjonalnie)"
                value={form.name}
                onChange={handleChange}
            />
          </div>

          <label>
            <input
                name="accept"
                type="checkbox"
                checked={form.accept}
                onChange={handleChange}
                required
            />{" "}
            Akceptuję regulamin
          </label>

          <br/>
          <br/>

          <button type="submit">Zarejestruj się</button>
          <button type="button" className="btn-light" onClick={() => navigate("/login")}>
            Mam już konto
          </button>
        </form>
      </section>
  );
}