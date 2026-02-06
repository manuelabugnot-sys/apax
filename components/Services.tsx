import React, { useState, useEffect } from 'react';

const servicesData = [
  {
    id: 'reclutamiento',
    title: "Reclutamiento de Excelencia",
    icon: "person_search",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070",
    shortDesc: "Identificamos piezas fundamentales para su cultura organizacional.",
    fullDesc: "Nuestro proceso de Reclutamiento no es solo encontrar currículums; es identificar piezas fundamentales para el engranaje de su cultura. Utilizamos metodología STAR y validación 360° para garantizar el calce perfecto.",
    methodology: ["Culture Fit Analysis", "STAR Method", "Sourcing Pasivo"],
    benefits: ["Reducción de rotación", "Alineación cultural", "Ahorro de tiempo"]
  },
  {
    id: 'gestion',
    title: "Gestión del Talento",
    icon: "psychology",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070",
    shortDesc: "Potenciamos las capacidades actuales de su equipo de trabajo.",
    fullDesc: "Cuidamos su activo más valioso mediante programas de desarrollo que potencian las capacidades actuales y preparan a su equipo para los desafíos del futuro. Medimos el ROI de cada capacitación.",
    methodology: ["Skill Gap Analysis", "Medición ROI", "Feedback Continuo"],
    benefits: ["Engagement alto", "Retención de Talento", "Employer Branding"]
  },
  {
    id: 'consultoria',
    title: "Consultoría Estratégica",
    icon: "hub",
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070",
    shortDesc: "Alineamos su arquitectura de RRHH con los objetivos de negocio.",
    fullDesc: "Transformamos la estructura organizacional para hacerla más ágil y eficiente. Aplicamos People Analytics para tomar decisiones basadas en datos reales y optimizar costos operativos.",
    methodology: ["Reingeniería de Procesos", "People Analytics", "Change Management"],
    benefits: ["Estructuras ágiles", "Optimización de costos", "Mejora de clima"]
  }
];

const Services = () => {
  const [selectedService, setSelectedService] = useState<any>(null);

  useEffect(() => {
    document.body.style.overflow = selectedService ? 'hidden' : 'auto';
  }, [selectedService]);

  return (
    <section id="servicios" className="py-20 bg-white dark:bg-slate-950">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <div className="w-14 h-1 bg-[#1a008a] mb-6 rounded-full mx-auto"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a008a] dark:text-white tracking-tight mb-4">
            Soluciones Integrales de RRHH
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
            Click en cada solución para explorar en profundidad nuestra propuesta diferencial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {servicesData.map((s, index) => (
            <div 
              key={s.id}
              onClick={() => setSelectedService(s)}
              className={`group relative h-[320px] rounded-[2rem] overflow-hidden bg-[#1a008a] cursor-pointer shadow-lg hover:-translate-y-2 transition-all duration-500 ${index === 1 ? 'md:scale-105 z-10' : ''}`}
            >
              <img 
                src={s.img} 
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-110 [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_100%)] [mask-image:linear-gradient(to_right,transparent_0%,black_100%)]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a008a] via-[#1a008a]/30 to-transparent opacity-90"></div>

              <div className="relative z-10 p-8 flex flex-col h-full text-white">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center mb-4 border border-white/20">
                  <span className="material-symbols-outlined text-xl">{s.icon}</span>
                </div>
                <h3 className="text-2xl font-bold mb-3 leading-tight tracking-tight">{s.title}</h3>
                <p className="text-base text-white/90 leading-snug line-clamp-3 font-semibold mb-4">
                  {s.shortDesc}
                </p>
                <div className="mt-auto flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                  Saber Más <span className="material-symbols-outlined text-base">arrow_forward</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedService(null)}>
          <div className="bg-white dark:bg-slate-900 w-full max-w-3xl max-h-[90vh] rounded-[2.5rem] overflow-hidden shadow-2xl relative flex flex-col md:flex-row" onClick={e => e.stopPropagation()}>
            
            <div className="w-full md:w-1/3 bg-[#1a008a] relative h-40 md:h-auto">
              <img src={selectedService.img} className="w-full h-full object-cover opacity-40" alt="" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-6xl text-white opacity-50">{selectedService.icon}</span>
              </div>
            </div>

            <div className="w-full md:w-2/3 p-8 md:p-12 overflow-y-auto">
              <button onClick={() => setSelectedService(null)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors">
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>
              
              <h2 className="text-3xl font-bold text-[#1a008a] dark:text-white mb-6 leading-tight">
                {selectedService.title}
              </h2>
              
              <div className="space-y-6">
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {selectedService.fullDesc}
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#1a008a] mb-3">Metodología</h4>
                    <ul className="space-y-2">
                      {selectedService.methodology.map((m: any) => (
                        <li key={m} className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1a008a]"></span>{m}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#1a008a] mb-3">Beneficios</h4>
                    <ul className="space-y-2">
                      {selectedService.benefits.map((b: any) => (
                        <li key={b} className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                          <span className="material-symbols-outlined text-xs text-green-500">check_circle</span>{b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedService(null)}
                  className="w-full mt-6 py-4 bg-[#1a008a] text-white rounded-xl font-bold text-lg hover:bg-blue-900 transition-colors"
                >
                  Cerrar Detalle
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
