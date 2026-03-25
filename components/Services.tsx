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
        colorClass: "from-primary to-indigo-600 shadow-primary/20",
        icon: "diamond",
        description: "Búsqueda confidencial y de 'guante blanco' para posiciones de Dirección y Gerencia General. Mapeo de mercado exhaustivo y acercamiento discreto."
      },
      { 
        name: "RPO (Procesos Masivos)", 
        colorClass: "from-slate-700 to-slate-900 shadow-slate-500/20",
        icon: "factory",
        description: "Recruitment Process Outsourcing para expansiones, aperturas de sucursales o picos estacionales. Actuamos como su departamento interno de selección."
      },
      { 
        name: "Programas de Semilleros", 
        colorClass: "from-orange-500 to-pink-500 shadow-orange-500/20",
        icon: "school",
        description: "Captación de Jóvenes Profesionales y Pasantías. Vínculos con universidades para detectar el talento futuro antes que la competencia."
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
    fullDesc: "Cuidamos su activo más valioso mediante programas de desarrollo que potencian las capacidades actuales y preparan a su equipo para los desafíos del futuro. La gestión del talento en Apax se basa en el mapeo preciso de capacidades y el diseño de planes de carrera motivadores.",
    methodology: [
      "Diagnóstico de Brechas de Habilidades (Skill Gap Analysis).",
      "Diseño Instruccional de Contenidos a Medida.",
      "Medición del ROI de la Capacitación.",
      "Seguimiento de Adopción de Nuevas Conductas."
    ],
    businessUnits: [
        { 
          name: "Liderazgo & Gestión de Equipos", 
          colorClass: "from-violet-600 to-fuchsia-600 shadow-violet-500/20",
          icon: "supervisor_account",
          description: "Entrenamiento para nuevos líderes y mandos medios. Fortalecemos habilidades de comunicación, feedback efectivo y gestión de equipos diversos."
        },
        { 
          name: "Performance Management", 
          colorClass: "from-cyan-600 to-blue-600 shadow-cyan-500/20",
          icon: "speed",
          description: "Diseño de procesos de Evaluación de Desempeño (OKRs, 9-Box). Pasamos de la evaluación anual al feedback continuo."
        },
        { 
          name: "Diversidad e Inclusión (D&I)", 
          colorClass: "from-indigo-500 to-purple-600 shadow-indigo-500/20",
          icon: "diversity_3",
          description: "Diseñamos estrategias de inclusión que fomenten entornos de trabajo equitativos y diversos, potenciando la innovación a través de la multiplicidad de perspectivas."
        },
        { 
          name: "Employee Experience (EX)", 
          colorClass: "from-rose-500 to-orange-500 shadow-rose-500/20",
          icon: "favorite",
          description: "Diseño del 'Employee Journey' y fidelización. Intervenciones puntuales para mejorar el compromiso y reducir el burnout."
        },
        { 
          name: "Coaching Ejecutivo", 
          colorClass: "from-amber-500 to-orange-600 shadow-amber-500/20",
          icon: "self_improvement",
          description: "Sesiones 1:1 para directivos y líderes de alto potencial. Trabajo enfocado en competencias blandas, comunicación estratégica y toma de decisiones."
        },
        { 
          name: "Política de Compensaciones", 
          colorClass: "from-emerald-500 to-green-700 shadow-emerald-500/20",
          icon: "payments",
          description: "Diseño de bandas salariales, esquemas de bonos variables y beneficios flexibles para asegurar la equidad interna y competitividad externa."
        }
    ],
    benefits: [
      "Incremento en el compromiso (Engagement) del equipo.",
      "Detección temprana y retención de altos potenciales (HiPo).",
      "Fortalecimiento de la marca empleadora (Employer Branding)."
    ]
  },
  {
    id: 'consultoria',
    title: "Consultoría Estratégica",
    icon: "hub",
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070",
    fullDesc: "Alineamos su arquitectura de RRHH con los objetivos de negocio. Transformamos la estructura organizacional para que sea ágil, eficiente y humana. No somos solo asesores; somos socios estratégicos que implementan cambios con impacto directo en el balance de la empresa.",
    methodology: [
      "Reingeniería de Procesos de Negocio (BPR).",
      "Análisis de Estructuras Organizativas.",
      "Planificación Estratégica de Workforce."
    ],
    businessUnits: [
        { 
          name: "Clima & Cultura Organizacional", 
          colorClass: "from-lime-600 to-green-600 shadow-lime-500/20",
          icon: "sentiment_very_satisfied",
          description: "Diagnóstico profundo de la salud organizacional. Medimos el compromiso, identificamos brechas culturales y diseñamos planes de acción para potenciar el bienestar."
        },
        { 
          name: "Outplacement", 
          colorClass: "from-slate-700 to-slate-900 shadow-slate-500/20",
          icon: "next_plan",
          description: "Programas de transición de carrera para desvinculaciones responsables. Asesoramiento psicológico, técnico y legal para el colaborador saliente."
        },
        { 
          name: "Gestión del Cambio (Change Mgmt)", 
          colorClass: "from-indigo-600 to-purple-600 shadow-indigo-500/20",
          icon: "published_with_changes",
          description: "Acompañamiento en fusiones, adquisiciones (M&A) o implementaciones tecnológicas (ERP/CRM) para asegurar la adopción humana del cambio."
        },
        { 
          name: "People Analytics", 
          colorClass: "from-blue-700 to-indigo-800 shadow-blue-500/20",
          icon: "query_stats",
          description: "Construcción de Dashboards y KPIs. Transformamos datos dispersos en información para la toma de decisiones (Headcount, Rotación, Absentismo)."
        },
        { 
          name: "Startups & Scale-ups", 
          colorClass: "from-fuchsia-600 to-pink-700 shadow-fuchsia-500/20",
          icon: "rocket_launch",
          description: "Consultoría específica para empresas en hipercrecimiento. Creación del área de RRHH desde cero ('HR from scratch') y profesionalización de procesos."
        },
        { 
          name: "Manuales & Descripción de Puestos", 
          colorClass: "from-teal-600 to-emerald-600 shadow-teal-500/20",
          icon: "menu_book",
          description: "Formalización de la estructura. Definición clara de roles, responsabilidades y alcances para ordenar la operación y evitar solapamientos."
        }
    ],
    benefits: [
      "Estructuras más ágiles y menos burocráticas.",
      "Mejora del clima laboral medida por datos reales.",
      "Optimización de costos operativos de RRHH."
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
    className={`group cursor-pointer relative h-full rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${featured ? 'md:scale-105 z-10' : ''}`}
  >
    <img 
      alt={`${service.title} Background`} 
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
      src={service.img}
    />
    <div className="absolute inset-0 bg-gradient-to-br from-navy/95 via-navy/85 to-magenta/80 opacity-95 group-hover:opacity-90 transition-opacity"></div>
    <div className="relative z-10 p-10 flex flex-col h-full text-white">
      <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-6 border border-white/20">
        <span className="material-symbols-outlined text-3xl">{service.icon}</span>
      </div>
      <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
      <p className="text-white/90 mb-8 leading-relaxed line-clamp-3">
        {service.fullDesc}
      </p>
      <div className="mt-auto inline-flex items-center gap-2 font-bold text-white group-hover:gap-4 transition-all">
        Saber Más <span className="material-symbols-outlined">arrow_forward</span>
      </div>
    </div>
  </div>
);

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [activeUnit, setActiveUnit] = useState<BusinessUnit | null>(null);

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
      // Reset active unit when opening a new service
      setActiveUnit(null);
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedService]);

  return (
    <section id="servicios" className="py-24 bg-white dark:bg-background-dark scroll-mt-20">
      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mb-6 rounded-full mx-auto"></div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-primary dark:text-white">Soluciones Integrales de RRHH</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
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

      {/* Ventana Detallada (Modal) */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fade-in">
          <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" 
            onClick={() => setSelectedService(null)}
          ></div>
          
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-scale-up">
            {/* Lateral Visual */}
            <div className="w-full md:w-2/5 relative h-48 md:h-auto">
              <img src={selectedService.img} alt={selectedService.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-navy/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-2xl">{selectedService.icon}</span>
                </div>
                <h4 className="text-2xl font-bold">{selectedService.title}</h4>
              </div>
            </div>

            {/* Contenido */}
            <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto custom-scrollbar">
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-navy transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <div className="space-y-8">
                <div>
                  <h5 className="text-xs font-black uppercase tracking-widest text-primary dark:text-accent mb-4">Visión Apax</h5>
                  <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                    {selectedService.fullDesc}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-widest text-primary dark:text-accent mb-4">Metodología (El Proceso)</h5>
                    <ul className="space-y-3">
                      {selectedService.methodology.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                          <span className="material-symbols-outlined text-primary dark:text-accent text-sm mt-0.5">settings_suggest</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-widest text-primary dark:text-accent mb-4">Impacto Real</h5>
                    <ul className="space-y-3">
                      {selectedService.benefits.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                          <span className="material-symbols-outlined text-primary dark:text-accent text-sm mt-0.5">trending_up</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Sección de Unidades de Negocio Interactiva */}
                {selectedService.businessUnits && (
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-widest text-primary dark:text-accent mb-4">
                      Soluciones Específicas <span className="font-normal text-slate-400 lowercase ml-1">(Click para ver detalle)</span>
                    </h5>
                    
                    <div className="flex flex-wrap gap-3 mb-6">
                      {selectedService.businessUnits.map((unit, i) => {
                        const isActive = activeUnit?.name === unit.name;
                        return (
                          <button 
                            key={i} 
                            onClick={() => setActiveUnit(unit)}
                            className={`
                              relative pl-3 pr-4 py-2.5 rounded-xl bg-gradient-to-r ${unit.colorClass} 
                              text-white shadow-lg transform transition-all duration-300
                              flex items-center gap-2 group outline-none
                              ${isActive ? 'ring-4 ring-offset-2 ring-primary/30 scale-105' : 'hover:scale-105 hover:shadow-xl opacity-90 hover:opacity-100'}
                            `}
                          >
                            <div className="p-1 bg-white/20 rounded-lg backdrop-blur-sm">
                               <span className="material-symbols-outlined text-sm font-bold">{unit.icon}</span>
                            </div>
                            <span className="text-xs font-bold tracking-wide">{unit.name}</span>
                            {isActive && (
                              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white dark:border-t-slate-800"></div>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Contenedor de Descripción Dinámica */}
                    {activeUnit && (
                      <div className="animate-fade-in bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 relative">
                        <div className="flex items-start gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white bg-gradient-to-br ${activeUnit.colorClass} shadow-lg shrink-0`}>
                            <span className="material-symbols-outlined text-lg">{activeUnit.icon}</span>
                          </div>
                          <div>
                            <h6 className="font-bold text-slate-900 dark:text-white mb-2">{activeUnit.name}</h6>
                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                              {activeUnit.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => {
                      setSelectedService(null);
                      const contact = document.getElementById('contacto');
                      contact?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn-gradient text-white px-8 py-4 rounded-xl font-bold flex-1"
                  >
                    Agendar Consultoría
                  </button>
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-8 py-4 rounded-xl font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
