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
      "Validación de Referencias 360°."
    ],
    businessUnits: [
      { name: "IT & Digital Specialists", colorClass: "from-blue-600 to-cyan-500", icon: "terminal", description: "Especializados en perfiles tecnológicos (Devs, Data, DevOps) entendiendo los stacks y la velocidad del mercado." },
      { name: "Mandos Medios & Profesionales", colorClass: "from-emerald-600 to-teal-500", icon: "work", description: "Selección de analistas senior y especialistas corporativos que sostienen la operación diaria." },
      { name: "Executive Search", colorClass: "from-indigo-600 to-blue-800", icon: "diamond", description: "Búsqueda confidencial de 'guante blanco' para posiciones de Dirección y Gerencia General." },
      { name: "RPO (Procesos Masivos)", colorClass: "from-slate-700 to-slate-900", icon: "factory", description: "Recruitment Process Outsourcing para expansiones o aperturas de plantas." },
      { name: "Programas de Semilleros", colorClass: "from-orange-500 to-pink-500", icon: "school", description: "Captación de Jóvenes Profesionales y Pasantías para detectar el talento futuro." }
    ],
    benefits: ["Reducción de la tasa de rotación temprana.", "Candidatos alineados con la visión.", "Ahorro en tiempos de contratación."]
  },
  {
    id: 'gestion',
    title: "Gestión del Talento",
    icon: "psychology",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070",
    fullDesc: "Potenciamos las capacidades actuales y preparamos a su equipo para los desafíos del futuro mediante un mapeo preciso de capacidades y planes de carrera motivadores.",
    methodology: ["Diagnóstico de Brechas (Skill Gap).", "Diseño Instruccional a Medida.", "Medición del ROI de Capacitación."],
    businessUnits: [
        { name: "Liderazgo & Gestión", colorClass: "from-violet-600 to-fuchsia-600", icon: "supervisor_account", description: "Entrenamiento para nuevos líderes en feedback y gestión de equipos." },
        { name: "Performance Management", colorClass: "from-cyan-600 to-blue-600", icon: "speed", description: "Diseño de procesos de Evaluación (OKRs, 9-Box) con feedback continuo." },
        { name: "Diversidad e Inclusión (D&I)", colorClass: "from-indigo-500 to-purple-600", icon: "diversity_3", description: "Estrategias de inclusión para entornos equitativos." },
        { name: "Employee Experience (EX)", colorClass: "from-rose-500 to-orange-500", icon: "favorite", description: "Diseño del 'Employee Journey' para mejorar el compromiso." },
        { name: "Coaching Ejecutivo", colorClass: "from-amber-500 to-orange-600", icon: "self_improvement", description: "Sesiones 1:1 para directivos enfocadas en competencias blandas." },
        { name: "Compensaciones & Beneficios", colorClass: "from-emerald-500 to-green-700", icon: "payments", description: "Diseño de bandas salariales y beneficios flexibles." }
    ],
    benefits: ["Incremento en el engagement.", "Retención de altos potenciales.", "Fortalecimiento de Marca Empleadora."]
  },
 {
    id: 'consultoria',
    title: "Consultoría Estratégica",
    icon: "hub",
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070",
    fullDesc: "Alineamos su arquitectura de RRHH con los objetivos de negocio, transformando la estructura para que sea ágil, eficiente y, sobre todo, humana.",
    methodology: ["Reingeniería de Procesos (BPR)", "Análisis de Estructuras Organizativas", "Planificación de Workforce"],
    businessUnits: [
        { name: "Clima & Cultura", colorClass: "from-lime-600 to-green-600", icon: "sentiment_very_satisfied", description: "Diagnóstico de salud organizacional y bienestar." },
        { name: "Outplacement", colorClass: "from-slate-700 to-slate-900", icon: "next_plan", description: "Programas de transición de carrera responsables." },
        { name: "Gestión del Cambio", colorClass: "from-indigo-600 to-purple-600", icon: "published_with_changes", description: "Acompañamiento en fusiones o implementaciones tecnológicas." },
        { name: "People Analytics", colorClass: "from-blue-700 to-indigo-800", icon: "query_stats", description: "KPIs estratégicos (Rotación, Absentismo, Headcount)." },
        { name: "Startups & Scale-ups", colorClass: "from-fuchsia-600 to-pink-700", icon: "rocket_launch", description: "Creación de RRHH desde cero para empresas en crecimiento." },
        { name: "Manuales & Puestos", colorClass: "from-teal-600 to-emerald-600", icon: "menu_book", description: "Definición de roles para optimizar la operación." }
    ],
    benefits: ["Estructuras ágiles", "Mejora del clima basada en datos", "Optimización de costos"]
  }
];
