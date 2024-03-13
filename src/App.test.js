import { render, screen } from '@testing-library/react'; // Importa las funciones de renderización y selección de elementos de testing-library
import App from './App'; // Importa el componente principal de la aplicación

test('renders learn react link', () => {
  render(<App />); // Renderiza el componente principal de la aplicación
  const linkElement = screen.getByText(/learn react/i); // Selecciona el elemento que contiene el texto 'learn react'
  expect(linkElement).toBeInTheDocument(); // Comprueba que el elemento esté en el documento
});
