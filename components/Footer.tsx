
import React from 'react';

const Footer: React.FC = () => {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white pt-20 pb-12 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mb-16">
          
          {/* Columna 1: Logo e Identidad */}
          <div className="space-y-6">
            {/* Logo aumentado de tamaño (h-48) */}
            <div className="h-48 animate-float">
              {/* Logo de color para modo Light */}
              <img 
                src="logo-color.png" 
                className="h-full w-auto object-contain block dark:hidden drop-shadow-lg" 
                alt="Apax Management"
                onError={(e) => {(e.target as HTMLImageElement).src = 'logo.png'}}
              />
              {/* Logo blanco para modo Dark */}
              <img 
                src="logo.png" 
                className="h-full w-auto object-contain hidden dark:block drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]" 
                alt="Apax Management"
              />
            </div>
            
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-manrope">
              Potenciamos el talento de su organización mediante consultoría estratégica y un enfoque profundamente humano. Especialistas en soluciones integrales de Talento.
            </p>
            
            {/* LinkedIn */}
            <div className="flex items-center">
              <a 
                href="https://www.linkedin.com/company/apax-management/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-accent/10 flex items-center justify-center text-primary dark:text-accent group-hover:bg-primary group-hover:text-white transition-all">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-primary dark:group-hover:text-accent transition-colors">
                  Apax Management
                </span>
              </a>
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div className="lg:pl-8">
            <h4 className="text-sm font-black uppercase tracking-widest mb-6 text-primary dark:text-accent border-b-2 border-primary/10 dark:border-accent/10 pb-2 inline-block">
              Navegación
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <div className="space-y-4">
                <div>
                  <a 
                    href="#inicio" 
                    onClick={(e) => handleScrollTo(e, 'inicio')}
                    className="text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-accent transition-colors text-sm font-bold block"
                  >
                    Inicio
                  </a>
                </div>

                {/* Grupo: Nuestra Empresa */}
                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                    Nuestra Empresa
                  </span>
                  <ul className="space-y-2 pl-2.5 border-l-2 border-primary/20 dark:border-accent/20">
                    <li>
                      <a 
                        href="#quienes-somos" 
                        onClick={(e) => handleScrollTo(e, 'quienes-somos')}
                        className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors text-xs font-semibold block"
                      >
                        Quiénes somos
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#equipo" 
                        onClick={(e) => handleScrollTo(e, 'equipo')}
                        className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors text-xs font-semibold block"
                      >
                        Nuestro Equipo
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <a 
                    href="#talento-apax" 
                    onClick={(e) => handleScrollTo(e, 'talento-apax')}
                    className="text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-accent transition-colors text-sm font-bold block"
                  >
                    Talento Apax
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                {/* Grupo: Servicios */}
                <div className="space-y-2">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                    Servicios
                  </span>
                  <ul className="space-y-2 pl-2.5 border-l-2 border-primary/20 dark:border-accent/20">
                    <li>
                      <a 
                        href="#servicios" 
                        onClick={(e) => handleScrollTo(e, 'servicios')}
                        className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors text-xs font-semibold block"
                      >
                        Servicios para Empresas
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#empleabilidad" 
                        onClick={(e) => handleScrollTo(e, 'empleabilidad')}
                        className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors text-xs font-semibold block"
                      >
                        Programa de Empleabilidad
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <a 
                    href="#ai-lab" 
                    onClick={(e) => handleScrollTo(e, 'ai-lab')}
                    className="text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-accent transition-colors text-sm font-bold block"
                  >
                    AI Lab
                  </a>
                </div>

                <div>
                  <a 
                    href="#contacto" 
                    onClick={(e) => handleScrollTo(e, 'contacto')}
                    className="text-slate-700 dark:text-slate-200 hover:text-primary dark:hover:text-accent transition-colors text-sm font-bold block"
                  >
                    Contacto
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Columna 3: Newsletter */}
          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-white/5 h-fit">
            <h4 className="text-sm font-black uppercase tracking-widest mb-4 text-primary dark:text-accent">Newsletter</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              Suscríbase para recibir tendencias de talento y tecnología directo en su correo.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary text-lg">mail</span>
                <input 
                  type="email" 
                  placeholder="Su email" 
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white"
                />
              </div>
              <button className="w-full btn-gradient text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                Unirse
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </form>
          </div>

        </div>

        <div className="pt-10 border-t border-slate-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} APAX MANAGEMENT. TODOS LOS DERECHOS RESERVADOS.
          </p>
          <div className="flex gap-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
            <span>Buenos Aires • México • Global Talent</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
