import React, { useState, useEffect } from 'react';

const servicesData = [
  {
    id: 'reclutamiento',
    title: "Reclutamiento de Excelencia",
    icon: "person_search",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=2070",
    fullDesc: "Nuestro proceso de Reclutamiento no es solo encontrar currículums; es identificar piezas fundamentales para el engranaje de su cultura.",
  },
  {
    id: 'gestion',
    title: "Gestión del Talento",
    icon: "psychology",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070",
    fullDesc: "Cuidamos su activo más valioso mediante programas de desarrollo que potencian las capacidades actuales.",
  },
  {
    id: 'consultoria',
    title: "Consultoría Estratégica",
    icon: "hub",
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070",
    fullDesc: "Alineamos su arquitectura de RRHH con los objetivos de negocio. Transformamos la estructura organizacional.",
  }
];

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<any>(null);

  useEffect(() => {
    document.body.style.overflow = selectedService ? 'hidden' : 'auto';
  }, [selectedService]);

  return (
    <section id="servicios" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300 scroll-mt-20">
      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4 lg:px-14">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="w-20 h-1.5 bg-gradient-to-r from-[#1a008a] to-[#7b2cbf] mb-8 rounded-full mx-auto"></div>
          
          {/* TÍTULO EN AZUL DEGRADADO */}
          <h2 className="text-4xl md:text-6xl font-[900] mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#1a008a] to-[#7b2cbf]">
            Soluciones Integrales
          </h2>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
            Click en cada solución para explorar en profundidad nuestra propuesta diferencial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <div 
              key={service.id}
              onClick={() => setSelectedService(service)}
              className={`group cursor-pointer relative h-[480px] rounded-[2.5rem] overflow-hidden bg-[#1a008a] shadow-2xl transition-all duration-500 hover:-translate-y-2 ${index === 1 ? 'md:scale-105 z-10' : ''}`}
            >
              {/* IMAGEN: Desvanecida hacia la IZQUIERDA (to_right hace que la derecha sea negra/opaca y la izq transparente) */}
              <img 
                alt={service.title} 
                className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110 [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_100%)] [mask-image:linear-gradient(to_right,transparent_0%,black_100%)]" 
                src={service.img}
              />
              
              {/* Overlay lateral izquierdo para asegurar legibilidad del texto */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a008a] via-[#1a008a]/20 to-transparent opacity-90"></div>

              <div className="relative z-10 p-10 flex flex-col h-full text-white">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-6 border border-white/20">
                  <span className="material-symbols-outlined text-3xl">{service.icon}</span>
                </div>
                <h3 className="text-3xl font-black mb-4 tracking-tighter leading-none">{service.title}</h3>
                <p className="text-white/90 mb-8 leading-relaxed line-clamp-4 font-medium italic">
                  {service.fullDesc}
                </p>
                <div className="mt-auto inline-flex items-center gap-2 font-bold text-white group-hover:gap-4 transition-all uppercase text-xs tracking-widest">
                  Saber Más <span className="material-symbols-outlined">arrow_forward</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL DETALLADO */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setSelectedService(null)}></div>
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-4xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
             <button onClick={() => setSelectedService(null)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 dark:hover:text-white z-50">
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
            <div className="p-12">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#1a008a] mb-6">Detalle del Servicio</h4>
              <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6">{selectedService.title}</h2>
              <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium mb-10">{selectedService.fullDesc}</p>
              <button onClick={() => setSelectedService(null)} className="px-10 py-4 bg-[#1a008a] text-white rounded-full font-bold shadow-lg hover:scale-105 transition-all">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
