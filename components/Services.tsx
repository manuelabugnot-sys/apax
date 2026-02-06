import React, { useState, useEffect } from 'react';

interface BusinessUnit {
  name: string;
  colorClass: string;
  icon: string;
  description: string;
}

interface ServiceDetail {
  id: string;
  title: string;
  fullDesc: string;
  methodology: string[];
  benefits: string[];
  businessUnits?: BusinessUnit[];
  icon: string;
  img: string;
}

const servicesData: ServiceDetail[] = [
  {
    id: 'reclutamiento',
    title: "Reclutamiento de Excelencia",
    icon: "person_search",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=2070",
    fullDesc: "Nuestro proceso de Reclutamiento no es solo encontrar currículums; es identificar piezas fundamentales para el engranaje de su cultura.",
    methodology: ["Culture Fit Analysis", "STAR Method", "Validación 360°"],
    benefits: ["Reducción de rotación", "Alineación cultural", "Ahorro de tiempo"],
    businessUnits: [
      { name: "IT Specialists", colorClass: "from-blue-600 to-cyan-500", icon: "terminal", description: "Perfiles tecnológicos de alto nivel." },
      { name: "Executive Search", colorClass: "from-[#0a008a] to-indigo-600", icon: "diamond", description: "Headhunting para alta gerencia." }
    ]
  },
  {
    id: 'gestion',
    title: "Gestión del Talento",
    icon: "psychology",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070",
    fullDesc: "Potenciamos las capacidades actuales y preparamos a su equipo para los desafíos del futuro.",
    methodology: ["Skill Gap Analysis", "Medición ROI", "Feedback Continuo"],
    benefits: ["Engagement alto", "Retención HiPo", "Employer Branding"],
    businessUnits: [
      { name: "Liderazgo", colorClass: "from-violet-600 to-fuchsia-600", icon: "supervisor_account", description: "Entrenamiento para mandos medios." },
      { name: "Performance", colorClass: "from-cyan-600 to-blue-600", icon: "speed", description: "OKRs y evaluación dinámica." }
    ]
  },
  {
    id: 'consultoria',
    title: "Consultoría Estratégica",
    icon: "hub",
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070",
    fullDesc: "Alineamos su arquitectura de RRHH con los objetivos de negocio. Transformamos la estructura organizacional.",
    methodology: ["BPR Reingeniería", "People Analytics", "Change Management"],
    benefits: ["Estructuras ágiles", "Optimización de costos", "Mejora de clima"],
    businessUnits: [
      { name: "People Analytics", colorClass: "from-blue-700 to-indigo-800", icon: "query_stats", description: "Dashboards y KPIs de talento." },
      { name: "Startups", colorClass: "from-fuchsia-600 to-pink-700", icon: "rocket_launch", description: "HR from scratch para empresas en crecimiento." }
    ]
  }
];

const ServiceCard: React.FC<{
  service: ServiceDetail;
  onOpen: (service: ServiceDetail) => void;
  featured?: boolean;
}> = ({ service, onOpen, featured }) => (
  <div 
    onClick={() => onOpen(service)}
    className={`group cursor-pointer relative h-[450px] rounded-[2.5rem] overflow-hidden bg-[#0a008a] shadow-2xl transition-all duration-500 hover:-translate-y-3 ${featured ? 'md:scale-105 z-10' : ''}`}
  >
    {/* IMAGEN CON MÁSCARA DEL HERO */}
    <img 
      alt={service.title} 
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 
      [-webkit-mask-image:linear-gradient(to_bottom,black_10%,transparent_90%)]
      [mask-image:linear-gradient(to_bottom,black_10%,transparent_90%)]" 
      src={service.img}
    />
    
    {/* Overlay para profundidad */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#0a008a] via-transparent to-transparent opacity-80"></div>

    <div className="relative z-10 p-10 flex flex-col h-full text-white">
      <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-6 border border-white/20 shadow-lg">
        <span className="material-symbols-outlined text-4xl">{service.icon}</span>
      </div>
      <h3 className="text-3xl font-black mb-4 tracking-tighter leading-none">{service.title}</h3>
      <p className="text-white/80 mb-8 leading-relaxed line-clamp-3 font-medium">
        {service.fullDesc}
      </p>
      <div className="mt-auto inline-flex items-center gap-2 font-bold text-white group-hover:gap-4 transition-all uppercase text-xs tracking-[0.2em]">
        Saber Más <span className="material-symbols-outlined">arrow_forward</span>
      </div>
    </div>
  </div>
);

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [activeUnit, setActiveUnit] = useState<BusinessUnit | null>(null);

  useEffect(() => {
    document.body.style.overflow = selectedService ? 'hidden' : 'auto';
  }, [selectedService]);

  return (
    <section id="servicios" className="py-32 bg-white dark:bg-slate-950 scroll-mt-20">
      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4 lg:px-14">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#0a008a] to-[#7b2cbf] mb-8 rounded-full mx-auto"></div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 dark:text-white tracking-tighter">Nuestras Soluciones</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 font-medium">Diseñamos el futuro de su organización a través del desarrollo estratégico del talento.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 items-stretch">
          {servicesData.map((service, index) => (
            <ServiceCard key={service.id} service={service} onOpen={setSelectedService} featured={index === 1} />
          ))}
        </div>
      </div>

      {/* MODAL DETALLADO */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => setSelectedService(null)}></div>
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-5xl max-h-[90vh] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-scale-up">
            <div className="w-full md:w-2/5 relative h-64 md:h-auto bg-[#0a008a]">
              <img src={selectedService.img} alt={selectedService.title} className="w-full h-full object-cover opacity-60" />
              <div className="absolute bottom-8 left-8 text-white">
                <h4 className="text-3xl font-black tracking-tighter">{selectedService.title}</h4>
              </div>
            </div>
            <div className="w-full md:w-3/5 p-12 overflow-y-auto custom-scrollbar">
               <button onClick={() => setSelectedService(null)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition-colors">
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>
              <div className="space-y-8">
                <p className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{selectedService.fullDesc}</p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-widest text-[#0a008a] mb-4">Metodología</h5>
                    <ul className="space-y-2">{selectedService.methodology.map((m, i) => <li key={i} className="text-sm text-slate-600 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#7b2cbf]"></span>{m}</li>)}</ul>
                  </div>
                </div>
                <button onClick={() => setSelectedService(null)} className="w-full py-5 bg-gradient-to-r from-[#0a008a] to-[#7b2cbf] text-white rounded-2xl font-bold text-lg shadow-xl hover:scale-[1.02] transition-all">Cerrar Detalle</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
