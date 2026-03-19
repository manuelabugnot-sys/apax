import React from 'react';

const Hero: React.FC = () => {
  // Función de scroll reutilizable y limpia
  const scroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden scroll-mt-20 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="absolute inset-0 z-0">
        <img 
          alt="Strategic Team Collaboration" 
          // animate-slow-zoom debe estar definido en el config
          className="w-full h-full object-cover scale-105 animate-slow-zoom [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_60%)] dark:opacity-75" 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent dark:from-slate-900/95 dark:via-slate-900/80 z-10"></div>
      </div>

      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full pt-28 md:pt-40 pb-24 md:pb-32">
        <div className="max-w-4xl">
          {/* Badge: opacity-0 inicial y animate-fade-in-up definido en config */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 dark:bg-white/10 backdrop-blur-md text-primary dark:text-accent font-bold text-sm mb-8 border border-primary/10 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute h-full w-full rounded-full bg-magenta opacity
