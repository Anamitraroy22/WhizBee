// src/pages/Index.tsx

import React from 'react';
import Navigation from '../components/Navigation';
import HomePage from '../components/HomePage';
import Footer from '../components/Footer';
// --- Add this import line ---
import '../index.css'; // This correctly imports src/index.css from src/pages/Index.tsx
// ---------------------------

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HomePage />
      <Footer />
    </div>
  );
};

export default Index;