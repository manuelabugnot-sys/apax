import React from 'react';
import { useCountryWhatsApp } from '../hooks/useCountryWhatsApp';

interface EmployabilityProgramProps {
  onContactClick?: () => void;
}

const EmployabilityProgram: React.FC<EmployabilityProgramProps> = ({ onContactClick }) => {
  const { getUrl } = useCountryWhatsApp();

  const handleCTAClick = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      const customMessage = '¡Hola Apax Management! Me gustaría coordinar para arrancar el Programa Estratégico de Empleabilidad (Perfil & Entrevistas).';
      window.open(getUrl(customMessage), '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section 
      id="empleabilidad" 
      className="relative py-24 md:py-32 bg-gradient-to-r from-[#0a008a] to-[#9d4edd] text-white overflow-hidden scroll-mt-20 selection:bg-white selection:text-[#0a008a]"
    >
      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 1. Header Centrado */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-20">
          {/* Título Principal */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.75rem] font-display font-bold text-white tracking-tight leading-[1.2] mb-5 drop-shadow-sm">
            Programa Estratégico de Empleabilidad
          </h2>

          {/* Subtítulo */}
          <p className="text-base sm:text-lg md:text-xl text-white/80 font-sans leading-relaxed max-w-2xl font-normal">
            Impulsá tu perfil y destacate en el mercado laboral con nuestro acompañamiento experto.
          </p>
        </div>

        {/* 2. Bloque Principal: 2 Tarjetas Traslúcidas Parejamente Alineadas (Glassmorphism) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto items-stretch mb-14 md:mb-16">
          
          {/* Tarjeta Izquierda - Etapa 1 */}
          <div 
            id="card-etapa-1"
            className="flex flex-col justify-between bg-white/[0.09] hover:bg-white/[0.13] backdrop-blur-md border border-white/20 hover:border-white/30 rounded-2xl p-8 sm:p-10 transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.18)] hover:-translate-y-1 group"
          >
            <div>
              {/* Badge Pill */}
              <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-white/15 border border-white/25 text-white mb-6 shadow-sm">
                ETAPA 1: PUESTA A PUNTO DEL PERFIL
              </div>

              {/* Subtítulo de Tarjeta */}
              <h3 className="text-lg sm:text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-violet-300 text-2xl font-light">
                  schedule
                </span>
                3 encuentros personalizados de 1 hora
              </h3>

              {/* Lista de Puntos con viñetas en tono violeta claro */}
              <ul className="space-y-4 text-white/90 text-sm sm:text-base font-normal leading-relaxed">
                <li className="flex items-start gap-3.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-violet-300 shadow-[0_0_8px_rgba(216,180,254,0.8)] mt-2 shrink-0"></span>
                  <div>
                    <strong className="font-semibold text-white">Sesión 1:</strong> Análisis de situación actual, perfil y definición de enfoque estratégico.
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-violet-300 shadow-[0_0_8px_rgba(216,180,254,0.8)] mt-2 shrink-0"></span>
                  <div>
                    <strong className="font-semibold text-white">Sesión 2:</strong> Revisión y armado estratégico de CV de alto impacto.
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-violet-300 shadow-[0_0_8px_rgba(216,180,254,0.8)] mt-2 shrink-0"></span>
                  <div>
                    <strong className="font-semibold text-white">Sesión 3:</strong> Optimización máxima del perfil de LinkedIn para atracción de recrutadores.
                  </div>
                </li>
              </ul>
            </div>

            {/* Micro footer de tarjeta para estabilidad visual */}
            <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base text-violet-300">verified_user</span>
                Mentoría 1 a 1
              </span>
              <span className="tracking-wide uppercase font-semibold text-violet-200">100% Online</span>
            </div>
          </div>

          {/* Tarjeta Derecha - Etapa 2 */}
          <div 
            id="card-etapa-2"
            className="flex flex-col justify-between bg-white/[0.09] hover:bg-white/[0.13] backdrop-blur-md border border-white/20 hover:border-white/30 rounded-2xl p-8 sm:p-10 transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.18)] hover:-translate-y-1 group"
          >
            <div>
              {/* Badge Pill */}
              <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-white/15 border border-white/25 text-white mb-6 shadow-sm">
                ETAPA 2: PRÁCTICA DE ENTREVISTAS
              </div>

              {/* Subtítulo de Tarjeta */}
              <h3 className="text-lg sm:text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-violet-300 text-2xl font-light">
                  tune
                </span>
                Modalidad a demanda
              </h3>

              {/* Texto Descriptivo */}
              <p className="text-white/90 text-sm sm:text-base font-normal leading-relaxed">
                Preparación personalizada cuando ya tengas una entrevista real agendada. Simulamos el encuentro en base a los requisitos exactos de la posición y la empresa que te contactó.
              </p>

              {/* Puntos clave / Enfoque práctico */}
              <div className="mt-6 p-4 rounded-xl bg-white/[0.06] border border-white/10 text-xs sm:text-sm text-white/85 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-violet-200">
                  <span className="material-symbols-outlined text-base">psychology</span>
                  Simulación de Casos Reales
                </div>
                <p className="text-white/75 leading-normal">
                  Feedback constructivo e inmediato sobre respuestas clave, lenguaje corporal y alineación con la cultura corporativa.
                </p>
              </div>
            </div>

            {/* Micro footer de tarjeta para estabilidad visual */}
            <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-white/70">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base text-violet-300">target</span>
                Foco en Rol & Empresa
              </span>
              <span className="tracking-wide uppercase font-semibold text-violet-200">A tu ritmo</span>
            </div>
          </div>

        </div>

        {/* 3. Cierre y Llamado a la Acción (Centrado inferior) */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-6">
          
          {/* Texto de Cierre */}
          <p className="text-sm sm:text-base italic text-white/90 font-medium leading-relaxed">
            &ldquo;Avanzá con tu CV y LinkedIn hoy, y prepará tu entrevista cuando estés a un paso de la contratación.&rdquo;
          </p>

          {/* Botón CTA */}
          <button
            id="cta-coordinar-empleabilidad"
            onClick={handleCTAClick}
            className="bg-white hover:bg-slate-50 text-[#0a008a] font-bold text-base sm:text-lg px-9 py-4 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.35)] hover:scale-105 active:scale-95 transition-all duration-200 inline-flex items-center justify-center gap-3 cursor-pointer group"
          >
            <span>Coordiná para arrancar</span>
            <span className="material-symbols-outlined text-xl transition-transform duration-200 group-hover:translate-x-1">
              arrow_forward
            </span>
          </button>

          {/* Micro nota de contacto */}
          <div className="flex items-center gap-2 text-xs text-white/70 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Atención personalizada y cupos limitados por mes</span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default EmployabilityProgram;
