import React, { useState, useEffect, useRef } from 'react';

const CountUp: React.FC<{ end: number; duration: number }> = ({ end, duration }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) observer.observe(countRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return <span ref={countRef}>{count}</span>;
};

const Features: React.FC = () => {
  const features = [
    {
      icon: 'bolt',
      title: 'Experiencia Corporativa',
      desc: (
        <>
          Contamos con más de <span className="font-black text-2xl text-primary dark:text-accent mx-1 inline-block"><CountUp end={8} duration={2000} /></span> años de experiencia combinada liderando procesos de talento en empresas de primera línea, aportando agilidad y compromiso.
        </>
      ),
      color: 'navy'
    },
    {
      icon: 'diversity_2',
      title: 'Equipo Multidisciplinario',
      desc: 'Expertos en administración de RRHH y relaciones del trabajo dedicados a maximizar el valor estratégico de sus equipos.',
      color: 'magenta'
    },
    {
      icon: 'psychology_alt',
      title: 'Enfoque Estratégico y Humano',
      desc: 'Fusionamos la visión analítica con la sensibilidad humana para llenar vacíos de gestión mediante soluciones sostenibles que potencian tanto a las personas como a los resultados.',
      color: 'navy'
    }
  ];

  return (
    <section id="diferencial" className="py-24 bg-slate-50 dark:bg-slate-900/30 scroll-mt-20 transition-colors duration-300">
      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mb-6 rounded-full"></div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary dark:text-white">Nuestro diferencial</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((f, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 p-10 rounded-[2rem] border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all group h-full">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm
                ${f.color === 'navy' 
                  ? 'bg-navy/10 text-navy dark:bg-blue-500/20 dark:text-blue-400' 
                  : 'bg-magenta/10 text-magenta dark:bg-accent/20 dark:text-accent'}`}
              >
                <span className="material-symbols-outlined text-3xl font-bold">{f.icon}</span>
              </div>
              <h4 className="text-2xl font-bold mb-4 text-primary dark:text-white">{f.title}</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;