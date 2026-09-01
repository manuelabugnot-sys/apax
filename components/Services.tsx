
import React, { useState, useEffect } from 'react';

interface ServiceDetail {
  id: string;
  title: string;
  fullDesc: string;
  methodology: string[];
  benefits: string[];
  icon: string;
  img: string;
}

const servicesData: ServiceDetail[] = [
  {
    id: 'reclutamiento',
    title: "Reclutamiento y Selección",
    icon: "person_search",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=2070",
    fullDesc: "Identificamos las piezas fundamentales para su cultura organizacional. Utilizamos metodologías de Headhunting 4.0 y Human-Centric Sourcing para asegurar compatibilidad técnica y valórica de excelencia.",
    methodology: [
      "Headhunting 4.0: Búsqueda proactiva en redes globales y mapeo de mercado.",
      "Entrevistas por competencias y evaluación de fit cultural.",
      "Evaluaciones psicotécnicas y de potencial de desarrollo.",
      "Onboarding estratégico para asegurar una integración exitosa.",
      "Garantía de adaptación y seguimiento continuo post-ingreso."
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
    fullDesc: "Cuidamos su activo más valioso mediante programas de desarrollo que potencian las capacidades actuales y preparan a su equipo para los desafíos del futuro mediante mapeo y planes de carrera motivadores.",
    methodology: [
      "Mapeo de Talento para identificar líderes y competencias críticas.",
      "Programas de Mentoring y Coaching Ejecutivo personalizado.",
      "Diseño de planes de sucesión y continuidad de negocio.",
      "Arquitectura de compensaciones y beneficios emocionales."
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
    fullDesc: "Alineamos su arquitectura de RRHH con los objetivos de negocio. Transformamos la estructura organizacional para que sea ágil, eficiente y humana, impactando directamente en los resultados de la empresa.",
    methodology: [
      "Gestión del cambio ante transformaciones y crecimiento organizacional.",
      "Análisis profundo de clima, cultura y diagnóstico de procesos.",
      "Diseño de KPIs estratégicos de gestión humana y tableros de control."
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
    id={service.id}
    onClick={() => onOpen(service)}
    className={`group cursor-pointer relative h-full rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 scroll-mt-28 border border-slate-200/60 dark:border-white/10 ${featured ? 'md:scale-105 z-10' : ''}`}
  >
    {/* Imagen de fondo del servicio */}
    <img 
      alt={`${service.title} Background`} 
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
      src={service.img}
    />
    
    {/* Capa de tinte violeta transparente traslúcida institucional (#9d4edd y #0a008a) */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#0a008a]/80 via-[#9d4edd]/65 to-[#18007a]/85 dark:from-[#020617]/85 dark:via-[#9d4edd]/60 dark:to-[#0a008a]/85 mix-blend-multiply transition-all duration-500"></div>
    
    {/* Capa adicional para asegurar contraste y legibilidad con destello violeta */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-[#9d4edd]/20 to-transparent group-hover:from-black/90 group-hover:via-[#9d4edd]/35 transition-all duration-500"></div>

    <div className="relative z-10 p-8 sm:p-10 flex flex-col h-full text-white">
      <div className="w-14 h-14 bg-white/20 dark:bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-6 border border-white/25 shadow-lg group-hover:bg-[#9d4edd]/40 group-hover:border-white/40 transition-all duration-300">
        <span className="material-symbols-outlined text-3xl">{service.icon}</span>
      </div>
      <h3 className="text-2xl font-bold mb-4 drop-shadow-sm text-white">{service.title}</h3>
      <p className="text-white/95 dark:text-white/90 mb-8 leading-relaxed line-clamp-3 text-sm sm:text-base drop-shadow">
        {service.fullDesc}
      </p>
      <div className="mt-auto inline-flex items-center gap-2 font-bold text-white group-hover:gap-4 transition-all drop-shadow">
        <span>Saber Más</span>
        <span className="material-symbols-outlined text-lg">arrow_forward</span>
      </div>
    </div>
  </div>
);

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedService]);

  return (
    <section id="servicios" className="py-24 bg-slate-50 dark:bg-[#020617] scroll-mt-20 transition-colors duration-300 border-t border-slate-200/50 dark:border-white/5">
      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="w-20 h-1 bg-gradient-to-r from-primary via-accent to-magenta mb-6 rounded-full mx-auto"></div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-primary dark:text-white">Soluciones Integrales de RRHH</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
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

      {/* Ventana Detallada (Modal al hacer clic) con foto con tinte violeta transparente y soporte Dark Mode */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fade-in">
          <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" 
            onClick={() => setSelectedService(null)}
          ></div>
          
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-scale-up border border-slate-200 dark:border-white/10">
            {/* Lateral Visual con imagen y tinte violeta transparente */}
            <div className="w-full md:w-2/5 relative h-56 md:h-auto overflow-hidden">
              <img src={selectedService.img} alt={selectedService.title} className="w-full h-full object-cover" />
              {/* Tinte violeta transparente sobre la foto modal */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0a008a]/85 via-[#9d4edd]/70 to-[#18007a]/80 dark:from-[#020617]/90 dark:via-[#9d4edd]/65 dark:to-[#0a008a]/85 mix-blend-multiply"></div>
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 via-[#9d4edd]/25 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white z-10">
                <div className="w-12 h-12 bg-white/20 dark:bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mb-3 border border-white/30 shadow-lg">
                  <span className="material-symbols-outlined text-2xl">{selectedService.icon}</span>
                </div>
                <h4 className="text-2xl font-bold text-white drop-shadow-md">{selectedService.title}</h4>
              </div>
            </div>

            {/* Contenido Modal */}
            <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto custom-scrollbar bg-white dark:bg-slate-900">
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-300 hover:text-primary dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <div className="space-y-8">
                <div>
                  <h5 className="text-xs font-black uppercase tracking-widest text-primary dark:text-[#c77dff] mb-4">Visión Apax</h5>
                  <p className="text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
                    {selectedService.fullDesc}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-widest text-primary dark:text-[#c77dff] mb-4">Metodología</h5>
                    <ul className="space-y-3">
                      {selectedService.methodology.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                          <span className="material-symbols-outlined text-primary dark:text-[#c77dff] text-sm mt-0.5 shrink-0">check_circle</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-widest text-primary dark:text-[#c77dff] mb-4">Impacto Real</h5>
                    <ul className="space-y-3">
                      {selectedService.benefits.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                          <span className="material-symbols-outlined text-primary dark:text-[#c77dff] text-sm mt-0.5 shrink-0">trending_up</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => {
                      setSelectedService(null);
                      const contact = document.getElementById('contacto');
                      contact?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn-gradient text-white px-8 py-4 rounded-xl font-bold flex-1 shadow-lg hover:shadow-xl transition-all"
                  >
                    Agendar Consultoría
                  </button>
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-8 py-4 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200/50 dark:border-slate-700"
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
