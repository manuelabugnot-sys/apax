import React, { useState } from 'react';

const Careers: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch("https://formsubmit.co/cv@apaxmanagement.com", {
        method: "POST", body: new FormData(e.currentTarget), headers: { 'Accept': 'application/json' }
      });
      res.ok ? setStatus('success') : setStatus('error');
    } catch { setStatus('error'); }
  };

  return (
    <section id="talento" className="py-12 bg-white dark:bg-slate-950 scroll-mt-20">
      <div className="max-w-[95%] 2xl:max-w-screen-xl mx-auto px-4 lg:px-10">
        
        {/* BANNER MÁS CHICO Y ESTILIZADO */}
        <div className="bg-gradient-to-r from-[#3100a3] via-[#7b2cbf] to-[#9d4edd] rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-xl border border-white/10">
          
          <div className="relative z-10 max-w-2xl text-left">
             {/* Badge Superior más pequeño */}
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[9px] font-bold uppercase tracking-[0.15em] mb-5">
                <span className="material-symbols-outlined text-[12px]">groups</span>
                TALENTO APAX
             </div>
             
             {/* Título - Tamaño ajustado */}
             <h3 className="text-2xl md:text-[2.6rem] font-bold text-white mb-4 leading-[1.15] tracking-tight">
               ¿Buscas tu próximo desafío profesional?
             </h3>
             
             {/* Párrafo con tamaño de fuente más equilibrado */}
             <p className="text-white/85 text-base md:text-[1.05rem] leading-relaxed font-normal max-w-xl">
               Somos el nexo estratégico entre tu potencial y las empresas líderes del mercado. Envianos tu CV para formar parte de nuestra base de talentos y participar de futuras búsquedas.
             </p>
          </div>

          <div className="relative z-10 shrink-0">
            {/* Botón con el tamaño exacto de la imagen */}
            <button 
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#0a008a] font-bold rounded-xl transition-all hover:scale-105 shadow-lg text-[15px]"
            >
              <span>Cargar mi CV</span>
              <span className="material-symbols-outlined text-[#7b2cbf] font-bold text-[20px]">upload_file</span>
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl animate-scale-up">
            <div className="bg-[#3100a3] p-5 text-white flex justify-between items-center">
              <h3 className="font-bold">Enviar mi CV</h3>
              <button onClick={() => {setShowForm(false); setStatus('idle');}} className="material-symbols-outlined">close</button>
            </div>
            <div className="p-7">
              {status === 'success' ? (
                <div className
