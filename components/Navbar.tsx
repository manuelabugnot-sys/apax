
import React, { useState, useEffect, useRef } from 'react';

export const BrandLogo: React.FC<{ className?: string, isFooter?: boolean }> = ({ 
  className = "h-16", 
  isFooter = false 
}) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Función para detectar si la página está en modo oscuro
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkDark(); // Chequeo inicial

    // Esto detecta cuando haces clic en el botón de modo luz/oscuro
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => observer.disconnect();
  }, []);

  // Decidimos qué imagen mostrar
  // Si es el footer y NO está oscuro, muestra el de color. Si no, el blanco.
  const currentSrc = (isFooter && !isDark) ? 'logo-color.png' : 'logo.png';

  return (
    <div className={`${className} flex items-center select-none group/logo`}>
      <img 
        key={currentSrc} // Esto obliga a la imagen a recargar cuando cambia el modo
        src={currentSrc} 
        alt="Apax Management Logo" 
        className={`h-full w-auto object-contain transition-all duration-500 ease-out
          ${!isFooter ? 'hover:scale-110 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]' : ''}
        `}
        style={{ 
          // Si es la barra de arriba (!isFooter), forzamos que sea blanco puro siempre
          filter: !isFooter ? 'brightness(0) invert(1)' : 'none'
        }}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          // Si falla el logo de color, intentamos mostrar el blanco
          if (currentSrc === 'logo-color.png') {
            target.src = 'logo.png';
          }
        }}
      />
    </div>
  );
};

interface NavbarProps {
  onToggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const aboutDropdownRef = useRef<HTMLDivElement>(null);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const aboutHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const servicesHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const mainLinks = [
    { name: 'Inicio', id: 'inicio' },
    { 
      name: 'Nuestra Empresa', 
      id: 'quienes-somos',
      isDropdown: true,
      dropdownType: 'about' as const,
      items: [
        { 
          name: 'Quiénes somos', 
          id: 'quienes-somos', 
          desc: 'Propósito, visión y compromiso',
          icon: 'corporate_fare'
        },
        { 
          name: 'Nuestro Equipo', 
          id: 'equipo', 
          desc: 'Cofundadoras y liderazgo en RRHH',
          icon: 'groups'
        }
      ]
    },
    { 
      name: 'Servicios', 
      id: 'servicios',
      isDropdown: true,
      dropdownType: 'services' as const,
      serviceGroups: [
        {
          groupTitle: 'Soluciones para Empresas',
          items: [
            { 
              name: 'Reclutamiento y Selección', 
              id: 'reclutamiento', 
              desc: 'Headhunting y selección cultural',
              icon: 'person_search'
            },
            { 
              name: 'Gestión del Talento', 
              id: 'gestion', 
              desc: 'Mapeo de talento y planes de carrera',
              icon: 'psychology'
            },
            { 
              name: 'Consultoría Estratégica', 
              id: 'consultoria', 
              desc: 'Estructuras y KPIs de RRHH',
              icon: 'hub'
            }
          ]
        },
        {
          groupTitle: 'Para Profesionales',
          items: [
            { 
              name: 'Programa de Empleabilidad', 
              id: 'empleabilidad', 
              desc: 'CV, LinkedIn y Práctica de Entrevistas',
              icon: 'trending_up'
            }
          ]
        }
      ]
    },
    { name: 'Talento Apax', id: 'talento-apax' },
    { name: 'AI Lab', id: 'ai-lab' },
    { name: 'Contacto', id: 'contacto' },
  ];

