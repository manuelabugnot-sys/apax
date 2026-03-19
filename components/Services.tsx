import React, { useState, useEffect } from 'react';

// 1. Definición de la Interfaz de Datos
interface TeamMemberData {
  id: string;
  name: string;
  role: string;
  shortDesc: string;
  fullBio: string;
  philosophy: string; 
  img: string;
  icon: string;
  linkedin: string;
  themeColor: 'navy' | 'magenta';
  specialties: string[];
}

// 2. Datos del Equipo
const teamData: TeamMemberData[] = [
  {
    id: 'manuela',
    name: "Manuela Bugnot",
    role: "CO-FOUNDER",
    shortDesc: "Licenciada en Relaciones del Trabajo especialista en reclutamiento global, diversidad y cambio organizacional.",
    fullBio: "Licenciada en Relaciones del Trabajo con una sólida trayectoria en empresas multinacionales y organismos públicos. Su experiencia abarca desde la gestión de procesos de cambio cultural hasta la implementación de estrategias de Diversidad e Inclusión. Posee una visión holística del desarrollo organizacional, entendiendo las dinámicas interpersonales como el motor principal de la productividad.",
    philosophy: "La cultura organizacional es el ADN de una empresa. No se trata solo de gestionar personas, sino de diseñar ecosistemas donde el talento se sienta seguro para innovar. Transformamos organizaciones desbloqueando el potencial latente en sus equipos, alineando el propósito individual con la misión corporativa.",
    img: "manuela.png", 
    icon: "verified_user",
    linkedin: "https://www.linkedin.com/in/maria-manuela-bugnot",
    themeColor: "magenta",
    specialties: ["Gestión del Cambio", "Reclutamiento IT & Global", "Diversidad e Inclusión", "Clima Laboral"]
  },
  {
    id: 'giuliana',
    name: "Giuliana Gonzalez",
    role: "CO-FOUNDER",
    shortDesc: "Licenciada en RRHH especialista en selección, capacitación y optimización de la fuerza laboral con visión regional.",
    fullBio: "Licenciada en Administración de Recursos Humanos (USAL) con más de 8 años de experiencia liderando áreas de talento en industrias competitivas como consumo masivo, farmacéutica y manufactura. Su enfoque pragmático y orientado a resultados le permite optimizar procesos de selección y capacitación, garantizando que cada incorporación tenga un impacto medible en el negocio.",
    philosophy: "La eficiencia operativa nace de la confianza del equipo. Para mejorar una organización, debemos trascender lo transaccional y enfocarnos en la gestión estratégica de competencias. Mi objetivo es construir estructuras ágiles donde cada colaborador entienda el impacto real de su rol en la competitividad y el éxito global de la compañía.",
    img: "giuli.png", 
    icon: "psychology_alt",
    linkedin: "https://www.linkedin.com/in/giulianagonzalez-/",
    themeColor: "navy",
    specialties: ["Desarrollo de Talento", "Compensaciones y Beneficios", "Estrategia Regional", "Optimización de Procesos"]
  }
];

