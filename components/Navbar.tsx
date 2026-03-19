import React from 'react';
import { motion } from 'framer-motion';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  description: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, image, description }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative group p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-500"
    >
      {/* EL CÍRCULO DE COLOR (Fondo) */}
      <div className="absolute top-0 right-0 -z-10 w-32 h-32 bg-magenta/20 blur-[80px] rounded-full group-hover:bg-primary/30 transition-colors duration-700" />
      
      <div className="flex flex-col items-center md:items-start gap-6">
        {/* CONTENEDOR DE LA FOTO CON SOMBRA/RESPLANDOR */}
        <div className="relative">
          {/* Este div genera el "anillo" o resplandor de color detrás de la foto */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-magenta rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          
          <img 
            src={image} 
            alt={name}
            className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-white/20 shadow-2xl transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="text-center md:text-left">
          <h3 className="text-2xl font-manrope font-bold text-white mb-1">
            {name}
          </h3>
          <p className="text-magenta font-medium mb-4 tracking-wider uppercase text-xs">
            {role}
          </p>
          <p className="text-white/70 text-sm leading-relaxed font-light">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const TeamSection: React.FC = () => {
  return (
    <section id="equipo" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Manuela */}
          <TeamMember 
            name="Manuela Bugnot"
            role="Co-Founder"
            image="/path-to-manuela.jpg"
            description="Especialista en recruitment global y cultura organizacional."
          />
          {/* Giuliana - Ahora con el mismo diseño exacto */}
          <TeamMember 
            name="Giuliana Gonzalez"
            role="Co-Founder"
            image="/path-to-giuliana.jpg"
            description="Experta en optimización de equipos y gestión estratégica de competencias."
          />
        </div>
      </div>
    </section>
  );
};
