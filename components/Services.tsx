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
      { name: "IT & Digital Specialists", colorClass: "from-blue-600 to-cyan-500", icon: "terminal", description: "Unidad especializada en perfiles tecnológicos (Developers, Data Scientists, DevOps)." },
      { name: "Mandos Medios & Profesionales", colorClass: "from-emerald-600 to-teal-500", icon: "work", description: "Selección de analistas senior, coordinadores y especialistas en áreas corporativas." },
      { name: "Executive Search", colorClass: "from-[#1a008a] to-indigo-600", icon: "diamond", description: "Búsqueda confidencial y de 'guante blanco' para posiciones de Dirección." },
      { name: "RPO (Procesos Masivos)", colorClass: "from-slate-700 to-slate-900", icon: "factory", description: "Recruitment Process Outsourcing para expansiones o picos estacionales." },
      { name: "Programas de Semilleros", colorClass: "from-orange-500 to-pink-500", icon: "school", description: "Captación de Jóvenes Profesionales y Pasantías universitarias." }
    ],
    benefits: ["Reducción de rotación temprana.", "Candidatos alineados a largo plazo.", "Ahorro significativo en tiempos."]
  },
  {
    id: 'gestion',
    title: "Gestión del Talento",
    icon: "psychology",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070",
    fullDesc: "Cuidamos su activo más valioso mediante programas de desarrollo que potencian las capacidades actuales y preparan a su equipo para los desafíos del futuro.",
    methodology: ["Skill Gap Analysis.", "Diseño Instruccional a Medida.", "Medición del ROI.", "Seguimiento de Conductas."],
    businessUnits: [
      { name: "Liderazgo & Equipos", colorClass: "from-violet-600 to-fuchsia-600", icon: "supervisor_account", description: "Entrenamiento para nuevos líderes y mandos medios." },
      { name: "Performance Management", colorClass: "from-cyan-600 to-blue-600", icon: "speed", description: "Diseño de procesos de Evaluación de Desempeño (OKRs)." },
      { name: "Employee Experience", colorClass: "from-rose-500 to-orange-500", icon: "favorite", description: "Diseño del Journey y fidelización del colaborador." }
    ],
    benefits: ["Incremento en el engagement.", "Detección de HiPo.", "Fortalecimiento de Employer Branding."]
  },
  {
    id: 'consultoria',
    title: "Consultoría Estratégica",
    icon: "hub",
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070",
    fullDesc: "Alineamos su arquitectura de RRHH con los objetivos de negocio. Transformamos la estructura organizacional para que sea ágil, eficiente y humana.",
    methodology: ["Reingeniería de Procesos (BPR).", "Análisis de Estructuras.", "Workforce Planning."],
    businessUnits: [
      { name: "Clima & Cultura", colorClass: "from-lime-600 to-green-600", icon: "sentiment_very_satisfied", description: "Diagnóstico profundo de la salud organizacional." },
      { name: "People Analytics", colorClass: "from-blue-700 to-indigo-800", icon: "query_stats", description: "Transformamos datos en información estratégica (KPIs)." },
      { name: "Startups & Scale-ups", colorClass: "from-fuchsia-600 to-pink-700", icon: "rocket_launch", description: "Creación del área de RRHH desde cero." }
    ],
    benefits: ["Estructuras más ágiles.", "Mejora del clima laboral.", "Optimización de costos operativos."]
  }
];

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [activeUnit, setActiveUnit] = useState<BusinessUnit | null>(null);

  useEffect(() => {
    document.body.style.overflow = selectedService ? 'hidden' : 'auto';
    if (!selectedService) setActiveUnit(null);
  }, [selectedService]);

  return (
    <section id="servicios" className="py-20 bg-white dark:bg-slate-950 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Encabezado con el peso de fuente que elegiste */}
        <div className="text-center mb-16">
          <div className="w-14 h-1 bg-[#1a008a] mb-6 rounded-full mx-auto"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a008a] dark:text-white tracking-tight mb-4">
            Soluciones Integrales de RRHH
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
            Click en cada solución para explorar en profundidad nuestra propuesta diferencial.
          </p>
        </div>

        {/* Grid de Cuadrados Chicos (320px) */}
        <div className="grid md:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <div 
              key={service.id}
              onClick={() => setSelectedService(service)}
              className={`group relative h-[320px] rounded-[2rem] overflow-hidden bg-[#1a008a] cursor-pointer shadow-lg hover:-translate-y-2 transition-all duration-500 ${index === 1 ? 'md:scale-105 z-10' : ''}`}
            >
              <img 
                src={service.img} 
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-110 [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_100%)] [mask-image:linear-gradient(to_right,transparent_0%,black_100%)]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a008a] via-[#1a008a]/30 to-transparent opacity-90"></div>

              <div className="relative z-10 p-8 flex flex-col h-full text-white">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center mb-4 border border-white/20">
                  <span className="material-symbols-outlined text-xl">{service.icon}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 leading-tight tracking-tight">{service.title}</h3>
                <p className="text-base text-white/90 leading-snug line-clamp-3 font-semibold">
                  {service.fullDesc}
                </p>
                <div className="mt-auto flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                  Saber Más <span className="material-symbols-outlined text-base">arrow_forward</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Detallado con Unidades de Negocio */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm" onClick={() => setSelectedService(null)}>
          <div className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] overflow-hidden shadow-2xl relative flex flex-col md:flex-row" onClick={e => e.stopPropagation()}>
            
            <div className="w-full md:w-1/3 bg-[#1a008a] relative h-40 md:h-auto shrink-0">
              <img src={selectedService.img} className="w-full h-full object-cover opacity-40" alt="" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                <span className="material-symbols-outlined text-6xl mb-4 opacity-50">{selectedService.icon}</span>
                <h4 className="text-2xl font-bold">{selectedService.title}</h4>
              </div>
            </div>

            <div className="w-full md:w-2/3 p-8 md:p-12 overflow-y-auto">
              <button onClick={() => setSelectedService(null)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors">
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>
              
              <div className="space-y-8">
                <div>
                  <h5 className="text-xs font-black uppercase tracking-widest text-[#1a008a] mb-3">Visión Apax</h5>
                  <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {selectedService.fullDesc}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-widest text-[#1a008a] mb-4">Metodología</h5>
                    <ul className="space-y-2">
                      {selectedService.methodology.map((m, i) => (
                        <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1a008a]"></span>{m}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-widest text-[#1a008a] mb-4">Beneficios</h5>
                    <ul className="space-y-2">
                      {selectedService.benefits.map((b, i) => (
                        <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                          <span className="material-symbols-outlined text-xs text-green-500">check_circle</span>{b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {selectedService.businessUnits && (
                  <div className="pt-4">
                    <h5 className="text-xs font-black uppercase tracking-widest text-[#1a008a] mb-4">Unidades Especializadas</h5>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedService.businessUnits.map((unit, i) => (
                        <button 
                          key={i} 
                          onClick={() => setActiveUnit(unit)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeUnit?.name === unit.name ? 'bg-[#1a008a] text-white scale-105 shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                        >
                          {unit.name}
                        </button>
                      ))}
                    </div>
                    {activeUnit && (
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 animate-fade-in">
                        <p className="text-sm text-slate-600 leading-relaxed"><strong className="text-[#1a008a]">{activeUnit.name}:</strong> {activeUnit.description}</p>
                      </div>
                    )}
                  </div>
                )}

                <button onClick={() => setSelectedService(null)} className="w-full py-4 bg-[#1a008a] text-white rounded-xl font-bold">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;
