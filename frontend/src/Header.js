import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <span role="img" aria-label="mushroom">🍄</span>
        <span> Inwentaryzacja Grzybów</span>
      </div>
      <nav className="nav-links">
        <Link to="/">Strona główna</Link>
        <Link to="/login">Zaloguj się</Link>
        <Link to="/register">Stwórz konto</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/add">Dodaj grzyba</Link>
      </nav>
    </header>
  );
}
