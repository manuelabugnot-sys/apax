
import React from 'react';

const StrategicSection: React.FC = () => {
  return (
    <section id="consultoria-pilar" className="py-24 bg-slate-50 dark:bg-slate-900/30 scroll-mt-20 overflow-hidden transition-colors duration-300">
      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
            <div className="w-20 h-1 bg-gradient-to-r from-accent to-primary mb-6 rounded-full"></div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-primary dark:text-white tracking-tight">Consultoría Estratégica</h2>
            <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-manrope">
              <p>
                Nuestra consultoría no se limita a la asesoría técnica; nos convertimos en arquitectos de la estructura organizacional. Analizamos cada capa de su empresa para identificar cuellos de botella y oportunidades de optimización.
              </p>
              <p>
                Implementamos soluciones de <strong>Change Management</strong> y rediseño de procesos que aseguran que su capital humano sea el motor que impulse el crecimiento del negocio hacia adelante.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                  <span className="material-symbols-outlined text-primary dark:text-accent mb-2">trending_up</span>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Crecimiento</p>
                  <p className="text-sm font-bold text-primary dark:text-white">Escalabilidad Real</p>
                </div>
                <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                  <span className="material-symbols-outlined text-magenta mb-2">account_tree</span>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Estructura</p>
                  <p className="text-sm font-bold text-primary dark:text-white">Diseño Ágil</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 group">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070" 
                alt="Sinergia Estratégica Apax" 
                className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                <div className="w-12 h-1 bg-white mb-4 rounded-full"></div>
                <p className="text-white text-xl md:text-2xl font-display font-medium italic leading-tight">
                  "La sinergia perfecta entre visión estratégica y ejecución humana."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrategicSection;
