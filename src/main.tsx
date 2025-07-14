// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css'; // Your main CSS
import { AuthProvider } from './context/AuthContext.tsx'; // Import AuthProvider
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Wrap your entire App with AuthProvider to make auth context available globally */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);
