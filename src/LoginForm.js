import React, { useState } from 'react';
import './App.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar la lógica de autenticación, como enviar los datos a un servidor, etc.
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div>
            <img src="/logo_tdb.png" alt="Logo" style={{ width: '10rem', height: '10rem', position: 'absolute', top: '0', right: '0' }} />
      <h1>MINI MERCADO - ENVITRIANON</h1>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Correo:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
      <div className="social-links">
        <h3>Acceder con redes sociales:</h3>
        <div><a href="https://www.facebook.com">Facebook</a></div>
        <div><a href="https://www.instagram.com">Instagram</a></div>
        <div><a href="https://www.twitter.com">Twitter</a></div>
        {/* Agrega más enlaces para otras redes sociales si lo deseas */}
      </div>
      <p className="bottom-paragraph">
        Nos enorgullece servir a la comunidad con una amplia variedad de productos de calidad, desde víveres hasta artículos esenciales.
      </p>
      {/* Información de contacto */}
      <div className="contact-info">
        <h3>Contacto:</h3>
        <p>Dirección: Calle 130 # 25-32, B. El Trianón Envigado</p>
        <p>Teléfono: (123) 456-7890</p>
        <p>Correo electrónico: info@minimercado.com</p>
      </div>
    </div>
  );
};

export default LoginForm;
