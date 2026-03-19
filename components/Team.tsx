import React, { useState, useEffect } from 'react';

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
  themeColor: 'navy' | 'magenta';
  specialties: string[];
}

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
    themeColor: "magenta",
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
    themeColor: "navy",
    specialties: ["Desarrollo de Talento", "Compensaciones y Beneficios", "Estrategia Regional", "Optimización de Procesos"]
  }
];

const TeamMemberCard: React.FC<{
  member: TeamMemberData;
  onOpen: (member: TeamMemberData) => void;
}> = ({ member, onOpen }) => {
  const isMagenta = member.themeColor === 'magenta';
  
  const ringGradient = isMagenta
    ? 'from-magenta via-primary/80 to-magenta'
    : 'from-primary via-magenta/80 to-primary';

  return (
    <div 
      onClick={() => onOpen(member)}
      className="relative group p-9 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer h-full overflow-hidden"
    >
      <div className="relative z-1
