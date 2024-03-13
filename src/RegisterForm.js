import React, { useState } from 'react';

const RegisterForm = () => {
  const [nombre, setNombre] = useState('');
  const [cedula, setCedula] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Verifica si todos los campos están llenos
    if (nombre && cedula && telefono && correo && password && passwordConfirm) {
      // Verifica si las contraseñas coinciden
      if (password !== passwordConfirm) {
        setMensaje('Las contraseñas no coinciden');
        return;
      }
      // Envía el formulario si todos los campos están llenos
      try {
        const response = await fetch('/registro', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ nombre, cedula, telefono, correo, password })
        });
        const data = await response.json();
        if (data && data.mensaje) {
          setMensaje(data.mensaje); // Verifica la estructura de la respuesta JSON devuelta por el servidor
        } else {
          console.error('Error al registrar:', data);
          setMensaje('Error al registrar, por favor inténtalo de nuevo');
        }
      } catch (error) {
        console.error('Error al registrar:', error);
        setMensaje('Error al registrar, por favor inténtalo de nuevo');
      }
    } else {
      setMensaje('Registro incompleto, por favor completa todos los campos');
    }
  };
  
  
  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="cedula">Cédula:</label>
          <input type="text" id="cedula" value={cedula} onChange={(e) => setCedula(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="telefono">Teléfono:</label>
          <input type="text" id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="correo">Correo:</label>
          <input type="email" id="correo" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="passwordConfirm">Confirmar Contraseña:</label>
          <input type="password" id="passwordConfirm" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required />
        </div>
        <button type="submit">Registrarse</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default RegisterForm;
