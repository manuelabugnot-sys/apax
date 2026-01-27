

import React, { useState, useEffect } from 'react';

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

const teamData: TeamMemberData[] = [
  {
    id: 'manuela',
    name: "Manuela Bugnot",
    role: "CO-FOUNDER",
    shortDesc: "Licenciada en Relaciones del Trabajo especialista en reclutamiento global, diversidad y cambio organizacional.",
    fullBio: "Licenciada en Relaciones del Trabajo con una sólida trayectoria en empresas multinacionales y organismos públicos. Su experiencia abarca desde la gestión de procesos de cambio cultural hasta la implementación de estrategias de Diversidad e Inclusión. Posee una visión holística del capital humano, entendiendo las dinámicas interpersonales como el motor principal de la productividad.",
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
    shortDesc: "Licenciada en RRHH especialista en selección, capacitación y rentabilidad del capital humano con visión regional.",
    fullBio: "Licenciada en Administración de Recursos Humanos (USAL) con más de 8 años de experiencia liderando áreas de talento en industrias competitivas como consumo masivo, farmacéutica y manufactura. Su enfoque pragmático y orientado a resultados le permite optimizar procesos de selección y capacitación, garantizando que cada incorporación tenga un impacto medible en el negocio.",
    philosophy: "La eficiencia operativa nace de la confianza del equipo. Para mejorar una organización, debemos trascender lo transaccional y enfocarnos en la gestión estratégica de competencias. Mi objetivo es construir estructuras ágiles donde cada colaborador entienda el impacto real de su rol en la rentabilidad y el éxito global de la compañía.",
    img: "giuli.png", 
    icon: "psychology_alt",
    linkedin: "https://www.linkedin.com/in/giulianagonzalez-/",
    themeColor: "navy",
    specialties: ["Desarrollo de Talento", "Compensaciones y Beneficios", "Estrategia Regional", "Optimización de Procesos"]
  }
];

const TeamMemberCard: React.FC<{
  member: TeamMemberData;
  onOpen: (member: TeamMemberData) => void;
}> = ({ member, onOpen }) => {
  const isMagenta = member.themeColor === 'magenta';

  return (
    <div 
      onClick={() => onOpen(member)}
      className="relative group p-8 bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer h-full"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${isMagenta ? 'from-magenta/5 to-primary/5' : 'from-primary/5 to-magenta/5'} opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]`}></div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="relative flex justify-center mb-8">
          <div className={`w-48 h-48 p-1.5 bg-gradient-to-br ${isMagenta ? 'from-magenta via-primary to-magenta' : 'from-navy via-magenta to-navy'} rounded-full overflow-hidden relative group/img-container shadow-xl transition-transform duration-500 group-hover:scale-105`}>
            <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-slate-800">
              <img 
                alt={member.name} 
                className={`w-full h-full object-cover object-top transition-all duration-500 ${member.id === 'manuela' ? 'scale-[1.15]' : 'scale-100'}`} 
                src={member.img} 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes('ui-avatars')) {
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=${isMagenta ? '9d4edd' : '0a008a'}&color=fff&size=512&bold=true`;
                  }
                }}
              />
            </div>
            
            <div className={`absolute inset-0 bg-black/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center rounded-full`}>
               <span className="text-white font-bold text-sm bg-white/20 px-4 py-2 rounded-full border border-white/30 backdrop-blur-md">Ver Perfil</span>
            </div>
          </div>
          
          <div className="absolute -bottom-2 right-1/4 flex gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white dark:border-slate-800 z-20 btn-gradient group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined text-sm">{member.icon}</span>
              </div>
          </div>
        </div>
        <div className="space-y-4 text-center flex-grow">
          <div>
            <h3 className="text-2xl font-bold text-primary dark:text-white group-hover:text-magenta transition-colors">{member.name}</h3>
            <p className={`${isMagenta ? 'text-magenta' : 'text-primary'} font-bold uppercase tracking-wider text-sm mt-1`}>{member.role}</p>
          </div>
          <div className={`w-12 h-1 bg-gradient-to-r ${isMagenta ? 'from-magenta to-navy' : 'from-navy to-magenta'} rounded-full mx-auto group-hover:w-24 transition-all duration-300`}></div>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm line-clamp-3">
            {member.shortDesc}
          </p>
        </div>
        <div className="pt-6 text-center mt-auto">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-transparent group-hover:border-slate-300 dark:group-hover:border-slate-600 transition-all">Leer Filosofía de Gestión</span>
        </div>
      </div>
    </div>
  );
};

