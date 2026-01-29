import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden scroll-mt-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="absolute inset-0 z-0">
        {/* Imagen de Equipo */}
        <img 
          alt="Strategic Team Collaboration" 
          className="w-full h-full object-cover scale-105 animate-slow-zoom [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_60%)] dark:opacity-60 transition-opacity duration-300" 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070"
        />
        {/* Gradiente Adaptativo: Claro en Light Mode / Oscuro en Dark Mode */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent dark:from-slate-950 dark:via-slate-950/90 dark:to-transparent z-10 transition-colors duration-300"></div>
      </div>

      {/* Padding superior ajustado y padding inferior agregado (pb-24 md:pb-32) para espacio en los botones */}
      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full pt-28 md:pt-40 pb-24 md:pb-32">
        <div className="max-w-4xl">
          {/* Badge superior */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 dark:bg-white/10 backdrop-blur-md text-primary dark:text-accent font-bold text-sm mb-8 border border-primary/10 dark:border-white/10 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="tracking-tight">Impulsando el potencial humano</span>
          </div>
          
          {/* Título Principal - Adaptable Claro/Oscuro */}
          <h1 className="text-4xl lg:text-7xl font-display font-extrabold tracking-tight mb-8 leading-[1.1] text-slate-900 dark:text-white drop-shadow-sm opacity-0 animate-fade-in-up transition-colors duration-300" style={{ animationDelay: '0.2s' }}>
            Transformamos organizaciones <br />
            <span className="gradient-text-magenta">a través del talento</span>
          </h1>
          
          {/* Texto secundario - Adaptable Claro/Oscuro */}
          <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 font-medium mb-12 leading-relaxed max-w-3xl opacity-0 animate-fade-in-up transition-colors duration-300" style={{ animationDelay: '0.4s' }}>
            Ofrecemos soluciones estratégicas de RRHH que conecten los objetivos organizacionales con la excelencia del equipo.
          </p>
          
          <div className="flex flex-wrap gap-5 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <button 
              onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-gradient text-white px-10 py-5 rounded-full text-lg font-bold shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              Agendar Consultoría
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            {/* Botón secundario adaptable */}
            <button 
              onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white/60 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/10 px-10 py-5 rounded-full text-lg font-bold hover:bg-white dark:hover:bg-white/20 transition-all text-slate-700 dark:text-white shadow-sm"
            >
              Ver Soluciones
            </button>

             {/* Botón Talento Apax */}
            <button 
              onClick={() => document.getElementById('talento')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-transparent border border-primary/20 dark:border-white/20 px-8 py-5 rounded-full text-lg font-bold hover:bg-primary/5 dark:hover:bg-white/5 transition-all text-primary dark:text-white flex items-center justify-center gap-2 group"
            >
              <span className="material-symbols-outlined group-hover:text-magenta transition-colors">groups</span>
              Talento Apax
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;