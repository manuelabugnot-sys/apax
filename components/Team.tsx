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

const TeamMemberCard: React.FC<{
  member: TeamMemberData;
  onOpen: (member: TeamMemberData) => void;
}> = ({ member, onOpen }) => {
  const isMagenta = member.themeColor === 'magenta';
  const ringGradient = isMagenta
    ? 'from-magenta via-primary/80 to-magenta'
    : 'from-primary via-magenta/80 to-primary';

  return (
    <div 
      onClick={() => onOpen(member)}
      className="relative group p-9 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer h-full"
    >
      <div className="relative z-10 flex flex-col h-full text-center">
        <div className="relative flex justify-center mb-10">
          <div className={`w-52 h-52 p-1.5 bg-gradient-to-br ${ringGradient} rounded-full overflow-hidden shadow-xl transition-transform duration-500 group-hover:scale-105`}>
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
            </div>
          </div>
          <div className="absolute -bottom-3 right-1/4 flex gap-2">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white dark:border-slate-900 z-20 btn-gradient">
              <span className="material-symbols-outlined text-lg">{member.icon}</span>
            </div>
          </div>
        </div>
        <div className="space-y-4 flex-grow">
          <h3 className="text-3xl font-bold text-primary dark:text-white group-hover:text-magenta transition-colors">{member.name}</h3>
          <p className={`${isMagenta ? 'text-magenta' : 'text-primary'} font-extrabold uppercase tracking-wider text-xs`}>{member.role}</p>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{member.shortDesc}</p>
        </div>
        <div className="pt-8 mt-auto">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-transparent group-hover:border-slate-300 transition-all">Leer Filosofía</span>
        </div>
      </div>
    </div>
  );
};

const Team: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMemberData | null>(null);

  useEffect(() => {
    document.body.style.overflow = selectedMember ? 'hidden' : 'auto';
  }, [selectedMember]);

  return (
    <section id="equipo" className="py-24 bg-white dark:bg-[#020617] transition-colors duration-500 scroll-mt-20">
      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20">
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-magenta mb-6 rounded-full"></div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-primary dark:text-white tracking-tight">Nuestro equipo</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 max-w-6xl mx-auto">
          {teamData.map((member) => (
            <TeamMemberCard key={member.id} member={member} onOpen={setSelectedMember} />
          ))}
        </div>
      </div>

      {selectedMember && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setSelectedMember(null)}></div>
          
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-6xl max-h-[92vh] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/5 animate-scale-up">
            
            {/* Columna Izquierda: Imagen y Nombre (ESTO FALTABA) */}
            <div className="w-full md:w-2/5 relative h-80 md:h-auto bg-slate-100 dark:bg-slate-800">
              <img src={selectedMember.img} className={`w-full h-full object-cover object-top ${selectedMember.id === 'manuela' ? 'scale-[1.15]' : 'scale-100'}`} alt={selectedMember.name} />
              <div className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r ${selectedMember.themeColor === 'magenta' ? 'from-magenta/90' : 'from-primary/90'} to-transparent mix-blend-multiply`}></div>
              
              {/* Nombre y Cargo sobre la foto */}
              <div className="absolute bottom-8 left-8 text-white z-20">
                <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-2xl">{selectedMember.icon}</span>
                </div>
                <h4 className="text-4xl font-extrabold tracking-tight">{selectedMember.name}</h4>
                <p className="opacity-90 font-bold uppercase text-sm mt-1">{selectedMember.role}</p>
              </div>
            </div>

            {/* Columna Derecha: Contenido y Botones */}
            <div className="w-full md:w-3/5 p-10 md:p-16 overflow-y-auto relative">
              
              {/* Botón Cerrar Superior */}
              <button onClick={() => setSelectedMember(null)} className="absolute top-6 right-6 text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">close</span></button>
              
              <div className="space-y-10">
                <div className="relative pl-6">
                  <span className="absolute top-0 left-0 text-6xl text-primary/10 dark:text-accent/20 font-serif leading-none">"</span>
                  <p className="text-2xl md:text-3xl text-slate-700 dark:text-slate-100 font-display font-medium italic leading-relaxed">{selectedMember.philosophy}</p>
                </div>

                <hr className="border-slate-100 dark:border-slate-800" />

                <div>
                  <h5 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Bio Profesional</h5>
                  <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-manrope">{selectedMember.fullBio}</p>
                </div>

                <div>
                  <h5 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Especialidades</h5>
                  <div className="flex flex-wrap gap-2.5">
                    {selectedMember.specialties.map(s => <span key={s} className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700">{s}</span>)}
                  </div>
                </div>

                {/* BOTONES DE ACCIÓN (ESTO FALTABA) */}
                <div className="pt-6 flex flex-col sm:flex-row gap-4">
                  <a 
                    href={selectedMember.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#0077b5] text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#006396] transition-colors shadow-lg shadow-[#0077b5]/20"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                    Conectar en LinkedIn
                  </a>
                  <button 
                    onClick={() => setSelectedMember(null)}
                    className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-8 py-4 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
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
