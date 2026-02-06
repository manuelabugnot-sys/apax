import React, { useState, useEffect } from 'react';

// --- MANTENEMOS TUS DATOS ORIGINALES ---
const servicesData = [
  {
    id: 'reclutamiento',
    title: "Reclutamiento de Excelencia",
    icon: "person_search",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=2070",
    fullDesc: "Nuestro proceso de Reclutamiento no es solo encontrar currículums; es identificar piezas fundamentales para el engranaje de su cultura.",
    methodology: ["Culture Fit Analysis", "Sourcing Pasivo", "Entrevistas STAR"],
    benefits: ["Reducción de rotación", "Alineación cultural"]
  },
  {
    id: 'gestion',
    title: "Gestión del Talento",
    icon: "psychology",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070",
    fullDesc: "Cuidamos su activo más valioso mediante programas de desarrollo que potencian las capacidades actuales.",
    methodology: ["Skill Gap Analysis", "Diseño Instruccional"],
    benefits: ["Incremento Engagement", "Retención de HiPo"]
  },
  {
    id: 'consultoria',
    title: "Consultoría Estratégica",
    icon: "hub",
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070",
    fullDesc: "Alineamos su arquitectura de RRHH con los objetivos de negocio. Transformamos la estructura organizacional.",
    methodology: ["Reingeniería Procesos", "People Analytics"],
    benefits: ["Estructuras ágiles", "Optimización costos"]
  }
];

const ServiceCard = ({ service, onOpen, featured }: any) => (
  <div 
    onClick={() => onOpen(service)}
    className={`group cursor-pointer relative h-[500px] rounded-[2.5rem] overflow-hidden bg-slate-900 shadow-2xl transition-all duration-500 hover:-translate-y-2 ${featured ? 'md:scale-105 z-10' : ''}`}
  >
    {/* EL EFECTO DE LA FOTO DEL HERO APLICADO AQUÍ */}
    <img 
      alt={service.title} 
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 
      [-webkit-mask-image:linear-gradient(to_bottom,black_20%,transparent_95%)]
      [mask-image:linear-gradient(to_bottom,black_20%,transparent_95%)]" 
      src={service.img}
    />
    
    {/* Degradado para asegurar legibilidad */}
    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>

    <div className="relative z-10 p-10 flex flex-col h-full text-white">
      <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-6 border border-white/20">
        <span className="material-symbols-outlined text-3xl">{service.icon}</span>
      </div>
      <h3 className="text-3xl font-black mb-4 tracking-tighter leading-none">{service.title}</h3>
      <p className="text-white/80 mb-8 leading-relaxed line-clamp-3 font-medium">
        {service.fullDesc}
      </p>
      <div className="mt-auto inline-flex items-center gap-2 font-bold text-white group-hover:gap-4 transition-all uppercase text-xs tracking-widest">
        Saber Más <span className="material-symbols-outlined">arrow_forward</span>
      </div>
    </div>
  </div>
);

const Services = () => {
  const [selectedService, setSelectedService] = useState<any>(null);

  useEffect(() => {
    document.body.style.overflow = selectedService ? 'hidden' : 'auto';
  }, [selectedService]);

  return (
    <section id="servicios" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300 scroll-mt-20">
      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4 lg:px-14">
        {/* Cabecera idéntica a la anterior */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="w-20 h-1.5 bg-gradient-to-r from-[#0a008a] to-[#7b2cbf] mb-8 rounded-full mx-auto"></div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 dark:text-white tracking-tighter">Soluciones Integrales</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
            Click en cada solución para explorar en profundidad nuestra propuesta diferencial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
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

      {/* MODAL DETALLADO ESTABLE */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setSelectedService(null)}></div>
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-slate-200 dark:border-slate-800">
            <div className="w-full md:w-2/5 relative h-48 md:h-auto bg-[#0a008a]">
              <img src={selectedService.img} alt={selectedService.title} className="w-full h-full object-cover opacity-60" />
              <div className="absolute bottom-6 left-6 text-white font-black text-2xl tracking-tighter">
                {selectedService.title}
              </div>
            </div>
            <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto bg-white dark:bg-slate-900">
               <button onClick={() => setSelectedService(null)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>
              <div className="space-y-6">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#0a008a] dark:text-[#7b2cbf]">Descripción del Servicio</h4>
                <p className="text-xl text-slate-700 dark:text-slate-200 leading-relaxed font-medium">{selectedService.fullDesc}</p>
                <button onClick={() => setSelectedService(null)} className="w-full py-5 bg-[#0a008a] text-white rounded-2xl font-bold text-lg shadow-xl hover:scale-[1.02] transition-all">
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
