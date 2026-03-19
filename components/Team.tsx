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
    fullBio: "Licenciada en Relaciones del Trabajo con una sólida trayectoria en empresas multinacionales y organismos públicos. Su experiencia abarca desde la gestión de procesos de cambio cultural hasta la implementación de estrategias de Diversidad e Inclusión.",
    philosophy: "La cultura organizacional es el ADN de una empresa. No se trata solo de gestionar personas, sino de diseñar ecosistemas donde el talento se sienta seguro para innovar.",
    img: "manuela.png", 
    icon: "verified_user",
    linkedin: "https://www.linkedin.com/in/maria-manuela-bugnot",
    themeColor: "magenta",
    specialties: ["Gestión del Cambio", "Reclutamiento IT & Global", "Diversidad e Inclusión"]
  },
  {
    id: 'giuliana',
    name: "Giuliana Gonzalez",
    role: "CO-FOUNDER",
    shortDesc: "Licenciada en RRHH especialista en selección, capacitación y optimización de la fuerza laboral con visión regional.",
    fullBio: "Licenciada en Administración de Recursos Humanos con más de 8 años de experiencia liderando áreas de talento en industrias competitivas como consumo masivo y farmacéutica.",
    philosophy: "La eficiencia operativa nace de la confianza del equipo. Mi objetivo es construir estructuras ágiles donde cada colaborador entienda el impacto real de su rol.",
    img: "giuli.png", 
    icon: "psychology_alt",
    linkedin: "https://www.linkedin.com/in/giulianagonzalez-/",
    themeColor: "navy",
    specialties: ["Desarrollo de Talento", "Estrategia Regional", "Optimización de Procesos"]
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
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white dark:border-slate-900 z-20 bg-gradient-to-br from-primary to-magenta">
              <span className="material-symbols-outlined text-lg">{member.icon}</span>
            </div>
          </div>
        </div>
        <div className="space-y-4 flex-grow">
          <h3 className="text-3xl font-bold text-primary dark:text-white group-hover:text-magenta transition-colors">{member.name}</h3>
          <p className={`${isMagenta ? 'text-magenta' : 'text-primary'} font-extrabold uppercase tracking-wider text-xs`}>{member.role}</p>
          <p className="text-slate-600 dark:text-slate-300 text-sm">{member.shortDesc}</p>
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
    <section id="equipo" className="py-24 bg-white dark:bg-[#020617] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-24">
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary via-magenta to-accent mb-6 rounded-full"></div>
          <h2 className="text-5xl md:text-6xl font-bold text-primary dark:text-white">Nuestro equipo</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {teamData.map((member) => (
            <TeamMemberCard key={member.id} member={member} onOpen={setSelectedMember} />
          ))}
        </div>
      </div>

     {selectedMember && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setSelectedMember(null)}></div>
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-6xl max-h-[92vh] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/5">
            <div className="w-full md:w-2/5 relative h-80 md:h-auto">
              <img src={selectedMember.img} className="w-full h-full object-cover object-top" alt={selectedMember.name} />
              <div className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r ${selectedMember.themeColor === 'magenta' ? 'from-magenta/90' : 'from-primary/90'} to-transparent opacity-60`}></div>
            </div>
            <div className="w-full md:w-3/5 p-10 overflow-y-auto">
              <button onClick={() => setSelectedMember(null)} className="absolute top-8 right-8 text-slate-400 hover:text-primary"><span className="material-symbols-outlined">close</span></button>
              <div className="space-y-8">
                <p className="text-2xl italic text-slate-700 dark:text-slate-100">"{selectedMember.philosophy}"</p>
                <hr className="border-slate-100 dark:border-slate-800" />
                <p className="text-slate-600 dark:text-slate-300 text-lg">{selectedMember.fullBio}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.specialties.map(s => <span key={s} className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full text-sm font-bold text-slate-600 dark:text-slate-300">{s}</span>)}
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
