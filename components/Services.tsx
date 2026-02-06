import React, { useState, useEffect } from 'react';

// ... (Interfaces y servicesData se mantienen igual para no saturar el archivo)

const ServiceCard: React.FC<{
  service: any;
  onOpen: (service: any) => void;
  featured?: boolean;
}> = ({ service, onOpen, featured }) => (
  <div 
    onClick={() => onOpen(service)}
    className={`group cursor-pointer relative h-[450px] rounded-[2.5rem] overflow-hidden bg-slate-900 shadow-2xl transition-all duration-500 hover:-translate-y-3 ${featured ? 'md:scale-105 z-10 border-2 border-purple-500/20' : 'border border-transparent'}`}
  >
    <img 
      alt={service.title} 
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-50 [-webkit-mask-image:linear-gradient(to_bottom,black_10%,transparent_90%)] [mask-image:linear-gradient(to_bottom,black_10%,transparent_90%)]" 
      src={service.img}
    />
    
    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>

    <div className="relative z-10 p-10 flex flex-col h-full text-white">
      {/* Icono con contenedor estable */}
      <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/20 shadow-lg">
        <span className="material-symbols-outlined text-4xl text-white">{service.icon}</span>
      </div>
      <h3 className="text-3xl font-black mb-4 tracking-tighter leading-none text-white">{service.title}</h3>
      <p className="text-white/80 mb-8 leading-relaxed line-clamp-3 font-medium">{service.fullDesc}</p>
      <div className="mt-auto inline-flex items-center gap-2 font-bold text-white group-hover:gap-4 transition-all uppercase text-xs tracking-widest">
        Saber Más <span className="material-symbols-outlined text-white">arrow_forward</span>
      </div>
    </div>
  </div>
);

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<any | null>(null);

  useEffect(() => {
    document.body.style.overflow = selectedService ? 'hidden' : 'auto';
  }, [selectedService]);

  return (
    <section id="servicios" className="py-32 bg-white dark:bg-slate-950 transition-colors duration-500 scroll-mt-20">
      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4 lg:px-14">
        {/* Cabecera Adaptativa */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-700 to-purple-600 mb-8 rounded-full mx-auto"></div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 dark:text-white tracking-tighter">Nuestras Soluciones</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 font-medium font-sans">
            Estrategia y talento en perfecta sintonía.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 items-stretch">
          {servicesData.map((service, index) => (
            <ServiceCard key={service.id} service={service} onOpen={setSelectedService} featured={index === 1} />
          ))}
        </div>
      </div>

      {/* MODAL CON SOPORTE DARK MODE TOTAL */}
      {selectedService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setSelectedService(null)}></div>
          
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-5xl max-h-[90vh] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-slate-200 dark:border-slate-800">
            {/* Lateral del Modal */}
            <div className="w-full md:w-2/5 relative h-64 md:h-auto bg-slate-800">
              <img src={selectedService.img} alt={selectedService.title} className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <span className="material-symbols-outlined text-5xl mb-4 text-purple-400">{selectedService.icon}</span>
                <h4 className="text-3xl font-black tracking-tighter text-white">{selectedService.title}</h4>
              </div>
            </div>

            {/* Contenido del Modal */}
            <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto bg-white dark:bg-slate-900">
               <button onClick={() => setSelectedService(null)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>
              
              <div className="space-y-8">
                <p className="text-xl text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                  {selectedService.fullDesc}
                </p>
                
                <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                   <h5 className="text-xs font-black uppercase tracking-widest text-blue-700 dark:text-purple-400 mb-6">Metodología de Trabajo</h5>
                   <div className="grid grid-cols-1 gap-4">
                     {selectedService.methodology.map((m: string, i: number) => (
                       <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800">
                         <span className="material-symbols-outlined text-blue-600 dark:text-purple-400">check_circle</span>
                         <span className="font-bold">{m}</span>
                       </div>
                     ))}
                   </div>
                </div>

                <button 
                  onClick={() => setSelectedService(null)} 
                  className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-lg shadow-xl hover:scale-[1.02] transition-all uppercase tracking-tighter"
                >
                  Entendido
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
