import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Team from './components/Team';
import Services from './components/Services';
import AILab from './components/AILab';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Careers from './components/Careers';

const App: React.FC = () => {
  // Inicializamos en false (Light Mode) por defecto y eliminamos el check del sistema
  const [darkMode, setDarkMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
      <Navbar onToggleDarkMode={toggleDarkMode} />
      <main>
        <Hero />
        
        {/* Pilar 1: Quiénes Somos */}
        <About />
        
        {/* Diferencial */}
        <Features />
        
        {/* Equipo */}
        <Team />
        
        {/* Soluciones Integrales */}
        <Services />

        {/* Talent Network / Careers */}
        <Careers />
        
        {/* Innovation Lab */}
        <AILab />
        
        {/* Contacto */}
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-10 left-10 w-12 h-12 bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-full shadow-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-center transition-all duration-300 z-40 hover:scale-110 hover:-translate-y-1 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <span className="material-symbols-outlined">arrow_upward</span>
      </button>
    </div>
  );
};

export default App;