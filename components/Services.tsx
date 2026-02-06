import React, { useState, useEffect } from 'react';

// ... (Mantenemos la interfaz BusinessUnit y ServiceDetail igual)

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<any>(null);
  const [activeUnit, setActiveUnit] = useState<any>(null);

  useEffect(() => {
    document.body.style.overflow = selectedService ? 'hidden' : 'auto';
    if (!selectedService) setActiveUnit(null);
  }, [selectedService]);

  // Función para obtener el color exacto de la solución específica según la imagen
  const getUnitColor = (name: string) => {
    if (name.includes("IT")) return "from-cyan-400 to-cyan-600";
    if (name.includes("Mandos")) return "from-emerald-400 to-emerald-600";
    if (name.includes("Executive")) return "from-indigo-600 to-blue-700";
    if (name.includes("RPO")) return "from-slate-700 to-slate-900";
    if (name.includes("Semilleros")) return "from-rose-400 to-pink-500";
    return "from-[#1a008a] to-blue-800"; // Default
  };

  return (
    <section id="servicios" className="py-20 bg-white dark:bg-slate-950">
      {/* ... (Grid de servicios principal igual) */}

      {/* MODAL CON COLORES EN SOLUCIONES ESPECÍFICAS */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm" onClick={() => setSelectedService(null)}>
          <div className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] overflow-hidden shadow-2xl relative flex flex-col md:flex-row" onClick={e => e.stopPropagation()}>
            
            {/* Lateral con Imagen */}
            <div className="w-full md:w-1/3 bg-[#1a008a] relative h-48 md:h-auto shrink-0">
              <img src={selectedService.img} className="w-full h-full object-cover opacity-50" alt="" />
              <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-white">
                 <h4 className="text-3xl font-bold leading-tight">{selectedService.title}</h4>
              </div>
            </div>

            {/* Contenido */}
            <div className="w-full md:w-2/3 p-8 md:p-12 overflow-y-auto">
              <button onClick={() => setSelectedService(null)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900">
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>
              
              <div className="space-y-8">
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {selectedService.fullDesc}
                </p>

                {/* Grid Metodología e Impacto */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-widest text-[#1a008a] mb-4">Metodología (El Proceso)</h5>
                    <ul className="space-y-3">
                      {selectedService.methodology.map((m: any, i: number) => (
                        <li key={i} className="text-sm text-slate-600 flex items-start gap-3">
                          <span className="material-symbols-outlined text-[#1a008a] text-lg">settings_suggest</span> {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-xs font-black uppercase tracking-widest text-[#1a008a] mb-4">Impacto Real</h5>
                    <ul className="space-y-3">
                      {selectedService.benefits.map((b: any, i: number) => (
                        <li key={i} className="text-sm text-slate-600 flex items-start gap-3">
                          <span className="material-symbols-outlined text-[#1a008a] text-lg">trending_up</span> {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* SOLUCIONES ESPECÍFICAS CON COLOR */}
                {selectedService.businessUnits && (
                  <div className="pt-4">
                    <h5 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
                      Soluciones Específicas <span className="lowercase font-normal">(click para ver detalle)</span>
                    </h5>
                    <div className="flex flex-wrap gap-3 mb-6">
                      {selectedService.businessUnits.map((unit: any, i: number) => (
                        <button 
                          key={i} 
                          onClick={() => setActiveUnit(unit)}
                          className={`
                            flex items-center gap-2 px-4 py-2.5 rounded-xl text-white font-bold text-xs transition-all shadow-md hover:scale-105
                            bg-gradient-to-r ${getUnitColor(unit.name)}
                            ${activeUnit?.name === unit.name ? 'ring-4 ring-[#1a008a]/20 scale-105 shadow-lg' : 'opacity-90'}
                          `}
                        >
                          <span className="material-symbols-outlined text-sm">{unit.icon}</span>
                          {unit.name}
                        </button>
                      ))}
                    </div>

                    {/* Detalle dinámico de la unidad */}
                    {activeUnit && (
                      <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 animate-fade-in">
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
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
