// src/App.js
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={setUser} />} />
      <Route
        path="/home"
        element={user ? <Home /> : <Navigate to="/login" />}
      />
      {/* 未定義のパスはログイン画面へ */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;
