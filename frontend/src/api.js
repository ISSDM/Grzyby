// src/api.js
const API_BASE = "http://localhost:8000";

// Rejestracja
export async function registerUser(email, password) {
  const res = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Rejestracja nie powiodła się");
  return await res.json(); // { access_token, token_type }
}

// Logowanie
export async function loginUser(email, password) {
  const params = new URLSearchParams();
  params.append("username", email);
  params.append("password", password);

  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  if (!res.ok) throw new Error("Logowanie nie powiodło się");
  return await res.json();
}

// Dodawanie grzyba
export async function addMushroom(data, token) {
  const res = await fetch(`${API_BASE}/mushrooms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Błąd zapisu grzyba");
  }

  return await res.json();
}
