import React from 'react';

const Hero: React.FC = () => {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden scroll-mt-20 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="absolute inset-0 z-0">
        <img 
          alt="Strategic Team" 
          className="w-full h-full object-cover scale-105 animate-slow-zoom opacity-40 dark:opacity-20 transition-opacity duration-300" 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent dark:from-slate-950 dark:via-slate-950/80 dark:to-transparent z-10"></div>
      </div>

      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-14 relative z-20 w-full pt-20">
        <div className="max-w-5xl">
          {/* Badge superior */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a008a]/5 dark:bg-white/10 border border-[#0a008a]/10 dark:border-white/10 text-[#0a008a] dark:text-blue-400 font-black text-[10px] uppercase tracking-[0.25em] mb-10 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            Impulsando el potencial humano
          </div>
          
          {/* Título Principal Reconstruido */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-[900] tracking-tighter mb-8 leading-[1.05] text-slate-900 dark:text-white italic animate-fade-in-up">
            Transformamos organizaciones <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0a008a] via-[#7b2cbf] to-[#9d4edd]">
              a través del talento.
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 font-medium mb-12 leading-relaxed max-w-3xl animate-fade-in-up delay-100">
            Soluciones estratégicas de RRHH que conectan objetivos empresariales con la excelencia profesional.
          </p>
          
          {/* Botones de Inicio */}
          <div className="flex flex-wrap gap-5 animate-fade-in-up delay-200">
            <button 
              onClick={() => scrollTo('contacto')}
              className="px-10 py-5 bg-[#0a008a] text-white rounded-2xl text-lg font-black shadow-2xl shadow-blue-900/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 uppercase tracking-tighter"
            >
              Agendar Consultoría
              <span className="material-symbols-outlined font-bold">arrow_forward</span>
            </button>

            <button 
              onClick={() => scrollTo('servicios')}
              className="px-10 py-5 bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-white rounded-2xl text-lg font-black hover:bg-slate-200 dark:hover:bg-white/20 transition-all uppercase tracking-tighter"
            >
              Ver Soluciones
            </button>

            <button 
              onClick={() => scrollTo('talento')}
              className="px-8 py-5 bg-transparent border-2 border-[#7b2cbf]/30 dark:border-white/20 text-[#7b2cbf] dark:text-white rounded-2xl text-lg font-black hover:bg-[#7b2cbf]/5 transition-all flex items-center gap-2 group uppercase tracking-tighter"
            >
              <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">groups</span>
              Talento Apax
            </button
