import React from 'react';

const Hero: React.FC = () => {
  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden scroll-mt-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="absolute inset-0 z-0">
        <img 
          alt="Strategic Team" 
          className="w-full h-full object-cover scale-105 animate-slow-zoom [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_60%)] dark:opacity-75" 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent dark:from-slate-950 dark:via-slate-950/95 dark:to-transparent z-10"></div>
      </div>

      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-14 relative z-20 w-full pt-28 md:pt-40 pb-24 md:pb-32">
        <div className="max-w-4xl">
          {/* Badge superior */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a008a]/5 dark:bg-white/10 backdrop-blur-md text-[#0a008a] dark:text-accent font-bold text-sm mb-8 border border-[#0a008a]/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="tracking-widest uppercase text-[10px]">Impulsando el potencial humano</span>
          </div>
          
          {/* TÍTULO: Fuente máxima y Extra Bold */}
          <h1 className="text-5xl lg:text-8xl font-black tracking-tighter mb-8 leading-[1.05] text-slate-900 dark:text-white">
            Transformamos organizaciones <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0a008a] via-[#7b2cbf] to-[#9d4edd] italic">
              a través del talento
            </span>
          </h1>
          
          <p className="text-lg lg:text-2xl text-slate-600 dark:text-slate-300 font-medium mb-12 leading-relaxed max-w-3xl">
            Ofrecemos soluciones estratégicas de RRHH que conecten los objetivos organizacionales con la excelencia del equipo.
          </p>
          
          {/* BOTONES: Tamaño y estilo corregido */}
          <div className="flex flex-wrap gap-5">
            <button 
              onClick={() => scroll('contacto')}
              className="bg-[#0a008a] text-white px-10 py-5 rounded-full text-lg font-extrabold shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 uppercase tracking-tighter"
            >
              Agendar Consultoría
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>

            <button 
              onClick={() => scroll('servicios')}
              className="bg-white dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/10 px-10 py-5 rounded-full text-lg font-extrabold hover:bg-slate-50 dark:hover:bg-white/20 transition-all text-slate-700 dark:text-white shadow-sm uppercase tracking-tighter"
            >
              Ver Soluciones
            </button>

            <button 
              onClick={() => scroll('talento')}
              className="bg-transparent border border-slate-300 dark:border-white/20 px-8 py-5 rounded-full text-lg font-extrabold hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-slate-800 dark:text-white flex items-center gap-2 group uppercase tracking-tighter"
            >
              <span className="material-symbols-outlined group-hover:text-[#7b2cbf] transition-colors">groups</span>
              Talento Apax
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
