import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import 'leaflet/dist/leaflet.css';
import './styles/tokens.css';
import './styles/landing.css';
import './styles/dashboard.css';

// Seed the hash route from the path so /app (served as a static copy of
// index.html) opens the dashboard on plain static servers.
(function seedRoute() {
  try {
    if (!window.location.hash) {
      const p = window.location.pathname.replace(/\/+$/, '');
      if (p === '/app' || p.endsWith('/app')) {
        window.location.replace(`${p}/#/app`);
      }
    }
  } catch {
    /* noop */
  }
})();

try {
  document.documentElement.lang = localStorage.getItem('br_lang') === 'hi' ? 'hi' : 'en';
} catch {
  /* noop */
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
