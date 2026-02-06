import React, { useState, useEffect } from 'react';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 1,
      title: "Reclutamiento de Excelencia",
      icon: "person_search",
      img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070",
      desc: "Identificamos piezas fundamentales para su cultura organizacional."
    },
    {
      id: 2,
      title: "Gestión del Talento",
      icon: "psychology",
      img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070",
      desc: "Potenciamos las capacidades actuales de su equipo de trabajo."
    },
    {
      id: 3,
      title: "Consultoría Estratégica",
      icon: "hub",
      img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070",
      desc: "Alineamos su arquitectura de RRHH con los objetivos de negocio."
    }
  ];

  useEffect(() => {
    document.body.style.overflow = selectedService ? 'hidden' : 'auto';
  }, [selectedService]);

  return (
    <section id="servicios" className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* TÍTULO MÁS FINO Y ELEGANTE */}
        <div className="text-center mb-16">
          <div className="w-12 h-0.5 bg-[#1a008a] mb-8 rounded-full mx-auto opacity-50"></div>
          <h2 className="text-4xl md:text-5xl font-light text-[#1a008a] dark:text-white tracking-tight leading-tight mb-6">
            Soluciones Integrales de RRHH
          </h2>
          <p className="text-base text-slate-500 font-normal max-w-xl mx-auto">
            Click para explorar cada solución y descubrir nuestra propuesta diferencial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s) => (
            <div 
              key={s.id}
              onClick={() => setSelectedService(s)}
              className="group relative h-[300px] rounded-[1.5rem] overflow-hidden bg-[#1a008a] cursor-pointer shadow-lg hover:-translate-y-2 transition-all duration-500"
            >
              <img 
                src={s.img} 
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700 [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_100%)] [mask-image:linear-gradient(to_right,transparent_0%,black_100%)]"
              />
              
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a008a] via-[#1a008a]/30 to-transparent opacity-90"></div>

              <div className="relative z-10 p-8 flex flex-col h-full text-white">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center mb-4 border border-white/20">
                  <span className="material-symbols-outlined text-xl">{s.icon}</span>
                </div>
                <h3 className="text-2xl font-extrabold mb-3 leading-tight tracking-tight">{s.title}</h3>
                <p className="text-base text-white/90 leading-snug line-clamp-3 font-semibold mb-4">
                  {s.desc}
                </p>
                <div className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                  Saber Más <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedService(null)}>
          <div className="bg-white dark:bg-slate-900 p-10 rounded-[2rem] max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-3xl font-light text-[#1a008a] mb-4">{(selectedService as any).title}</h2>
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-8 font-medium">{(selectedService as any).desc}</p>
            <button 
              onClick={() => setSelectedService(null)}
              className="w-full py-4 bg-[#1a008a] text-white rounded-xl font-bold text-lg"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
