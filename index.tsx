import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx'; // Se agregó el .tsx para que el navegador sepa qué archivo buscar

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("No se pudo encontrar el elemento root para montar la app");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