  // Cerrar dropdowns al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(target)) {
        setAboutDropdownOpen(false);
      }
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(target)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Logic for Progress Bar
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));

      // All tracked section IDs
      const allSectionIds = ['inicio', 'quienes-somos', 'servicios', 'reclutamiento', 'gestion', 'consultoria', 'empleabilidad', 'talento-apax', 'equipo', 'ai-lab', 'contacto'];
      const sections = allSectionIds.map(id => document.getElementById(id));
      const scrollPosition = window.scrollY + 150;

      for (const section of sections) {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAboutMouseEnter = () => {
    if (aboutHoverTimeoutRef.current) {
      clearTimeout(aboutHoverTimeoutRef.current);
    }
    setAboutDropdownOpen(true);
  };

  const handleAboutMouseLeave = () => {
    aboutHoverTimeoutRef.current = setTimeout(() => {
      setAboutDropdownOpen(false);
    }, 200);
  };

  const handleServicesMouseEnter = () => {
    if (servicesHoverTimeoutRef.current) {
      clearTimeout(servicesHoverTimeoutRef.current);
    }
    setServicesDropdownOpen(true);
  };

  const handleServicesMouseLeave = () => {
    servicesHoverTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 200);
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setIsOpen(false);
      setAboutDropdownOpen(false);
      setServicesDropdownOpen(false);
      setActiveSection(targetId);
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-gradient-to-r from-primary/95 to-magenta/95 backdrop-blur-md border-b border-white/10 transition-all shadow-lg">
      {/* Scroll Progress Bar */}
      <div 
        className="absolute bottom-0 left-0 h-[3px] bg-white/80 transition-all duration-100 ease-out z-50"
        style={{ width: `${scrollProgress * 100}%` }}
      ></div>

      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-28 transition-all duration-300">
          <div className="flex items-center h-full py-2">
            <a 
              href="#inicio" 
              onClick={(e) => handleScrollTo(e, 'inicio')}
              className="transition-all h-full flex items-center"
            >
              {/* Logo Image Container - Tamaño ajustado */}
              <BrandLogo className="h-16 md:h-24 w-auto" />
            </a>
          </div>

          <div className="hidden lg:flex items-center space-x-1">
            {mainLinks.map((link) => {
              if (link.isDropdown && link.dropdownType === 'about' && link.items) {
                const isDropdownActive = ['quienes-somos', 'equipo'].includes(activeSection);
                return (
                  <div 
                    key={link.name} 
                    ref={aboutDropdownRef}
                    className="relative group"
                    onMouseEnter={handleAboutMouseEnter}
                    onMouseLeave={handleAboutMouseLeave}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setAboutDropdownOpen((prev) => !prev);
                      }}
                      className={`
                        font-manrope font-bold transition-all duration-300 tracking-tight text-[14px] whitespace-nowrap px-4 py-2 rounded-full border border-transparent inline-flex items-center gap-1.5 cursor-pointer select-none
                        ${isDropdownActive
                          ? 'text-white bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.4)] border-white/20 scale-105' 
                          : 'text-white/90 hover:text-white hover:bg-white/10 hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]'}
                      `}
                    >
                      <span>{link.name}</span>
                      <span className={`material-symbols-outlined text-base transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180' : ''}`}>
                        expand_more
                      </span>
                    </button>

                    {/* Dropdown Menu Glassmorphism */}
                    <div 
                      className={`absolute top-full left-0 pt-2 w-80 transition-all duration-200 z-50 ${
                        aboutDropdownOpen ? 'opacity-100 translate-y-0 pointer-events-auto visible' : 'opacity-0 -translate-y-2 pointer-events-none invisible'
                      }`}
                    >
                      <div className="bg-gradient-to-b from-[#0a008a]/95 via-[#18007a]/95 to-[#9d4edd]/95 backdrop-blur-2xl border border-white/20 rounded-2xl p-3.5 shadow-2xl space-y-1">
                        <div className="text-[11px] font-extrabold uppercase tracking-wider text-violet-200 px-3 py-1 mb-1">
                          Conozca Apax
                        </div>
                        {link.items.map((sub) => (
                          <a
                            key={sub.id}
                            href={`#${sub.id}`}
                            onClick={(e) => handleScrollTo(e, sub.id)}
                            className={`flex items-start gap-3 p-2.5 rounded-xl transition-all group/item cursor-pointer ${
                              activeSection === sub.id 
                                ? 'bg-white/20 text-white shadow-sm border border-white/25' 
                                : 'text-white/85 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            <div className="w-8 h-8 rounded-lg bg-white/15 text-white flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-white/25 transition-colors">
                              <span className="material-symbols-outlined text-lg">{sub.icon}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-bold text-xs sm:text-sm text-white flex items-center justify-between">
                                <span>{sub.name}</span>
                                <span className="material-symbols-outlined text-xs opacity-0 group-hover/item:opacity-100 transition-opacity">arrow_forward</span>
                              </div>
                              <div className="text-[11px] text-white/70 leading-tight mt-0.5">
                                {sub.desc}
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              if (link.isDropdown && link.dropdownType === 'services' && link.serviceGroups) {
                const isDropdownActive = ['servicios', 'reclutamiento', 'gestion', 'consultoria', 'empleabilidad'].includes(activeSection);
                return (
                  <div 
                    key={link.name} 
                    ref={servicesDropdownRef}
                    className="relative group"
                    onMouseEnter={handleServicesMouseEnter}
                    onMouseLeave={handleServicesMouseLeave}
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setServicesDropdownOpen((prev) => !prev);
                      }}
                      className={`
                        font-manrope font-bold transition-all duration-300 tracking-tight text-[14px] whitespace-nowrap px-4 py-2 rounded-full border border-transparent inline-flex items-center gap-1.5 cursor-pointer select-none
                        ${isDropdownActive
                          ? 'text-white bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.4)] border-white/20 scale-105' 
                          : 'text-white/90 hover:text-white hover:bg-white/10 hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]'}
                      `}
                    >
                      <span>{link.name}</span>
                      <span className={`material-symbols-outlined text-base transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180' : ''}`}>
                        expand_more
                      </span>
                    </button>

                    {/* Dropdown Menu Glassmorphism with invisible bridge */}
                    <div 
                      className={`absolute top-full left-0 pt-2 w-96 transition-all duration-200 z-50 ${
                        servicesDropdownOpen ? 'opacity-100 translate-y-0 pointer-events-auto visible' : 'opacity-0 -translate-y-2 pointer-events-none invisible'
                      }`}
                    >
                      <div className="bg-gradient-to-b from-[#0a008a]/95 via-[#18007a]/95 to-[#9d4edd]/95 backdrop-blur-2xl border border-white/20 rounded-2xl p-4 shadow-2xl">
                        {link.serviceGroups.map((group, gIdx) => (
                          <div key={gIdx} className={gIdx > 0 ? 'mt-3 pt-3 border-t border-white/15' : ''}>
                            <div className="text-[11px] font-extrabold uppercase tracking-wider text-violet-200 px-3 mb-1.5 flex items-center justify-between">
                              <span>{group.groupTitle}</span>
                              {group.groupTitle === 'Soluciones para Empresas' && (
                                <a 
                                  href="#servicios" 
                                  onClick={(e) => handleScrollTo(e, 'servicios')}
                                  className="text-[10px] text-white/70 hover:text-white underline font-semibold normal-case cursor-pointer"
                                >
                                  Ver todos
                                </a>
                              )}
                            </div>
                            
                            <div className="space-y-1">
                              {group.items.map((sub) => (
                                <a
                                  key={sub.id}
                                  href={`#${sub.id}`}
                                  onClick={(e) => handleScrollTo(e, sub.id)}
                                  className={`flex items-start gap-3 p-2.5 rounded-xl transition-all group/item cursor-pointer ${
                                    activeSection === sub.id 
                                      ? 'bg-white/20 text-white shadow-sm border border-white/25' 
                                      : 'text-white/85 hover:text-white hover:bg-white/10'
                                  }`}
                                >
                                  <div className="w-8 h-8 rounded-lg bg-white/15 text-white flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-white/25 transition-colors">
                                    <span className="material-symbols-outlined text-lg">{sub.icon}</span>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="font-bold text-xs sm:text-sm text-white flex items-center justify-between">
                                      <span>{sub.name}</span>
                                      <span className="material-symbols-outlined text-xs opacity-0 group-hover/item:opacity-100 transition-opacity">arrow_forward</span>
                                    </div>
                                    <div className="text-[11px] text-white/70 leading-tight mt-0.5 truncate">
                                      {sub.desc}
                                    </div>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <a 
                  key={link.name}
                  href={`#${link.id}`}
                  onClick={(e) => handleScrollTo(e, link.id)}
                  className={`
                    font-manrope font-bold transition-all duration-300 tracking-tight text-[14px] whitespace-nowrap px-4 py-2 rounded-full border border-transparent
                    ${activeSection === link.id 
                      ? 'text-white bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.4)] border-white/20 scale-105' 
                      : 'text-white/90 hover:text-white hover:bg-white/10 hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]'}
                  `}
                >
                  {link.name}
                </a>
              );
            })}
            <div className="pl-4 flex items-center gap-2">
              <button 
                onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white hover:bg-slate-100 text-primary px-7 py-3 rounded-full font-manrope font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg text-sm"
              >
                Agendar Consultoría
              </button>
              <button 
                onClick={onToggleDarkMode}
                className="p-3 ml-2 rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <span className="material-symbols-outlined text-xl">dark_mode</span>
              </button>
            </div>
          </div>

          <div className="lg:hidden flex items-center space-x-4">
            <button onClick={onToggleDarkMode} className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
              <span className="material-symbols-outlined text-xl">dark_mode</span>
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-white hover:bg-white/10 rounded-full transition-colors">
              <span className="material-symbols-outlined text-3xl">{isOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-gradient-to-r from-primary to-magenta border-b border-white/10 px-4 py-6 space-y-3 shadow-xl max-h-[80vh] overflow-y-auto">
          {mainLinks.map((link) => {
            if (link.isDropdown && link.dropdownType === 'about' && link.items) {
              return (
                <div key={link.name} className="border-b border-white/10 pb-2">
                  <button
                    type="button"
                    onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                    className="w-full flex items-center justify-between font-manrope font-bold py-2 text-lg text-white/90"
                  >
                    <span>{link.name}</span>
                    <span className={`material-symbols-outlined text-xl transition-transform ${mobileAboutOpen ? 'rotate-180' : ''}`}>
                      expand_more
                    </span>
                  </button>

                  {mobileAboutOpen && (
                    <div className="pl-2 py-2 space-y-2 bg-white/5 rounded-xl mt-1">
                      {link.items.map((sub) => (
                        <a
                          key={sub.id}
                          href={`#${sub.id}`}
                          onClick={(e) => handleScrollTo(e, sub.id)}
                          className={`flex items-center gap-2.5 py-2 px-2.5 rounded-lg text-xs font-bold ${
                            activeSection === sub.id ? 'text-white bg-white/20' : 'text-white/85 hover:text-white'
                          }`}
                        >
                          <span className="material-symbols-outlined text-base">{sub.icon}</span>
                          <div className="flex-1">
                            <div>{sub.name}</div>
                            <div className="text-[10px] text-white/60 font-normal">{sub.desc}</div>
                          </div>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            if (link.isDropdown && link.dropdownType === 'services' && link.serviceGroups) {
              return (
                <div key={link.name} className="border-b border-white/10 pb-2">
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="w-full flex items-center justify-between font-manrope font-bold py-2 text-lg text-white/90"
                  >
                    <span>{link.name}</span>
                    <span className={`material-symbols-outlined text-xl transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}>
                      expand_more
                    </span>
                  </button>

                  {mobileServicesOpen && (
                    <div className="pl-2 py-2 space-y-3 bg-white/5 rounded-xl mt-1">
                      {link.serviceGroups.map((group, gIdx) => (
                        <div key={gIdx} className="space-y-1.5">
                          <div className="text-[10px] font-extrabold uppercase tracking-wider text-violet-200 px-2">
                            {group.groupTitle}
                          </div>
                          {group.items.map((sub) => (
                            <a
                              key={sub.id}
                              href={`#${sub.id}`}
                              onClick={(e) => handleScrollTo(e, sub.id)}
                              className={`flex items-center gap-2.5 py-2 px-2.5 rounded-lg text-xs font-bold ${
                                activeSection === sub.id ? 'text-white bg-white/20' : 'text-white/85 hover:text-white'
                              }`}
                            >
                              <span className="material-symbols-outlined text-base">{sub.icon}</span>
                              <div className="flex-1">
                                <div>{sub.name}</div>
                                <div className="text-[10px] text-white/60 font-normal">{sub.desc}</div>
                              </div>
                            </a>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <a 
                key={link.name} 
                href={`#${link.id}`} 
                onClick={(e) => handleScrollTo(e, link.id)} 
                className={`block font-manrope font-bold py-2 text-lg border-b border-white/10 ${activeSection === link.id ? 'text-white bg-white/10 pl-4 rounded-lg' : 'text-white/70 hover:text-white'}`}
              >
                {link.name}
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
