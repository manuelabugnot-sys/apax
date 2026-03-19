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
    fullDesc: "Nuestro proceso de Reclutamiento identifica piezas fundamentales para el engranaje de su cultura. Utilizamos metodologías de 'Human-Centric Sourcing' para asegurar que el talento posea tanto habilidades técnicas como valores compartidos.",
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
        description: "Especializados en perfiles tecnológicos (Devs, Data, DevOps) entendiendo los stacks y la velocidad del mercado."
      },
      { 
        name: "Mandos Medios & Profesionales", 
        colorClass: "from-emerald-600 to-teal-500 shadow-emerald-500/20",
        icon: "work",
        description: "Selección de analistas senior y especialistas corporativos que sostienen la operación diaria."
      },
      { 
        name: "Executive Search", 
        colorClass: "from-indigo-600 to-blue-800 shadow-indigo-500/20",
        icon: "diamond",
        description: "Búsqueda confidencial de 'guante blanco' para posiciones de Dirección y Gerencia General."
      },
      { 
        name: "RPO (Procesos Masivos)", 
        colorClass: "from-slate-700 to-slate-900 shadow-slate-500/20",
        icon: "factory",
        description: "Recruitment Process Outsourcing para expansiones o aperturas de plantas."
      },
      { 
        name: "Programas de Semilleros", 
        colorClass: "from-orange-500 to-pink-500 shadow-orange-500/20",
        icon: "school",
        description: "Captación de Jóvenes Profesionales y Pasantías para detectar el talento futuro."
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
    fullDesc: "Potenciamos las capacidades actuales y preparamos a su equipo para los desafíos del futuro mediante un mapeo preciso de capacidades y planes de carrera motivadores.",
    methodology: [
      "Diagnóstico de Brechas de Habilidades (Skill Gap).",
      "Diseño Instruccional de Contenidos a Medida.",
      "Medición del ROI de la Capacitación.",
      "Seguimiento de Adopción de Conductas."
    ],
    businessUnits: [
        { 
          name: "Liderazgo & Gestión", 
          colorClass: "from-violet-600 to-fuchsia-600 shadow-violet-500/20",
          icon: "supervisor_account",
          description: "Entrenamiento para nuevos líderes en feedback, comunicación y gestión de equipos."
        },
        { 
          name: "Performance Management", 
          colorClass: "from-cyan-600 to-blue-600 shadow-cyan-500/20",
          icon: "speed",
          description: "Diseño de procesos de Evaluación (OKRs, 9-Box) enfocados en el feedback continuo."
        },
        { 
          name: "Diversidad e Inclusión (D&I)", 
          colorClass: "from-indigo-500 to-purple-600 shadow-indigo-500/20",
          icon: "diversity_3",
          description: "Estrategias de inclusión para entornos equitativos que potencien la innovación."
        },
        { 
          name: "Employee Experience (EX)", 
          colorClass: "from-rose-500 to-orange-500 shadow-rose-500/20",
          icon: "favorite",
          description: "Diseño del 'Employee Journey' para mejorar el compromiso y reducir el burnout."
        },
        { 
          name: "Coaching Ejecutivo", 
          colorClass: "from-amber-500 to-orange-600 shadow-amber-500/20",
          icon: "self_improvement",
          description: "Sesiones 1:1 para directivos enfocadas en competencias blandas y toma estratégica de decisiones."
        },
        { 
          name: "Política de Compensaciones", 
          colorClass: "from-emerald-500 to-green-700 shadow-emerald-500/20",
          icon: "payments",
          description: "Diseño de bandas salariales y beneficios flexibles para asegurar equidad y competitividad."
        }
    ],
    benefits: [
      "Incremento en el engagement del equipo.",
      "Retención de altos potenciales (HiPo).",
      "Fortalecimiento de la Marca Empleadora."
    ]
  },
  {
    id: 'consultoria',
    title: "Consultoría Estratégica",
    icon: "hub",
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070",
    fullDesc: "Alineamos su arquitectura de RRHH con los objetivos de negocio, transformando la estructura para que sea ágil, eficiente y, sobre todo, humana.",
    methodology: [
      "Reingeniería de Procesos de Negocio (BPR).",
      "Análisis de Estructuras Organizativas.",
      "Planificación Estratégica de Workforce."
    ],
    businessUnits: [
        { 
          name: "Clima & Cultura", 
          colorClass: "from-lime-600 to-green-600 shadow-lime-500/20",
          icon: "sentiment_very_satisfied",
          description: "Diagnóstico profundo de salud organizacional y diseño de planes de acción de bienestar."
        },
        { 
          name: "Outplacement", 
          colorClass: "from-slate-700 to-slate-900 shadow-slate-500/20",
          icon: "next_plan",
          description: "Programas de transición de carrera para desvinculaciones responsables."
        },
        { 
          name: "Gestión del Cambio", 
          colorClass: "from-indigo-600 to-purple-600 shadow-indigo-500/20",
          icon: "published_with_changes",
          description: "Acompañamiento en fusiones (M&A) o implementaciones tecnológicas (ERP/CRM)."
        },
        { 
          name: "People Analytics", 
          colorClass: "from-blue-700 to-indigo-800 shadow-blue-500/20",
          icon: "query_stats",
          description: "Transformamos datos dispersos en KPIs estratégicos (Rotación, Absentismo, Headcount)."
        },
        { 
          name: "Startups & Scale-ups", 
          colorClass: "from-fuchsia-600 to-pink-700 shadow-fuchsia-500/20",
          icon: "rocket_launch",
          description: "Creación del área de RRHH desde cero y profesionalización para empresas en crecimiento."
        },
        { 
          name: "Manuales & Puestos", 
          colorClass: "from-teal-600 to-emerald-600 shadow-teal-500/20",
          icon: "menu_book",
          description: "Definición clara de roles y responsabilidades para optimizar la operación."
        }
    ],
    benefits: [
      "Estructuras ágiles y menos burocráticas.",
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
    className={`group cursor-pointer relative h-full rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${featured ? 'md:scale-105 z-10' : ''}`}
  >
    <img 
      alt={`${service.title} Background`} 
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
      src={service.img}
    />
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/85 to-indigo-900/80 opacity-95 group-hover:opacity-90 transition-opacity"></div>
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
      setActiveUnit(null);
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedService]);

  return (
    <section id="servicios" className="py-24 bg-white dark:bg-slate-900 scroll-mt-20">
      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mb-6 rounded-full mx-auto"></div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">Soluciones de Capital Humano</h2>
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
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-2xl">{selectedService.icon}</span>
                </div>
                <h4 className="text-2xl font-bold">{selectedService.title}</h4>
              </div>
            </div>

            {/* Contenido */}
            <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto">
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-indigo-600 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <div className="space-y-8">
                <div>
                  <h5 className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-4">Visión Apax</h5>
                  <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                    {selectedService.fullDesc}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-4">Metodología</h5>
                    <ul className="space-y-3">
                      {selectedService.methodology.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                          <span className="material-symbols-outlined text-indigo-600 text-sm mt-0.5">settings_suggest</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-4">Impacto Real</h5>
                    <ul className="space-y-3">
                      {selectedService.benefits.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                          <span className="material-symbols-outlined text-indigo-600 text-sm mt-0.5">trending_up</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {selectedService.businessUnits && (
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-4">
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
                              ${isActive ? 'ring-4 ring-offset-2 ring-indigo-500/30 scale-105' : 'hover:scale-105 opacity-90 hover:opacity-100'}
                            `}
                          >
                            <div className="p-1 bg-white/20 rounded-lg backdrop-blur-sm">
                               <span className="material-symbols-outlined text-sm font-bold">{unit.icon}</span>
                            </div>
                            <span className="text-xs font-bold tracking-wide">{unit.name}</span>
                          </button>
                        );
                      })}
                    </div>

                    {activeUnit && (
                      <div className="animate-fade-in bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
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
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold flex-1 transition-colors"
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

// LA LÍNEA MÁS IMPORTANTE PARA VERCEL:
export default Services;
