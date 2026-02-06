import React, { useState } from 'react';

const Careers: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setStatus('submitting');
    try {
      const res = await fetch("https://formsubmit.co/cv@apaxmanagement.com", {
        method: "POST", body: new FormData(e.currentTarget), headers: { 'Accept': 'application/json' }
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch { setStatus('error'); }
  };

  return (
    <section id="talento" className="py-10 bg-white dark:bg-slate-950">
      <div className="max-w-[95%] 2xl:max-w-screen-xl mx-auto px-4 lg:px-14">
        {/* BANNER COMPACTO - TAMAÑO REAL SEGÚN IMAGEN */}
        <div className="bg-gradient-to-r from-[#1a008a] via-[#7b2cbf] to-[#9d4edd] rounded-[2rem] p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-lg">
          <div className="relative z-10 max-w-2xl text-left">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[9px] font-bold uppercase tracking-widest mb-4">
                <span className="material-symbols-outlined text-[12px]">groups</span> TALENTO APAX
             </div>
             <h3 className="text-2xl md:text-[2.2rem] font-bold text-white mb-3 leading-tight tracking-tight">¿Buscas tu próximo desafío profesional?</h3>
             <p className="text-white/85 text-sm md:text-[0.95rem] leading-relaxed max-w-xl">Somos el nexo estratégico entre tu potencial y las empresas líderes del mercado. Envianos tu CV para participar de futuras búsquedas.</p>
          </div>
          <div className="relative z-10">
            <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0a008a] font-bold rounded-xl hover:scale-105 transition-all text-sm shadow-md">
              <span>Cargar mi CV</span>
              <span className="material-symbols-outlined text-[#7b2cbf] font-bold text-[18px]">upload_file</span>
            </button>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[1.5rem] overflow-hidden shadow-2xl">
            <div className="bg-[#1a008a] p-4 text-white flex justify-between items-center font-bold">
              <span className="text-sm">Enviar mi CV</span>
              <button onClick={() => {setShowForm(false); setStatus('idle');}} className="material-symbols-outlined">close</button>
            </div>
            <div className="p-6">
              {status === 'success' ? ( <div className="text-center py-4 text-green-600 font-bold">¡Enviado!</div> ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input name="nombre" placeholder="Nombre completo" required className
