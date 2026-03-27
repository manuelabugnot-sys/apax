import React, { useState, useEffect } from 'react';

interface BusinessUnit {
  name: string;
  colorClass: string;
  icon: string;
  description: string;
}

interface ServiceDetail {
  id: string;
  title: string;
  fullDesc: string;
  methodology: string[];
  benefits: string[];
  businessUnits?: BusinessUnit[];
  icon: string;
  img: string;
}

const servicesData: ServiceDetail[] = [
  {
    id: 'reclutamiento',
    title: "Reclutamiento de Excelencia",
    icon: "person_search",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=2070",
    fullDesc: "Nuestro proceso de Reclutamiento identifica piezas fundamentales para el engranaje de su cultura. Utilizamos metodologías de 'Human-Centric Sourcing' para asegurar que el talento posea tanto habilidades técnicas como valores compartidos.",
    methodology: [
      "Levantamiento de Perfil Cultural (Culture Fit Analysis).",
      "Sourcing Pasivo en redes de nicho y bases privadas.",
      "Entrevistas por Competencias (STAR Method).",
      "Validación de Referencias 360° y Onboarding estratégico."
    ],
    businessUnits: [
      { name: "IT & Digital Specialists", colorClass: "from-blue-600 to-cyan-500 shadow-blue-500/20", icon: "terminal", description: "Especializados en perfiles tecnológicos (Devs, Data, DevOps) entendiendo los stacks y la velocidad del mercado." },
      { name: "Mandos Medios & Profesionales", colorClass: "from-emerald-600 to-teal-500 shadow-emerald-500/20", icon: "work", description: "Selección de analistas senior y especialistas corporativos que sostienen la operación diaria." },
      { name: "Executive Search", colorClass: "from-magenta to-[#7b2cbf] shadow-magenta/20", icon: "diamond", description: "Búsqueda confidencial de 'guante blanco' para posiciones de Dirección y Gerencia General." },
      { name: "RPO (Procesos Masivos)", colorClass: "from-slate-700 to-slate-900 shadow-slate-500/20", icon: "factory", description: "Recruitment Process Outsourcing para expansiones o aperturas de plantas industriales." },
      { name: "Programas de Semilleros", colorClass: "from-orange-500 to-pink-500 shadow-orange-500/20", icon: "school", description: "Captación de Jóvenes Profesionales y Pasantías para detectar el talento futuro." }
    ],
    benefits: [
      "Reducción de la tasa de rotación temprana.",
      "Candidatos alineados con la visión de la empresa.",
      "Ahorro significativo en tiempos de contratación."
    ]
  },
  {
    id: 'gestion',
    title: "Gestión del Talento",
    icon: "psychology",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070",
    fullDesc: "Potenciamos las capacidades actuales y preparamos a su equipo para los desafíos del futuro mediante un mapeo preciso de capacidades y planes de carrera motivadores.",
    methodology: [
      "Diagnóstico de Brechas de Habilidades (Skill Gap).",
      "Diseño Instruccional a Medida para Capacitaciones.",
      "Medición del ROI de Capacitación y Mentoring."
    ],
    businessUnits: [
      { name: "Liderazgo & Gestión", colorClass: "from-magenta to-[#7b2cbf] shadow-magenta/20", icon: "supervisor_account", description: "Entrenamiento para nuevos líderes en feedback, comunicación asertiva y gestión de equipos de alto rendimiento." },
      { name: "Performance Management", colorClass: "from-cyan-600 to-blue-600 shadow-cyan-500/20", icon: "speed", description: "Diseño de procesos de Evaluación de Desempeño (OKRs, 9-Box Grid) con feedback continuo." },
      { name: "Diversidad e Inclusión (D&I)", colorClass: "from-indigo-500 to-purple-600 shadow-indigo-500/20", icon: "diversity_3", description: "Estrategias de inclusión para construir entornos de trabajo equitativos y seguros." },
      { name: "Employee Experience (EX)", colorClass: "from-rose-500 to-orange-500 shadow-rose-500/20", icon: "favorite", description: "Diseño del 'Employee Journey' para mejorar el sentido de pertenencia y compromiso." },
      { name: "Coaching Ejecutivo", colorClass: "from-amber-500 to-orange-600 shadow-amber-500/20", icon: "self_improvement", description: "Sesiones personalizadas 1:1 para directivos enfocadas en habilidades blandas y toma de decisiones." },
      { name: "Compensaciones & Beneficios
