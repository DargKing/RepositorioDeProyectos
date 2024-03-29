import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/app';
import { BrowserRouter } from 'react-router-dom'

const container = document.getElementById("app")

const root = createRoot(container)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode >,
);