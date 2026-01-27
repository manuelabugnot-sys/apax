
import React from 'react';

const DifferentialImage: React.FC = () => {
  return (
    <section className="relative z-10 -mt-12 md:-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white dark:border-slate-800 transform hover:scale-[1.01] transition-transform duration-700">
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070" 
            alt="Colaboración Estratégica Apax" 
            className="w-full h-[300px] md:h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-magenta/20 mix-blend-multiply"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 bg-gradient-to-t from-slate-950/80 to-transparent">
            <p className="text-white text-lg md:text-xl font-medium italic max-w-2xl">
              "La sinergia perfecta entre visión estratégica y ejecución humana."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DifferentialImage;
