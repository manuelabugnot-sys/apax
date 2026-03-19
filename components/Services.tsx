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
    fullDesc: "Nuestro proceso de Reclutamiento no es solo encontrar currículums; es identificar piezas fundamentales para el engranaje de su cultura. Utilizamos metodologías de 'Human-Centric Sourcing' para asegurar que el candidato no solo posea las habilidades técnicas, sino los valores compartidos con su organización.",
    methodology: [
      "Levantamiento de Perfil Cultural (Culture Fit Analysis).",
      "Sourcing Pasivo en redes de nicho y bases privadas.",
      "Entrevistas por Competencias (STAR Method).",
      "Validación de Referencias 360°."
    ],
    businessUnits: [
      { 
        name: "IT & Digital Specialists", 
        colorClass: "from-blue-600 to-cyan-500 shadow-blue-500/20",
        icon: "terminal",
        description: "Unidad especializada en perfiles tecnológicos (Developers, Data Scientists, DevOps). Entendemos los stacks tecnológicos y la velocidad que requiere este mercado."
      },
      { 
        name: "Mandos Medios & Profesionales", 
        colorClass: "from-emerald-600 to-teal-500 shadow-emerald-500/20",
        icon: "work",
        description: "Selección de analistas senior, coordinadores y especialistas en áreas corporativas (Finanzas, HR, Marketing) que sostienen la operación diaria."
      },
      { 
        name: "Executive Search (Headhunting)", 
        colorClass: "from-indigo-600 to-blue-700 shadow-indigo-500/20",
        icon: "diamond",
        description: "Búsqueda confidencial y de 'guante blanco' para posiciones de Dirección y Gerencia General. Mapeo de mercado exhaustivo y acercamiento discreto."
      },
      { 
        name: "RPO (Procesos Masivos)", 
        colorClass: "from-slate-700 to-slate-900 shadow-slate-500/20",
        icon: "factory",
        description: "Recruitment Process Outsourcing para expansiones o aperturas de plantas. Actuamos como su departamento interno de selección."
      }
    ],
    benefits: [
      "Reducción de la tasa de rotación temprana.",
      "Candidatos alineados con la visión de largo plazo.",
      "Ahorro significativo en tiempos de contratación."
    ]
  },
  {
    id: 'gestion',
    title: "Gestión del Talento",
    icon: "psychology",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070",
    fullDesc: "Cuidamos su activo más valioso mediante programas de desarrollo que potencian las capacidades actuales y preparan a su equipo para los desafíos del futuro.",
    methodology: [
      "Diagnóstico de Brechas de Habilidades.",
      "Diseño Instruccional a Medida.",
      "Medición del ROI de la Capacitación.",
      "Seguimiento de Adopción de Conductas."
    ],
    businessUnits: [
        { 
          name: "Liderazgo & Gestión", 
          colorClass: "from-violet-600 to-fuchsia-600 shadow-violet-500/20",
          icon: "supervisor_account",
          description: "Entrenamiento para nuevos líderes y mandos medios. Fortalecemos habilidades de comunicación y feedback efectivo."
        },
        { 
          name: "Diversidad e Inclusión (D&I)", 
          colorClass: "from-magenta to-primary shadow-magenta/20",
          icon: "diversity_3",
          description: "Diseñamos estrategias de inclusión que fomenten entornos equitativos, potenciando la innovación."
        },
        { 
          name: "Employee Experience", 
          colorClass: "from-rose-500 to-orange-500 shadow-rose-500/20",
          icon: "favorite",
          description: "Diseño del 'Employee Journey' para mejorar el compromiso y reducir el burnout."
        }
    ],
    benefits: [
      "Incremento en el compromiso (Engagement).",
      "Detección de altos potenciales (HiPo).",
      "Fortalecimiento de la Marca Empleadora."
    ]
  },
  {
    id: 'consultoria',
    title: "Consultoría Estratégica",
    icon: "hub",
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070",
    fullDesc: "Alineamos su arquitectura de RRHH con los objetivos de negocio. Transformamos la estructura organizacional para que sea ágil, eficiente y humana.",
    methodology: [
      "Análisis de Estructuras Organizativas.",
      "Planificación de Workforce.",
      "Reingeniería de Procesos de Negocio."
    ],
    businessUnits: [
        { 
          name: "Cultura Organizacional", 
          colorClass: "from-lime-600 to-green-600 shadow-lime-500/20",
          icon: "sentiment_very_satisfied",
          description: "Diagnóstico profundo de salud organizacional y diseño de planes de bienestar."
        },
        { 
          name: "Gestión del Cambio", 
          colorClass: "from-primary to-indigo-600 shadow-primary/20",
          icon: "published_with_changes",
          description: "Acompañamiento en fusiones o implementaciones tecnológicas para asegurar la adopción humana."
        },
        { 
          name: "People Analytics", 
          colorClass: "from-blue-700 to-indigo-800 shadow-blue-500/20",
          icon: "query_stats",
          description: "Transformamos datos en información para la toma de decisiones estratégicas."
        }
    ],
    benefits: [
      "Estructuras más ágiles y menos burocráticas.",
      "Mejora del clima laboral basada en datos.",
      "Optimización de costos operativos."
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
    className={`group cursor-pointer relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${featured ? 'md:scale-105 z-10' : ''}`}
  >
    <img 
      alt={service.title} 
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
      src={service.img}
    />
    <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/80 to-magenta/40 opacity-90 group-hover:opacity-85 transition-opacity"></div>
    <div className="relative z-10 p-10 flex flex-col h-full text-white">
      <div className="w-14 h-14 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white mb-6 border border-white/20">
        <span className="material-symbols-outlined text-3xl">{service.icon}</span>
      </div>
      <h3 className="text-3xl font-bold mb-4 tracking-tight">{service.title}</h3>
      <p className="text-white/80 mb-8 leading-relaxed line-clamp-3 font-light">
        {service.fullDesc}
      </p>
      <div className="mt-auto inline-flex items-center gap-2 font-bold text-magenta group-hover:gap-4 transition-all">
        Explorar Solución <span className="material-symbols-outlined">arrow_forward</span>
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
    <section id="servicios" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-500 scroll-mt-20">
      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="w-20 h-1.5 bg-gradient-to-r from-primary to-magenta mb-8 rounded-full mx-auto"></div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white tracking-tight">Soluciones Integrales</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-light">
            Estrategias diseñadas para potenciar el capital humano y transformar la cultura organizacional.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
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

      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div 
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" 
            onClick={() => setSelectedService(null)}
          ></div>
          
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-6xl max-h-[92vh] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-slate-100 dark:border-white/5 animate-scale-up">
            
            {/* Lateral Visual */}
            <div className="w-full md:w-2/5 relative h-64 md:h-auto">
              <img src={selectedService.img} alt={selectedService.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950/80 to-transparent"></div>
              <div className="absolute bottom-10 left-10 text-white">
                <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-3xl">{selectedService.icon}</span>
                </div>
                <h4 className="text-3xl font-bold tracking-tight">{selectedService.title}</h4>
              </div>
            </div>

            {/* Contenido */}
            <div className="w-full md:w-3/5 p-8 md:p-16 overflow-y-auto custom-scrollbar bg-white dark:bg-slate-900">
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-magenta transition-colors z-30"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <div className="space-y-12">
                <div>
                  <h5 className="text-xs font-black uppercase tracking-widest text-magenta mb-4">La Propuesta Apax</h5>
                  <p className="text-xl text-slate-700 dark:text-slate-200 leading-relaxed font-light">
                    {selectedService.fullDesc}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-10">
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-widest text-primary dark:text-magenta mb-6">Metodología</h5>
                    <ul className="space-y-4">
                      {selectedService.methodology.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                          <span className="material-symbols-outlined text-magenta text-xl">check_circle</span>
                          <span className="text-sm font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-widest text-primary dark:text-magenta mb-6">Impacto</h5>
                    <ul className="space-y-4">
                      {selectedService.benefits.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
                          <span className="material-symbols-outlined text-primary dark:text-blue-400 text-xl">trending_up</span>
                          <span className="text-sm font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {selectedService.businessUnits && (
                  <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
                    <h5 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 text-center">Especialidades Técnicas</h5>
                    <div className="flex flex-wrap justify-center gap-3">
                      {selectedService.businessUnits.map((unit, i) => (
                        <button 
                          key={i} 
                          onClick={() => setActiveUnit(activeUnit?.name === unit.name ? null : unit)}
                          className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 border shadow-sm ${
                            activeUnit?.name === unit.name 
                            ? `bg-gradient-to-r ${unit.colorClass} text-white border-transparent scale-105 shadow-lg` 
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-100 dark:border-slate-700 hover:border-magenta'
                          }`}
                        >
                          <span className="material-symbols-outlined text-lg">{unit.icon}</span>
                          {unit.name}
                        </button>
                      ))}
                    </div>

                    {activeUnit && (
                      <div className="mt-8 p-8 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-700 animate-fade-in">
                        <h6 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${activeUnit.colorClass}`}></span>
                          {activeUnit.name}
                        </h6>
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-light">
                          {activeUnit.description}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
