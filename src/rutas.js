// Comentario: Este archivo define las rutas de la aplicación utilizando el componente Routes de react-router-dom.
// Importa los componentes LoginForm y RegisterPage para asociarlos a rutas específicas.

import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Importa Routes y Route

import LoginForm from './LoginForm'; // Importa el componente LoginForm
import RegisterPage from './RegisterPage'; // Importa el componente RegisterPage

const Rutas = ({ handleRegistro }) => {
  return (
    <Routes> {/* Utiliza el componente Routes para envolver todas las rutas */}
      {/* Define las rutas dentro de Routes */}
      <Route path="/" element={<LoginForm onRegistro={handleRegistro} />} /> {/* Ruta para el formulario de inicio de sesión */}
      <Route path="/registro" element={<RegisterPage />} /> {/* Ruta para la página de registro */}
    </Routes>
  );
};

export default Rutas;
