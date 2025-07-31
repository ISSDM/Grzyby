import React, { useEffect } from "react"; // ⬅ dodaj
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import AddEdit from "./AddEdit";

function App() {
  return (
    <Router>
      <Header />
      <main style={{ padding: "2rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add" element={<AddEdit />} />
          <Route path="/edit/:id" element={<AddEdit />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
