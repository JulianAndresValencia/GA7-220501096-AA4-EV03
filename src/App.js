// App.js

import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Rutas from './rutas'; // Importa el componente de rutas

import { ToastContainer, toast } from 'react-toastify'; // Importa ToastContainer y toast de react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Importa estilos CSS de react-toastify

function App() {
  const [mensaje, setMensaje] = useState(''); // Define el estado mensaje y su función setter setMensaje

  // Función asincrónica para manejar el registro de usuario
  const handleRegistro = async (usuario, contraseña) => {
    try {
      // Realiza una solicitud POST a la ruta '/usuarios/registro' con los datos de usuario y contraseña
      const response = await fetch('/usuarios/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ usuario, contraseña })
      });
      // Extrae los datos de la respuesta y muestra un mensaje de éxito
      const data = await response.json();
      toast.success(data.mensaje);
      setMensaje(data.mensaje);
    } catch (error) {
      // Maneja cualquier error mostrando un mensaje de error
      console.error('Error al registrar:', error);
      toast.error('Error al registrar, por favor inténtalo de nuevo');
    }
  };

  return (
    <Router>
      <div className="App">
        <ToastContainer /> {/* Contenedor de mensajes emergentes */}
        {/* Utiliza el componente de rutas */}
        <Rutas handleRegistro={handleRegistro} />
        {/* Renderiza el mensaje si existe */}
        {mensaje && <p>{mensaje}</p>}
      </div>
    </Router>
  );
}

export default App;