const Team: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMemberData | null>(null);

  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedMember]);

  return (
    <section id="equipo" className="py-24 bg-white dark:bg-background-dark scroll-mt-20">
      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20">
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mb-6 rounded-full"></div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-primary dark:text-white tracking-tight">Nuestro equipo</h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-manrope">
            Liderazgo estratégico y visión experta. Haga clic en cada perfil para descubrir nuestra filosofía de gestión.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 max-w-6xl mx-auto">
          {teamData.map((member) => (
            <TeamMemberCard 
              key={member.id} 
              member={member} 
              onOpen={setSelectedMember} 
            />
          ))}
        </div>

        <div className="mt-20 text-center">
          <button 
            onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-gradient text-white px-10 py-5 rounded-full text-lg font-bold shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3"
          >
            Hable con un Especialista
            <span className="material-symbols-outlined">chat</span>
          </button>
        </div>
      </div>

      {selectedMember && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fade-in">
          <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" 
            onClick={() => setSelectedMember(null)}
          ></div>
          
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-scale-up border border-white/10">
            <div className="w-full md:w-2/5 relative h-64 md:h-auto bg-slate-100 dark:bg-slate-800">
              <img 
                src={selectedMember.img} 
                alt={selectedMember.name} 
                className={`w-full h-full object-cover object-top ${selectedMember.id === 'manuela' ? 'scale-[1.15]' : 'scale-100'}`} 
                onError={(e) => {
                   const target = e.target as HTMLImageElement;
                   if (!target.src.includes('ui-avatars')) {
                       target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedMember.name)}&background=${selectedMember.themeColor === 'magenta' ? '9d4edd' : '0a008a'}&color=fff&size=512&bold=true`;
                   }
                }}
              />
              <div className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r ${selectedMember.themeColor === 'magenta' ? 'from-magenta/80' : 'from-navy/80'} to-transparent mix-blend-multiply`}></div>
              <div className="absolute bottom-6 left-6 text-white z-20">
                <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-2xl">{selectedMember.icon}</span>
                </div>
                <h4 className="text-3xl font-bold">{selectedMember.name}</h4>
                <p className="opacity-90 font-medium tracking-wide uppercase text-sm mt-1">{selectedMember.role}</p>
              </div>
            </div>

            <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto custom-scrollbar relative">
              <button 
                onClick={() => setSelectedMember(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-primary transition-colors hover:scale-110 z-50"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <div className="space-y-8">
                <div className="relative pl-6">
                  <span className="absolute top-0 left-0 text-6xl text-primary/20 dark:text-accent/20 font-serif leading-none">"</span>
                  <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 font-display font-medium italic leading-relaxed">
                    {selectedMember.philosophy}
                  </p>
                  <h5 className="text-xs font-black uppercase tracking-widest text-primary dark:text-accent mt-4">Filosofía de Gestión</h5>
                </div>

                <hr className="border-slate-100 dark:border-slate-800" />

                <div>
                  <h5 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Bio Profesional</h5>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
                    {selectedMember.fullBio}
                  </p>
                </div>

                <div>
                  <h5 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Áreas de Especialización</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.specialties.map((spec, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-700">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <a 
                    href={selectedMember.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#0077b5] text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#006396] transition-colors shadow-lg shadow-[#0077b5]/20"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                    Conectar en LinkedIn
                  </a>
                  <button 
                    onClick={() => setSelectedMember(null)}
                    className="flex-1 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-6 py-3 rounded-xl font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
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

export default Team;

