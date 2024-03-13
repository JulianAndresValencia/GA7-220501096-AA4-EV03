// Importa la biblioteca principal de React
import React from 'react';
// Importa el método de renderizado específico de ReactDOM
import ReactDOM from 'react-dom/client';
// Importa los estilos CSS para el índice
import './index.css';
// Importa el componente principal de la aplicación
import App from './App';
// Importa la función para reportar web vitals
import reportWebVitals from './reportWebVitals';

// Crea un root utilizando el método createRoot de ReactDOM y lo asigna al elemento con id 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));
// Renderiza la aplicación dentro de React.StrictMode para activar advertencias adicionales y efectos secundarios durante la renderización
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Si deseas comenzar a medir el rendimiento en tu aplicación, pasa una función
// para registrar los resultados (por ejemplo: reportWebVitals(console.log))
// o envíalos a un punto de análisis. Aprende más: https://bit.ly/CRA-vitals
reportWebVitals();
