import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from './router';
import reportWebVitals from './reportWebVitals';

function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setViewportHeight();
window.addEventListener('resize', setViewportHeight);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);

reportWebVitals();