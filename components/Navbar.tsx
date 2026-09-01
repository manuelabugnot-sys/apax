
import React, { useState, useEffect } from 'react';

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

  const navLinks = [
    { name: 'Inicio', id: 'inicio' },
    { name: 'Quiénes somos', id: 'quienes-somos' },
    { name: 'Servicios', id: 'servicios' },
    { name: 'Empleabilidad', id: 'empleabilidad' },
    { name: 'Equipo', id: 'equipo' },
    { name: 'AI Lab', id: 'ai-lab' },
    { name: 'Contacto', id: 'contacto' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Logic for Progress Bar
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));

      // Logic for Active Section
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 150; // Offset aumentado por la barra más grande

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

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 100; // Ajustado para la barra más alta
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setIsOpen(false);
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
            {navLinks.map((link) => (
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
            ))}
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
        <div className="lg:hidden bg-gradient-to-r from-primary to-magenta border-b border-white/10 px-4 py-6 space-y-4 shadow-xl">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={`#${link.id}`} 
              onClick={(e) => handleScrollTo(e, link.id)} 
              className={`block font-manrope font-bold py-2 text-lg border-b border-white/10 ${activeSection === link.id ? 'text-white bg-white/10 pl-4 rounded-lg' : 'text-white/70 hover:text-white'}`}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
