
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
    title: "Reclutamiento de Excelencia",
    icon: "person_search",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=2070",
    fullDesc: "Nuestro proceso de Reclutamiento no es solo encontrar currículums; es identificar piezas fundamentales para el engranaje de su cultura. Utilizamos metodologías de 'Human-Centric Sourcing' para asegurar que el candidato no solo posea las habilidades técnicas, sino los valores compartidos con su organización.",
    methodology: [
      "Headhunting 4.0: Búsqueda proactiva en redes globales.",
      "Entrevistas por competencias y valores culturales.",
      "Evaluaciones psicotécnicas y de potencial de desarrollo.",
      "Onboarding estratégico para asegurar una integración exitosa.",
      "Seguimiento post ingreso para garantizar la adaptación cultural."
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
      "Mapeo de Talento para identificar líderes.",
      "Programas de Mentoring y Coaching Ejecutivo.",
      "Diseño de planes de sucesión y continuidad.",
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
    fullDesc: "Alineamos su arquitectura de RRHH con los objetivos de negocio. Transformamos la estructura organizacional para que sea ágil, eficiente y humana. No somos solo asesores; somos socios estratégicos que implementan cambios con impacto directo en el balance de la empresa.",
    methodology: [
      "Gestión del cambio ante transformaciones organizacionales.",
      "Análisis profundo de clima y cultura organizacional.",
      "Diseño de KPIs estratégicos de gestión humana."
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

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
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
                    <h5 className="text-xs font-black uppercase tracking-widest text-primary dark:text-accent mb-4">Metodología</h5>
                    <ul className="space-y-3">
                      {selectedService.methodology.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                          <span className="material-symbols-outlined text-primary dark:text-accent text-sm mt-0.5">check_circle</span>
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
