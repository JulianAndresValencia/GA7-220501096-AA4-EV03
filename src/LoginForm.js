import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const LoginForm = ({ onInicioSesion }) => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/inicio_sesion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ correo, contraseña })
      });
      const data = await response.json();
      if (response.ok) {
        onInicioSesion(data.usuario); // Llama a la función de inicio de sesión con el usuario devuelto por el servidor
      } else {
        alert(data.mensaje);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión, por favor inténtalo de nuevo');
    }
  };

  return (
    <div>
      <img src="/logo_tdb.png" alt="Logo" style={{ width: '10rem', height: '10rem', position: 'absolute', top: '0', right: '0' }} />
      <h1>MINI MERCADO - ENVITRIANON</h1>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="correo">Correo electrónico:</label>
          <input
            type="email"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="contraseña">Contraseña:</label>
          <input
            type="password"
            id="contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
      <div>
        <Link to="/registro">Registrarse</Link>
      </div>
      <div className="social-links">
        <h3>Acceder con redes sociales:</h3>
        <div><a href="https://www.facebook.com">Facebook</a></div>
        <div><a href="https://www.instagram.com">Instagram</a></div>
        <div><a href="https://www.twitter.com">Twitter</a></div>
      </div>
      <p className="bottom-paragraph">
        Nos enorgullece servir a la comunidad con una amplia variedad de productos de calidad, desde víveres hasta artículos esenciales.
      </p>
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
