import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <section>
      <h2>Moje Grzyby</h2>
      <div className="filters">
        <select><option>Kategoria</option></select>
        <select><option>Data dodania</option></select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nazwa</th><th>Kategoria</th><th>Status</th><th>Ilość</th><th>Lokalizacja</th><th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Maślak żółty</td><td>Jadalny</td><td>Dostępny</td><td>7</td><td>Las sosnowy</td>
            <td>
              <button onClick={() => navigate("/edit/1")}>Edytuj</button>
              <button>🗑 Usuń</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => navigate("/add")}>➕ Dodaj</button>
      <button className="btn-light" onClick={() => navigate("/")}>🚪 Wyloguj się</button>
    </section>
  );
}
