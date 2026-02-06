import React, { useState } from 'react';

const Careers: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    formData.append("_subject", `Nueva Postulación Web: ${formData.get('nombre')}`);
    formData.append("_template", "table");
    formData.append("_captcha", "false");

    try {
      const response = await fetch("https://formsubmit.co/cv@apaxmanagement.com", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
        setFileName("");
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Error submitting application", error);
      setStatus('error');
    }
  };

  const inputClasses = "w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none transition-all duration-300 placeholder:text-slate-400 text-slate-900 dark:text-white focus:ring-4 focus:ring-primary/10 shadow-sm disabled:opacity-50";

  return (
    <section id="talento" className="py-20 bg-slate-50 dark:bg-[#020617] transition-colors duration-300 scroll-mt-20">
      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4">
        
        {/* TARJETA PRINCIPAL: Aquí devolvemos el color y el impacto */}
        <div className="bg-[#0a008a] rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-2xl border border-white/10">
          
          {/* Luces de fondo decorativas */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-magenta/30 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/20 rounded-full blur-[80px] -ml-16 -mb-16 pointer-events-none"></div>

          <div className="text-center md:text-left relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-black uppercase tracking-widest mb-6 backdrop-blur-md">
                <span className="material-symbols-outlined text-sm text-accent">groups</span>
                Talento Apax
              </div>
              <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight italic">
                ¿Buscas tu próximo <span className="text-accent">desafío profesional?</span>
              </h3>
              <p className="text-blue-100 text-lg leading-relaxed font-manrope opacity-90 mb-8">
                Somos el nexo estratégico entre tu potencial y las empresas líderes del mercado. Envianos tu CV para formar parte de nuestra red.
              </p>
              
              <button 
                onClick={() => setShowForm(true)}
                className="group/btn relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-[#0a008a] font-black rounded-2xl transition-all hover:scale-105 hover:shadow-2xl shadow-xl cursor-pointer"
              >
                <span>CARGAR MI CV</span>
                <span className="material-symbols-outlined group-hover:translate-y-[-2px] transition-transform font-bold">upload_file</span>
              </button>
          </div>

          {/* Imagen / Elemento Visual */}
          <div className="relative z-10 hidden lg:block w-1/3">
            <div className="aspect-square bg-gradient-to-br from-white/10 to-transparent rounded-[3rem] border border-white/20 backdrop-blur-sm flex items-center justify-center relative group">
                <span className="material-symbols-outlined text-[120px] text-white/20 group-hover:text-accent/40 transition-colors duration-700">person_search</span>
                <div className="absolute -bottom-4 -right-4 bg-accent p-4 rounded-2xl shadow-xl rotate-12">
                   <span className="material-symbols-outlined text-white text-3xl">bolt</span>
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DEL FORMULARIO */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden animate-scale-up">
             <div className="bg-[#0a008a] p-8 text-
