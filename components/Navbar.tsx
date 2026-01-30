import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

export const BrandLogo: React.FC<{ className?: string, isFooter?: boolean }> = ({ 
  className = "h-16", 
  isFooter = false 
}) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });
    
    return () => observer.disconnect();
  }, []);

  const currentSrc = (isFooter && !isDark) ? 'logo-color.png' : 'logo.png';

  return (
    <div className={`${className} flex items-center select-none group/logo`}>
      <img 
        key={currentSrc}
        src={currentSrc} 
        alt="Apax Management Logo" 
        className={`h-full w-auto object-contain transition-all duration-500 ease-out
          ${!isFooter ? 'hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.7)]' : ''}
        `}
        style={{ 
          filter: !isFooter ? 'brightness(0) invert(1)' : 'none'
        }}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
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
    { name: 'Equipo', id: 'equipo' },
    { name: 'Servicios', id: 'servicios' },
    { name: 'AI Lab', id: 'ai-lab' },
    { name: 'Contacto', id: 'contacto' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));

      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 120;

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
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setIsOpen(false);
      setActiveSection(targetId);
    }
  };

  const navContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.6
      }
    }
  };

  const navItemVariants: Variants = {
    hidden: { opacity: 0, y: -15, filter: 'blur(4px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { 
        type: "spring", 
        stiffness: 120, 
        damping: 20 
      }
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed w-full z-50 bg-gradient-to-r from-primary/95 to-magenta/95 backdrop-blur-md border-b border-white/10 shadow-lg"
    >
      <div 
        className="absolute bottom-0 left-0 h-[3px] bg-white/80 transition-all duration-100 ease-out z-50"
        style={{ width: `${scrollProgress * 100}%` }}
      ></div>

      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center h-full">
            <a 
              href="#inicio" 
              onClick={(e) => handleScrollTo(e, 'inicio')}
              className="h-full flex items-center"
            >
              {/* LOGO: Animación sutil y elegante (Fade + Blur) */}
              <motion.div
                initial={{ opacity: 0, x: -15, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ 
                  duration: 1.2, 
                  ease: [0.25, 0.4, 0.25, 1] // Curva suave y sofisticada
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center z-10"
              >
                <BrandLogo className="h-14 md:h-28 w-auto origin-left" />
              </motion.div>
            </a>
          </div>

          <motion.div 
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex items-center space-x-1"
          >
            {navLinks.map((link) => (
              <motion.a 
                key={link.name}
                variants={navItemVariants}
                href={`#${link.id}`}
                onClick={(e) => handleScrollTo(e, link.id)}
                className={`
                  relative font-manrope font-bold transition-all duration-300 tracking-tight text-[13px] whitespace-nowrap px-4 py-1.5 rounded-full
                  ${activeSection === link.id ? 'text-white' : 'text-white/80 hover:text-white'}
                `}
              >
                {activeSection === link.id && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute inset-0 bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.4)] border border-white/20 rounded-full z-[-1]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {link.name}
              </motion.a>
            ))}
            
            <motion.div variants={navItemVariants} className="pl-4 flex items-center gap-2">
              <button 
                onClick={() => document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white hover:bg-slate-100 text-primary px-6 py-2.5 rounded-full font-manrope font-bold transition-all transform hover:scale-105 active:scale-95 shadow-lg text-xs"
              >
                Agendar Consultoría
              </button>
              <button 
                onClick={onToggleDarkMode}
                className="p-2.5 ml-1 rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              >
                <span className="material-symbols-outlined text-lg">dark_mode</span>
              </button>
            </motion.div>
          </motion.div>

          {/* Mobile UI */}
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

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-gradient-to-r from-primary to-magenta border-b border-white/10 px-4 py-6 space-y-4 shadow-xl overflow-hidden"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;