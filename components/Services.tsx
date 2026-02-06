// ... (mismo código de interfaces y data)

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
    {/* AHORA COINCIDE CON TU NAVBAR: de Primary a Magenta */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#1a008a]/95 via-[#1a008a]/85 to-[#701a75]/80 opacity-95 group-hover:opacity-90 transition-opacity"></div>
    
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
  // ... (mismos states y useEffect)

  return (
    <section id="servicios" className="py-24 bg-white dark:bg-[#0f172a] scroll-mt-20">
      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          {/* LÍNEA DE GRADIENTE: Coincide con Navbar (Primary a Accent) */}
          <div className="w-20 h-1 bg-gradient-to-r from-[#1a008a] to-[#d946ef] mb-6 rounded-full mx-auto"></div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#1a008a] dark:text-white">Soluciones Integrales de RRHH</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Click en cada solución para explorar en profundidad nuestra propuesta diferencial.
          </p>
        </div>
// ... (sigue igual)
