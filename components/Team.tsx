import React, { useState, useEffect } from 'react';

// ... (se mantiene la interfaz TeamMemberData y teamData igual)

const TeamMemberCard: React.FC<{
  member: TeamMemberData;
  onOpen: (member: TeamMemberData) => void;
}> = ({ member, onOpen }) => {
  const isMagenta = member.themeColor === 'magenta';

  return (
    <div 
      onClick={() => onOpen(member)}
      /* CORRECCIÓN: bg-white dark:bg-slate-900 y border-white/5 para elegancia */
      className="relative group p-8 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer h-full"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${isMagenta ? 'from-magenta/5 to-primary/5' : 'from-primary/5 to-magenta/5'} opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]`}></div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="relative flex justify-center mb-8">
          <div className={`w-48 h-48 p-1.5 bg-gradient-to-br ${isMagenta ? 'from-magenta via-primary to-magenta' : 'from-navy via-magenta to-navy'} rounded-full overflow-hidden relative group/img-container shadow-xl transition-transform duration-500 group-hover:scale-105`}>
            {/* CORRECCIÓN: bg-slate-800 en modo oscuro para el contenedor de la imagen */}
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
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white dark:border-slate-900 z-20 btn-gradient group-hover:scale-110 transition-transform`}>
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
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-transparent group-hover:border-slate-300 dark:group-hover:border-slate-700 transition-all">Leer Filosofía de Gestión</span>
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
    /* CORRECCIÓN: Fondo principal dark:bg-[#020617] */
    <section id="equipo" className="py-24 bg-white dark:bg-[#020617] transition-colors duration-500 scroll-mt-20">
      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20">
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mb-6 rounded-full"></div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-primary dark:text-white tracking-tight">Nuestro equipo</h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-manrope">
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

        {/* ... (el resto del modal y botón de contacto se mantiene igual, 
             solo asegúrate de que el modal use dark:bg-slate-900) */}
        
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

      {/* MODAL CORREGIDO */}
      {selectedMember && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div 
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" 
            onClick={() => setSelectedMember(null)}
          ></div>
          
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-white/10">
            <div className="w-full md:w-2/5 relative h-64 md:h-auto bg-slate-100 dark:bg-slate-800">
              <img 
                src={selectedMember.img} 
                alt={selectedMember.name} 
                className={`w-full h-full object-cover object-top ${selectedMember.id === 'manuela' ? 'scale-[1.15]' : 'scale-100'}`} 
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
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-primary transition-colors z-50"
              >
                <span className="material-symbols-outlined">close</span>
              </button>

              <div className="space-y-8">
                <div className="relative pl-6">
                  <span className="absolute top-0 left-0 text-6xl text-primary/20 dark:text-magenta/20 font-serif leading-none">"</span>
                  <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-100 font-display font-medium italic leading-relaxed">
                    {selectedMember.philosophy}
                  </p>
                </div>

                <hr className="border-slate-100 dark:border-slate-800" />

                <div>
                  <h5 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Bio Profesional</h5>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
                    {selectedMember.fullBio}
                  </p>
                </div>
                {/* ... resto del contenido del modal ... */}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Team;
