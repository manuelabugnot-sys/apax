import React, { useState, useEffect } from 'react';

// 1. Definición de la Interfaz de Datos
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
  themeColor: 'navy' | 'magenta'; // Definimos explícitamente los colores temáticos
  specialties: string[];
}

// 2. Datos del Equipo Apax Management
const teamData: TeamMemberData[] = [
  {
    id: 'manuela',
    name: "Manuela Bugnot",
    role: "CO-FOUNDER",
    shortDesc: "Licenciada en Relaciones del Trabajo especialista en reclutamiento global, diversidad y cambio organizacional.",
    fullBio: "Licenciada en Relaciones del Trabajo con una sólida trayectoria en empresas multinacionales y organismos públicos. Su experiencia abarca desde la gestión de procesos de cambio cultural hasta la implementación de estrategias de Diversidad e Inclusión. Posee una visión holística del desarrollo organizacional, entendiendo las dinámicas interpersonales como el motor principal de la productividad.",
    philosophy: "La cultura organizacional es el ADN de una empresa. No se trata solo de gestionar personas, sino de diseñar ecosistemas donde el talento se sienta seguro para innovar. Transformamos organizaciones desbloqueando el potencial latente en sus equipos, alineando el propósito individual con la misión corporativa.",
    img: "manuela.png", 
    icon: "verified_user",
    linkedin: "https://www.linkedin.com/in/maria-manuela-bugnot",
    themeColor: "magenta", // Color principal: Magenta
    specialties: ["Gestión del Cambio", "Reclutamiento IT & Global", "Diversidad e Inclusión", "Clima Laboral"]
  },
  {
    id: 'giuliana',
    name: "Giuliana Gonzalez",
    role: "CO-FOUNDER",
    shortDesc: "Licenciada en RRHH especialista en selección, capacitación y optimización de la fuerza laboral con visión regional.",
    fullBio: "Licenciada en Administración de Recursos Humanos (USAL) con más de 8 años de experiencia liderando áreas de talento en industrias competitivas como consumo masivo, farmacéutica y manufactura. Su enfoque pragmático y orientado a resultados le permite optimizar procesos de selección y capacitación, garantizando que cada incorporación tenga un impacto medible en el negocio.",
    philosophy: "La eficiencia operativa nace de la confianza del equipo. Para mejorar una organización, debemos trascender lo transaccional y enfocarnos en la gestión estratégica de competencias. Mi objetivo es construir estructuras ágiles donde cada colaborador entienda el impacto real de su rol en la competitividad y el éxito global de la compañía.",
    img: "giuli.png", 
    icon: "psychology_alt",
    linkedin: "https://www.linkedin.com/in/giulianagonzalez-/",
    themeColor: "navy", // Color principal: Navy (Azul)
    specialties: ["Desarrollo de Talento", "Compensaciones y Beneficios", "Estrategia Regional", "Optimización de Procesos"]
  }
];

// 3. Componente de Tarjeta de Miembro (Donde están los efectos visuales)
const TeamMemberCard: React.FC<{
  member: TeamMemberData;
  onOpen: (member: TeamMemberData) => void;
}> = ({ member, onOpen }) => {
  const isMagenta = member.themeColor === 'magenta';
  
  // Definición dinámica de degradados basada en el color temático
  const glowGradient = isMagenta 
    ? 'from-magenta/10 to-primary/5' 
    : 'from-primary/10 to-magenta/5';

  const ringGradient = isMagenta
    ? 'from-magenta via-primary/80 to-magenta'
    : 'from-primary via-magenta/80 to-primary'; // Efecto espejo para Giuliana

  return (
    <div 
      onClick={() => onOpen(member)}
      /* Sombra de la tarjeta (shadow-lg -> shadow-2xl en hover) */
      className="relative group p-9 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer h-full overflow-hidden"
    >
      {/* Resplandor de fondo (Glow) al hacer hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${glowGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2.5rem]`}></div>
      
      <div className="relative z-10 flex flex-col h-full text-center">
        <div className="relative flex justify-center mb-10">
          
          {/* EL CÍRCULO CON DEGRADADO Y SOMBRA ( shadow-xl ) */}
          <div className={`w-52 h-52 p-1.5 bg-gradient-to-br ${ringGradient} rounded-full overflow-hidden shadow-xl transition-transform duration-500 group-hover:scale-105 group-hover:shadow-magenta/30 dark:group-hover:shadow-primary/30`}>
            
            {/* Contenedor interno blanco/oscuro para la foto */}
            <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-slate-800 relative">
              <img 
                alt={member.name} 
                /* Ajuste de escala específico para Manuela si es necesario, Giuliana al 100% */
                className={`w-full h-full object-cover object-top transition-all duration-500 ${member.id === 'manuela' ? 'scale-[1.15]' : 'scale-100'}`} 
                src={member.img} 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.
