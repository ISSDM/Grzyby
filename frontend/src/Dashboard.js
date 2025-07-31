import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [mushrooms, setMushrooms] = useState([]);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("mushrooms") || "[]");
    setMushrooms(local);
  }, []);

  const handleDelete = (index) => {
    const updated = [...mushrooms];
    updated.splice(index, 1);
    setMushrooms(updated);
    localStorage.setItem("mushrooms", JSON.stringify(updated));
  };

  return (
    <section style={{ maxWidth: "800px", margin: "2rem auto", padding: "1rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>📋 Moje Grzyby</h2>

      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}>
        <thead style={{ backgroundColor: "#f2f2f2" }}>
          <tr>
            <th style={th}>Nazwa</th>
            <th style={th}>Kategoria</th>
            <th style={th}>Status</th>
            <th style={th}>Ilość</th>
            <th style={th}>Data</th>
            <th style={th}>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {mushrooms.length > 0 ? (
            mushrooms.map((mushroom, index) => (
              <tr key={index} style={index % 2 === 0 ? rowEven : rowOdd}>
                <td style={td}>{mushroom.name}</td>
                <td style={td}>{mushroom.category}</td>
                <td style={td}>{mushroom.status}</td>
                <td style={td}>{mushroom.quantity}</td>
                <td style={td}>{mushroom.date_added || mushroom.date}</td>
                <td style={td}>
                  <button onClick={() => navigate(`/edit/${index}`)}>✏️</button>{" "}
                  <button onClick={() => handleDelete(index)}>🗑</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td style={td} colSpan="6">Brak zapisanych grzybów.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <button onClick={() => navigate("/add")} style={btn}>➕ Dodaj nowego grzyba</button>
        <button onClick={() => navigate("/")} style={btnLight}>🚪 Wyloguj się</button>
      </div>
    </section>
  );
}

const th = {
  padding: "0.75rem",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
};

const td = {
  padding: "0.75rem",
  borderBottom: "1px solid #eee",
};

const rowEven = {
  backgroundColor: "#fff",
};

const rowOdd = {
  backgroundColor: "#f9f9f9",
};

const btn = {
  margin: "0.5rem",
  padding: "0.5rem 1rem",
  fontSize: "1rem",
  cursor: "pointer",
};

const btnLight = {
  ...btn,
  backgroundColor: "#eee",
};
