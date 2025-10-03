import React, { useState } from 'react';
import './AdminLogin.css';

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      onLogin();
    } else {
      setError('Contraseña incorrecta');
    }
  };
  return (
    <div className="admin-login-container">
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <h2>Acceso Administrador</h2>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default AdminLogin;