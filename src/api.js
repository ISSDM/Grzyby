// src/api.js
const API_BASE = "http://127.0.0.1:8000";

export async function registerUser(email, password) {
  const res = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Rejestracja nie powiodła się");

  return await res.json(); // zawiera token
}
