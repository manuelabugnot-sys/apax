import React, { useState, useEffect } from 'react';

// ... (Mantenemos el servicesData igual)

const ServiceCard = ({ service, onOpen, featured }: any) => (
  <div 
    onClick={() => onOpen(service)}
    /* Ajustamos altura a h-[420px] y padding a p-8 para que sean más chicos */
    className={`group cursor-pointer relative h-[420px] rounded-[2rem] overflow-hidden bg-[#1a008a] shadow-xl transition-all duration-500 hover:-translate-y-2 ${featured ? 'md:scale-105 z-10' : ''}`}
  >
    {/* IMAGEN: Desvanecida hacia la IZQUIERDA (to_right con inicio transparente) */}
    <img 
      alt={service.title} 
      className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110 
      [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_100%)]
      [mask-image:linear-gradient(to_right,transparent_0%,black_100%)]" 
      src={service.img}
    />
    
    {/* Overlay para asegurar el tono azul en la parte izquierda del texto */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#1a008a] via-[#1a008a]/30 to-transparent opacity-90"></div>

    <div className="relative z-10 p-8 flex flex-col h-full text-white">
      {/* Icono más compacto */}
      <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center text-white mb-6 border border-white/20">
        <span className="material-symbols-outlined text-2xl">{service.icon}</span>
      </div>
      
      <h3 className="text-2xl font-bold mb-4 tracking-tight leading-snug">{service.title}</h3>
      
      <p className="text-white/80 mb-8 text-sm leading-relaxed line-clamp-4 font-medium">
        {service.fullDesc}
      </p>
      
      <div className="mt-auto inline-flex items-center gap-2 font-bold text-white group-hover:gap-4 transition-all text-sm">
        Saber Más <span className="material-symbols-outlined text-lg">arrow_forward</span>
      </div>
    </div>
  </div>
);

const Services = () => {
  const [selectedService, setSelectedService] = useState<any>(null);

  return (
    <section id="servicios" className="py-20 bg-white dark:bg-slate-950 scroll-mt-20">
      <div className="max-w-[90%] 2xl:max-w-screen-xl mx-auto px-4">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* TÍTULO EN AZUL (Sin degradado a púrpura para que sea azul sólido como la imagen) */}
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter text-[#1a008a] dark:text-white">
            Soluciones Integrales de RRHH
          </h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            Click en cada solución para explorar en profundidad nuestra propuesta diferencial.
          </p>
        </div>

        {/* Grid con GAP más ajustado */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {servicesData.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              onOpen={setSelectedService}
              featured={index === 1}
            />
          ))}
        </div>
      </div>

      {/* MODAL (Simplificado para evitar errores de visualización) */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl p-10 rounded-[2rem] shadow-2xl relative">
            <button onClick={() => setSelectedService(null)} className="absolute top-6 right-6 text-slate-400">
              <span className="material-symbols-outlined">close</span>
            </button>
            <h2 className="text-3xl font-black text-[#1a008a] mb-4">{selectedService.title}</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">{selectedService.fullDesc}</p>
            <button onClick={() => setSelectedService(null)} className="bg-[#1a008a] text-white px-8 py-3 rounded-full font-bold">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
