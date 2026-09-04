import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Team from './components/Team';
import Services from './components/Services';
import EmployabilityProgram from './components/EmployabilityProgram';
import TalentoApax from './components/TalentoApax';
import AILab from './components/AILab';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

const App: React.FC = () => {
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

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Navbar onToggleDarkMode={toggleDarkMode} />
      
      <main>
        {/* Pilar 1: Quiénes Somos */}
        <Hero />
        <About />
        
        {/* Diferencial */}
        <Features />
        
        {/* Equipo */}
        <Team />
        
        {/* Soluciones Integrales */}
        <Services />
        
        {/* Programa Estratégico de Empleabilidad (B2C / Candidatos) */}
        <EmployabilityProgram />

        {/* Sector Talento Apax */}
        <TalentoApax />
        
        {/* Innovation Lab */}
        <AILab />
        
        {/* Formulario de Contacto General */}
        <Contact />
      </main>

      {/* El Footer es la última sección de la página */}
      <Footer />

      {/* Elementos Flotantes de UI */}
      <FloatingWhatsApp />

      <button
        onClick={scrollToTop}
        className={`fixed bottom-10 left-10 w-12 h-12 bg-white dark:bg-slate-800 text-slate-800 dark:text-white rounded-full shadow-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center transition-all duration-300 z-40 hover:scale-110 hover:-translate-y-1 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <span className="material-symbols-outlined">arrow_upward</span>
      </button>
    </div>
  );
};

export default App;
