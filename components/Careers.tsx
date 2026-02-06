import React, { useState } from 'react';

const Careers: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(e.target.files?.[0]?.name || "");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch("https://formsubmit.co/cv@apaxmanagement.com", {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) { setStatus('success'); e.currentTarget.reset(); setFileName(""); } 
      else { setStatus('error'); }
    } catch { setStatus('error'); }
  };

  const inputClasses = "w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none transition-all placeholder:text-slate-400 text-slate-900 dark:text-white focus:scale-[1.02] focus:ring-4 focus:ring-primary/10 shadow-sm disabled:opacity-50";

  return (
    <section id="talento" className="py-12 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-white/5 overflow-hidden relative group transition-colors duration-300 scroll-mt-20">
      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4 relative z-10">
        {/* EL DEGRADADO ORIGINAL VOLVIÓ AQUÍ */}
        <div className="bg-gradient-to-br from-[#0a008a] via-[#7b2cbf] to-[#9d4edd] rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl border border-white/10">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none mix-blend-overlay animate-pulse"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] mix-blend-overlay"></div>

          <div className="text-center md:text-left relative z-10 max-w-3xl">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest mb-6 backdrop-blur-md shadow-lg">
                <span className="material-symbols-outlined text-sm">groups</span>
                Talento Apax
             </div>
             <h3 className="text-2xl md:text-4xl font-display font-bold text-white mb-4 leading-tight italic">
               ¿Buscas tu próximo desafío profesional?
             </h3>
             <p className="text-purple-50 text-lg leading-relaxed font-manrope font-medium opacity-90">
               Somos el nexo estratégico entre tu potencial y las empresas líderes del mercado. Envianos tu CV para formar parte de nuestra base de talentos.
             </p>
          </div>

          <div className="relative
