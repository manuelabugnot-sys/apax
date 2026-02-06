import React from 'react';

const Hero: React.FC = () => {
  const scroll = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden scroll-mt-20 bg-white dark:bg-slate-950">
      <div className="absolute inset-0 z-0">
        {/* Imagen de fondo con máscara para que se funda con el blanco a la izquierda */}
        <img 
          alt="Strategic Team Collaboration" 
          className="w-full h-full object-cover scale-105 opacity-60 dark:opacity-30 [-webkit-mask-image:linear-gradient(to_right,transparent_10%,black_80%)]" 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-slate-950 dark:via-slate-950/90 z-10"></div>
      </div>

      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4 lg:px-14 relative z-20 w-full pt-20">
        <div className="max-w-5xl text-left">
          {/* Badge superior morado suave */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 dark:bg-white/10 text-[#5a189a] dark:text-accent font-bold text-sm mb-10 border border-purple-200">
            <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
            Impulsando el potencial humano
          </div>
          
          {/* TÍTULO: Tamaño masivo y peso extra bold */}
          <h1 className="text-6xl md:text-8xl lg:text-[100px] font-[900] tracking-tight mb-8 leading-[0.95] text-slate-900 dark:text-white">
            Transformamos <br /> organizaciones <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a008a] to-[#7b2cbf]">
              a través del talento
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 font-medium mb-12 leading-relaxed max-w-2xl">
            Ofrecemos soluciones estratégicas de RRHH que conecten los objetivos organizacionales con la excelencia del equipo.
          </p>
          
          {/* BOTONES: Estilos idénticos a la foto */}
          <div className="flex flex-wrap items-center gap-6">
            {/* Botón Principal (Morado Degradado) */}
            <button 
              onClick={() => scroll('contacto')}
              className="bg-gradient-to-r from-[#1a008a] to-[#7b2cbf] text-white px-10 py-5 rounded-[2.5rem] text-xl font-bold shadow-2xl hover:scale-105 transition-all flex items-center gap-4"
            >
              Agendar Consultoría
              <span className="material-symbols-outlined text-2xl">arrow_forward</span>
            </button>

            {/* Botón Soluciones (Blanco/Gris suave) */}
            <button 
              onClick={() => scroll('servicios')}
              className="bg-slate-50 dark:bg-white/10 text-slate-700 dark:text-white px-10 py-5 rounded-[2.5rem] text-xl font-bold border border-slate-200 hover:bg-white transition-all shadow-sm"
            >
              Ver Soluciones
            </button>

            {/* Botón Talento Apax (Con borde y icono) */}
            <button 
              onClick={() => scroll('talento')}
              className="bg-transparent border-2 border-slate-200 px-10 py-5 rounded-[2.5rem] text-xl font-bold text-slate-800 dark:text-white flex items-center gap-3 hover:bg-slate-50/50 transition-all"
            >
              <span className="material-symbols-outlined text-[#1a008a]">groups</span>
              Talento Apax
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