// 3. Componente de Tarjeta de Miembro (Efectos Visuales Corregidos)
const TeamMemberCard: React.FC<{
  member: TeamMemberData;
  onOpen: (member: TeamMemberData) => void;
}> = ({ member, onOpen }) => {
  const isMagenta = member.themeColor === 'magenta';
  
  // Definición del degradado del redondel para Manuela y Giuliana (Estilo Espejo)
  const ringGradient = isMagenta
    ? 'from-magenta via-primary/80 to-magenta'
    : 'from-primary via-magenta/80 to-primary';

  return (
    <div 
      onClick={() => onOpen(member)}
      /* CAMBIO 1: Sombra Violeta en la tarjeta (hover:shadow-magenta/30) */
      className="relative group p-9 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-magenta/30 cursor-pointer h-full overflow-hidden"
    >
      {/* Resplandor de fondo (Glow) Magenta al hacer hover */}
      <div className={`absolute inset-0 bg-gradient-to-br from-magenta/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2.5rem]`}></div>
      
      <div className="relative z-10 flex flex-col h-full text-center">
        <div className="relative flex justify-center mb-10">
          
          {/* CAMBIO 2: EL REDONDEL CON SOMBRA VIOLETA ( shadow-magenta/40 ) */}
          {/* Se unificó el diseño para que el redondel degradado y el resplandor violeta apliquen a ambas */}
          <div className={`w-52 h-52 p-1.5 bg-gradient-to-br ${ringGradient} rounded-full overflow-hidden shadow-xl shadow-magenta/40 transition-all duration-500 group-hover:scale-105 group-hover:shadow-magenta/60`}>
            
            <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-slate-800 relative">
              <img 
                alt={member.name} 
                className={`w-full h-full object-cover object-top transition-all duration-500 ${member.id === 'manuela' ? 'scale-[1.15]' : 'scale-100'}`} 
                src={member.img} 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=${isMagenta ? '9d4edd' : '0a008a'}&color=fff&size=512&bold=true`;
                }}
              />
              
              {/* Overlay sutil Magenta al hacer hover sobre la foto */}
              <div className={`absolute inset-0 bg-magenta/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full`}></div>
            </div>
          </div>
          
          {/* Ícono flotante (Badge) */}
          <div className="absolute -bottom-3 right-1/4 flex gap-2">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white dark:border-slate-900 z-20 btn-gradient group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined text-lg">{member.icon}</span>
              </div>
          </div>
        </div>
        
        {/* Textos de la tarjeta */}
        <div className="space-y-4 flex-grow mx-auto max-w-sm">
          <div>
            <h3 className="text-3xl font-bold text-primary dark:text-white group-hover:text-magenta transition-colors tracking-tight">{member.name}</h3>
            <p className={`${isMagenta ? 'text-magenta' : 'text-primary'} font-extrabold uppercase tracking-wider text-xs mt-1.5`}>{member.role}</p>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
            {member.shortDesc}
          </p>
        </div>
        
        <div className="pt-8 mt-auto">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-transparent group-hover:border-slate-300 dark:group-hover:border-slate-700 transition-all">Leer Filosofía de Gestión</span>
        </div>
      </div>
    </div>
  );
};

// 4. Componente Principal de la Sección Equipo
const Team: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMemberData | null>(null);

  useEffect(() => {
    document.body.style.overflow = selectedMember ? 'hidden' : 'auto';
  }, [selectedMember]);

  return (
    <section id="equipo" className="py-24 bg-white dark:bg-[#020617] transition-colors duration-500 scroll-mt-20">
      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-24">
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-magenta to-accent mb-6 rounded-full"></div>
          <h2 className="text-5xl md:text-6xl font-display font-extrabold mb-8 text-primary dark:text-white tracking-tighter">Nuestro equipo</h2>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed font-manrope font-medium">
            Liderazgo estratégico y visión experta. Haga clic en cada perfil para descubrir nuestra filosofía de gestión.
          </p>
        </div>
        
        {/* Grilla de Tarjetas */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 max-w-7xl mx-auto">
          {teamData.map((member) => (
            <TeamMemberCard 
              key={member.id} 
              member={member} 
              onOpen={setSelectedMember} 
            />
          ))}
        </div>

        {/* Botón Call to Action inferior */}
        <div className="mt-24 text-center">
          <button 
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-gradient text-white px-12 py-5 rounded-full text-lg font-bold shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3"
          >
            Hable con un Especialista de Apax
            <span className="material-symbols-outlined text-xl">chat</span>
          </button>
        </div>
      </div>

      {/* --- MODAL DETALLADO --- */}
      {selectedMember && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fade-in">
          <div 
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" 
            onClick={() => setSelectedMember(null)}
          ></div>
          
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-6xl max-h-[92vh] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-scale-up border border-white/5">
            
            {/* Lateral Visual */}
            <div className="w-full md:w-2/5 relative h-80 md:h-auto bg-slate-100 dark:bg-slate-800">
              <img 
                src={selectedMember.img} 
                alt={selectedMember.name} 
                className={`w-full h-full object-cover object-top ${selectedMember.id === 'manuela' ? 'scale-[1.15]' : 'scale-100'}`} 
              />
              <div className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r ${selectedMember.themeColor === 'magenta' ? 'from-magenta/90' : 'from-primary/90'} via-transparent to-transparent mix-blend-multiply`}></div>
              
              <div className="absolute bottom-8 left-8 text-white z-20 pr-8">
                <div className="w-14 h-14 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center mb-5 border border-white/20">
                  <span className="material-symbols-outlined text-3xl">{selectedMember.icon}</span>
                </div>
                <h4 className="text-4xl font-extrabold tracking-tight">{selectedMember.name}</h4>
                <p className="opacity-90 font-bold tracking-wider uppercase text-sm mt-1.5">{selectedMember.role}</p>
              </div>
            </div>

            {/* Contenido */}
            <div className="w-full md:w-3/5 p-10 md:p-16 overflow-y-auto custom-scrollbar relative">
              <button 
                onClick={() => setSelectedMember(null)}
                className="absolute top-8 right-8 w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-primary dark:hover:text-white transition-colors hover:scale-110 z-50 border border-slate-200 dark:border-slate-700"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <div className="space-y-10">
                <div className="relative pl-8">
                  <span className="absolute top-0 left-0 text-7xl text-primary/10 dark:text-accent/15 font-serif leading-none">"</span>
                  <p className="text-2xl md:text-3xl text-slate-700 dark:text-slate-100 font-display font-medium italic leading-relaxed tracking-tight">
                    {selectedMember.philosophy}
                  </p>
                  <h6 className="text-xs font-black uppercase tracking-widest text-primary dark:text-accent mt-5">Filosofía de Gestión Apax</h6>
                </div>

                <hr className="border-slate-100 dark:border-slate-800" />

                <div>
                  <h5 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Trayectoria y Visión</h5>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base md:text-lg font-manrope font-medium">
                    {selectedMember.fullBio}
                  </p>
                </div>

                <div>
                  <h5 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Áreas de Enfoque Estratégico</h5>
                  <div className="flex flex-wrap gap-2.5">
                    {selectedMember.specialties.map((spec, i) => (
                      <span key={i} className="px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-sm font-semibold border border-slate-200 dark:border-slate-700 tracking-tight">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row gap-5">
                  <a 
                    href={selectedMember.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#0077b5] text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#006396] transition-colors shadow-lg shadow-[#0077b5]/20 hover:scale-[1.02]"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                    Perfil Profesional
                  </a>
                  <button 
                    onClick={() => setSelectedMember(null)}
                    className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-8 py-4 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    Volver al Equipo
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

export default Team;
