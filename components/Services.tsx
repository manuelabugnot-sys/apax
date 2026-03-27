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
      "Validación de Referencias 360° y Onboarding estratégico."
    ],
    businessUnits: [
      { name: "IT & Digital Specialists", colorClass: "from-blue-600 to-cyan-500 shadow-blue-500/20", icon: "terminal", description: "Especializados en perfiles tecnológicos (Devs, Data, DevOps) entendiendo los stacks y la velocidad del mercado." },
      { name: "Mandos Medios & Profesionales", colorClass: "from-emerald-600 to-teal-500 shadow-emerald-500/20", icon: "work", description: "Selección de analistas senior y especialistas corporativos que sostienen la operación diaria." },
      { name: "Executive Search", colorClass: "from-magenta to-[#7b2cbf] shadow-magenta/20", icon: "diamond", description: "Búsqueda confidencial de 'guante blanco' para posiciones de Dirección y Gerencia General." },
      { name: "RPO (Procesos Masivos)", colorClass: "from-slate-700 to-slate-900 shadow-slate-500/20", icon: "factory", description: "Recruitment Process Outsourcing para expansiones o aperturas de plantas industriales." },
      { name: "Programas de Semilleros", colorClass: "from-orange-500 to-pink-500 shadow-orange-500/20", icon: "school", description: "Captación de Jóvenes Profesionales y Pasantías para detectar el talento futuro." }
    ],
    benefits: [
      "Reducción de la tasa de rotación temprana.",
      "Candidatos alineados con la visión de la empresa.",
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
      "Diseño Instruccional a Medida para Capacitaciones.",
      "Medición del ROI de Capacitación y Mentoring."
    ],
    businessUnits: [
      { name: "Liderazgo & Gestión", colorClass: "from-magenta to-[#7b2cbf] shadow-magenta/20", icon: "supervisor_account", description: "Entrenamiento para nuevos líderes en feedback, comunicación asertiva y gestión de equipos de alto rendimiento." },
      { name: "Performance Management", colorClass: "from-cyan-600 to-blue-600 shadow-cyan-500/20", icon: "speed", description: "Diseño de procesos de Evaluación de Desempeño (OKRs, 9-Box Grid) con feedback continuo." },
      { name: "Diversidad e Inclusión (D&I)", colorClass: "from-indigo-500 to-purple-600 shadow-indigo-500/20", icon: "diversity_3", description: "Estrategias de inclusión para construir entornos de trabajo equitativos y seguros." },
      { name: "Employee Experience (EX)", colorClass: "from-rose-500 to-orange-500 shadow-rose-500/20", icon: "favorite", description: "Diseño del 'Employee Journey' para mejorar el sentido de pertenencia y compromiso." },
      { name: "Coaching Ejecutivo", colorClass: "from-amber-500 to-orange-600 shadow-amber-500/20", icon: "self_improvement", description: "Sesiones personalizadas 1:1 para directivos enfocadas en habilidades blandas y toma de decisiones." },
      { name: "Compensaciones & Beneficios", colorClass: "from-emerald-500 to-green-700 shadow-emerald-500/20", icon: "payments", description: "Diseño de bandas salariales equitativas y paquetes de beneficios flexibles." }
    ],
    benefits: [
      "Incremento en el compromiso (Engagement) del personal.",
      "Retención efectiva de altos potenciales (HiPo).",
      "Fortalecimiento de Marca Empleadora (Employer Branding)."
    ]
  },
  {
    id: 'consultoria',
    title: "Consultoría Estratégica",
    icon: "hub",
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070",
    fullDesc: "Alineamos su arquitectura de RRHH con los objetivos de negocio, transformando la estructura para que sea ágil, eficiente y humana.",
    methodology: [
      "Reingeniería de Procesos de RRHH (BPR).",
      "Análisis de Estructuras Organizativas y Rediseño.",
      "Planificación Estratégica de Workforce (Plantilla)."
    ],
    businessUnits: [
      { name: "Clima & Cultura", colorClass: "from-lime-600 to-green-600 shadow-lime-500/20", icon: "sentiment_very_satisfied", description: "Diagnóstico profundo de salud organizacional, bienestar y clima de trabajo." },
      { name: "Outplacement", colorClass: "from-slate-700 to-slate-900 shadow-slate-500/20", icon: "next_plan", description: "Programas de transición de carrera humana y responsable para desvinculaciones." },
      { name: "Gestión del Cambio", colorClass: "from-indigo-600 to-purple-600 shadow-indigo-500/20", icon: "published_with_changes", description: "Acompañamiento ante fusiones, adquisiciones o implementaciones de software de gestión." },
      { name: "People Analytics", colorClass: "from-blue-700 to-indigo-800 shadow-blue-500/20", icon: "query_stats", description: "Implementación de tableros de KPIs estratégicos (Rotación, Absentismo, Headcount)." },
      { name: "Startups & Scale-ups", colorClass: "from-magenta to-[#7b2cbf] shadow-magenta/20", icon: "rocket_launch", description: "Estructuración y creación de áreas de RRHH desde cero para empresas de rápido crecimiento." },
      { name: "Manuales & Puestos", colorClass: "from-teal-600 to-emerald-600 shadow-teal-500/20", icon: "menu_book", description: "Definición clara de roles y responsabilidades para optimizar la operación diaria." }
    ],
    benefits: [
      "Estructuras organizacionales más ágiles.",
      "Mejora del clima basada en datos cualitativos y cuantitativos.",
      "Optimización inteligente de costos operativos."
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
    className={`group cursor-pointer relative h-full rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-magenta/20 transition-all duration-500 hover:-translate-y-2 ${featured ? 'md:scale-105 z-10' : ''}`}
  >
    <img alt={service.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={service.img} />
    <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-900/80 to-magenta/70 opacity-95 group-hover:opacity-90 transition-opacity"></div>
    
    <div className="relative z-10 p-10 flex flex-col h-full text-white">
      <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-6 border border-white/20 shadow-lg shadow-magenta/20">
        <span className="material-symbols-outlined text-3xl">{service.icon}</span>
      </div>
      <h3 className="text-2xl font-bold mb-4 tracking-tight">{service.title}</h3>
      <p className="text-white/80 mb-8 leading-relaxed line-clamp-3 font-medium">{service.fullDesc}</p>
      <div className="mt-auto inline-flex items-center gap-2 font-bold text-white group-hover:gap-4 transition-all">
        Ver Detalle <span className="material-symbols-outlined">arrow_forward</span>
      </div>
    </div>
  </div>
);

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [activeUnit, setActiveUnit] = useState<BusinessUnit | null>(null);

  useEffect(() => {
    document.body.style.overflow = selectedService ? 'hidden' : 'auto';
    
    // Al abrir una solución, por defecto seleccionamos su primera unidad de negocio si existe
    if (selectedService && selectedService.businessUnits && selectedService.businessUnits.length > 0) {
      setActiveUnit(selectedService.businessUnits[0]);
    } else {
      setActiveUnit(null);
    }
  }, [selectedService]);

  return (
    <section id="servicios" className="py-24 bg-white dark:bg-[#020617] scroll-mt-20 transition-colors duration-300">
      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="w-20 h-1.5 bg-gradient-to-r from-magenta to-[#7b2cbf] mb-6 rounded-full mx-auto"></div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white tracking-tight">Soluciones de Capital Humano</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">Click en cada área para profundizar en nuestra propuesta.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 items-stretch">
          {servicesData.map((service, index) => (
            <ServiceCard key={service.id} service={service} onOpen={setSelectedService} featured={index === 1} />
          ))}
        </div>
      </div>

      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" onClick={() => setSelectedService(null)}></div>
          
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-6xl h-[92vh] max-h-[92vh] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/10 animate-scale-up">
            
            {/* Lateral Visual */}
            <div className="w-full md:w-2/5 relative h-64 md:h-auto shrink-0">
              <img src={selectedService.img} alt={selectedService.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950/90 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <div className="w-12 h-12 bg-magenta/20 backdrop-blur rounded-xl flex items-center justify-center mb-4 border border-white/20 shadow-xl shadow-magenta/30">
                  <span className="material-symbols-outlined text-white">{selectedService.icon}</span>
                </div>
                <h4 className="text-3xl font-bold">{selectedService.title}</h4>
              </div>
            </div>

            {/* Contenido Scrollable */}
            <div className="w-full md:w-3/5 p-10 md:p-14 overflow-y-auto bg-white dark:bg-slate-900 custom-scrollbar flex flex-col justify-between">
              <button onClick={() => setSelectedService(null)} className="absolute top-8 right-8 text-slate-400 hover:text-magenta transition-transform hover:scale-110">
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>

              <div className="space-y-10">
                <div>
                  <h5 className="text-xs font-black uppercase tracking-widest text-magenta mb-4">Visión Apax</h5>
                  <p className="text-xl text-slate-700 dark:text-slate-200 leading-relaxed font-medium">{selectedService.fullDesc}</p>
                </div>

                {/* Unidades de negocio en formato interactivo */}
                {selectedService.businessUnits && (
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Unidades Especializadas</h5>
                    <div className="flex flex-wrap gap-3 mb-8">
                      {selectedService.businessUnits.map((unit, i) => {
                        const isActive = activeUnit?.name === unit.name;
                        return (
                          <button 
                            key={i} 
                            onClick={() => setActiveUnit(unit)} 
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold transition-all shadow-md ${isActive ? `bg-gradient-to-r ${unit.colorClass} text-white ring-2 ring-magenta/40 scale-105` : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                          >
                            <span className="material-symbols-outlined text-sm">{unit.icon}</span>
                            {unit.name}
                          </button>
                        );
                      })}
                    </div>

                    {activeUnit && (
                      <div className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 animate-fade-in">
                        <div className="flex items-center gap-4 mb-4">
                           <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white bg-gradient-to-r ${activeUnit.colorClass}`}>
                             <span className="material-symbols-outlined text-xl">{activeUnit.icon}</span>
                           </div>
                           <h6 className="font-bold text-lg text-slate-900 dark:white">{activeUnit.name}</h6>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{activeUnit.description}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Doble Columna para Metodologías y Beneficios (recuperado de tu primer código) */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-widest text-magenta mb-4">Metodología</h5>
                    <ul className="space-y-3">
                      {selectedService.methodology.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
                          <span className="material-symbols-outlined text-magenta text-sm mt-0.5">check_circle</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-widest text-magenta mb-4">Impacto Real</h5>
                    <ul className="space-y-3">
                      {selectedService.benefits.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
                          <span className="material-symbols-outlined text-magenta text-sm mt-0.5">trending_up</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Botonera de Acción Footer (Fija abajo) */}
              <div className="pt-8 mt-12 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => { 
                    setSelectedService(null); 
                    document.getElementById('contacto')?.scrollIntoView({behavior:'smooth'}); 
                  }} 
                  className="flex-1 bg-gradient-to-r from-magenta to-[#7b2cbf] text-white py-5 rounded-2xl font-bold shadow-xl shadow-magenta/20 transition-all hover:scale-[1.02] active:scale-95"
                >
                  Consultar por esta solución
                </button>
                <button 
                  onClick={() => setSelectedService(null)} 
                  className="px-10 py-5 rounded-2xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
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
