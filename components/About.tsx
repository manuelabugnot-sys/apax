
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="quienes-somos" className="py-24 bg-white dark:bg-background-dark scroll-mt-20">
      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="w-full lg:w-1/2">
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mb-6 rounded-full"></div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-primary dark:text-white tracking-tight">Quiénes somos</h2>
            <div className="space-y-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-manrope">
              <p>
                En Apax Management, nos definimos como aliados estratégicos en la evolución del talento. Creemos firmemente que el éxito de una organización radica en la armonía entre sus objetivos de negocio y el bienestar integral de sus colaboradores.
              </p>
              <p>
                Entendemos los desafíos actuales de un mercado globalizado y tecnológico. Por ello, diseñamos metodologías robustas que integran la visión analítica con la empatía necesaria para transformar entornos laborales competitivos en comunidades de alto rendimiento y propósito.
              </p>
              <p className="font-medium italic border-l-4 border-magenta pl-6 py-2 text-slate-800 dark:text-slate-200">
                "Comprometidas con la excelencia y la mejora continua, buscamos transformar las organizaciones a través de una gestión del talento humano efectiva y alineada con los objetivos estratégicos."
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-square lg:aspect-video border border-slate-100 dark:border-slate-800 group w-full h-full">
              <img 
                alt="Strategic discussion and professional leadership" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src="https://images.unsplash.com/photo-1600880212340-02d956ea3601?auto=format&fit=crop&q=80&w=2070"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=2070';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
