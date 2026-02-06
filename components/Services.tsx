import React, { useState, useEffect } from 'react';

// Restauramos la estructura de datos completa
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
        
        {/* Título Bold (el que te gustó) */}
        <div className="text-center mb-16">
          <div className="w-14 h-1 bg-[#1a008a] mb-6 rounded-full mx-auto"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a008a] dark:text-white tracking-tight mb-4">
            Soluciones Integrales de RRHH
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
            Click en cada solución para explorar en profundidad nuestra propuesta diferencial.
          </p>
        </div>

        {/* Grid de Cuadrados */}
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

      {/* MODAL RECUPERADO CON TODA LA INFO */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setSelectedService(null)}>
          <div className="bg-white dark:bg-slate-900 w-full max-w-3xl max-h-[90vh] rounded-[2.5rem] overflow-hidden shadow-2xl relative flex flex-col md:flex-row" onClick={e => e.stopPropagation()}>
            
            {/* Lateral Visual del Modal */}
            <div className="w-full md:w-1/3 bg-[#1a008a] relative h-40 md:h-auto">
              <img src={selectedService.img} className="w-full h-full object-cover opacity-40" alt="" />
