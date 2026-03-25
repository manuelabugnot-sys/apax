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
        headers: {
            'Accept': 'application/json'
        }
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

  const inputClasses = "w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none transition-all duration-300 placeholder:text-slate-400 text-slate-900 dark:text-white focus:scale-[1.02] focus:border-primary dark:focus:border-accent focus:ring-4 focus:ring-primary/10 dark:focus:ring-accent/10 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <section id="talento" className="py-20 bg-transparent scroll-mt-20 overflow-hidden relative transition-colors duration-500">
      
      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* EL RECUADRO - Ahora con gradiente fijo que resalta en ambos modos */}
        <div className="bg-gradient-to-br from-[#0f172a] via-[#7b2cbf] to-magenta rounded-[3.5rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden shadow-[0_20px_50px_rgba(123,44,191,0.3)] border border-white/10 transition-all hover:shadow-magenta/40">
          
          {/* Luces decorativas internas */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none mix-blend-overlay"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/20 rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none"></div>

          <div className="text-center md:text-left relative z-10 max-w-2xl">
             <div className="inline-flex items-center justify-center md:justify-start gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[11px] font-black uppercase tracking-[0.2em] mb-8 backdrop-blur-md">
                <span className="material-symbols-outlined text-sm">stars</span>
                Talent Network
             </div>
             <h3 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-[1.1]">
               ¿Buscas tu próximo <br className="hidden md:block" />
               <span className="text-white/80 italic font-serif">desafío profesional?</span>
             </h3>
             <p className="text-purple-50 text-xl leading-relaxed font-medium opacity-90 max-w-xl">
               Conectamos tu potencial con empresas líderes. Envíanos tu CV para formar parte de nuestra base estratégica de talentos.
             </p>
          </div>

          <div className="relative z-10 shrink-0 w-full md:w-auto flex flex-col items-center gap-4">
            <button 
              onClick={() => setShowForm(true)}
              className="group/btn relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-[#7b2cbf] font-black rounded-2xl transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] w-full md:w-auto shadow-2xl cursor-pointer"
            >
              <span className="relative z-10">Cargar mi CV</span>
              <span className="material-symbols-outlined relative z-10 group-hover/btn:translate-y-[-2px] transition-transform font-bold">upload_file</span>
            </button>
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Proceso 100% Confidencial</p>
          </div>
        </div>
      </div>

      {/* Modal del Formulario */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fade-in bg-slate-950/90 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden border border-white/10 my-auto animate-scale-up">
             
             <div className="bg-gradient-to-r from-[#0f172a] to-magenta p-10 relative overflow-hidden text-white text-center">
                <button 
                    onClick={() => { setShowForm(false); setStatus('idle'); }}
                    className="absolute top-8 right-8 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-20"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>
                <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-[2rem] flex items-center justify-center text-white mx-auto mb-6 border border-white/20 shadow-2xl">
                    <span className="material-symbols-outlined text-4xl">person_add</span>
                </div>
                <h3 className="text-3xl font-bold mb-2 tracking-tight">Postulación Estratégica</h3>
                <p className="text-white/80 max-w-xl mx-auto font-medium">
                    Tu perfil será analizado por nuestro equipo experto en People Analytics.
                </p>
             </div>

             <div className="p-10 md:p-14 bg-white dark:bg-slate-900 max-h-[60vh] overflow-y-auto custom-scrollbar">
                {status === 'success' ? (
                   <div className="text-center py-12">
                     <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                       <span className="material-symbols-outlined text-6xl">verified</span>
                     </div>
                     <h4 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">¡CV Recibido!</h4>
                     <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto mb-8 text-lg font-medium">
                        Tu información ya está en nuestra red de talentos. Nos contactaremos cuando surja un desafío alineado a tu perfil.
                     </p>
                     <button 
                       onClick={() => { setShowForm(false); setStatus('idle'); }}
                       className="px-10 py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black hover:scale-105 transition-all"
                     >
                       Volver al inicio
                     </button>
                   </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-8" encType="multipart/form-data">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-sm font-bold mb-3 text-slate-700 dark:text-slate-300 uppercase tracking-wider">Nombre Completo *</label>
                                <input name="nombre" type="text" required className={inputClasses} placeholder="Nombre y Apellido" disabled={status === 'submitting'} />
                            </div>
                             <div>
                                <label className="block text-sm font-bold mb-3 text-slate-700 dark:text-slate-300 uppercase tracking-wider">Área de Experiencia *</label>
                                <select name="area" className={inputClasses} disabled={status === 'submitting'} required defaultValue="">
                                    <option value="" disabled>Seleccione una...</option>
                                    <option value="IT & Tecnología">IT & Tecnología</option>
                                    <option value="Administración & Finanzas">Administración & Finanzas</option>
                                    <option value="Comercial & Marketing">Comercial & Marketing</option>
                                    <option value="Recursos Humanos">Recursos Humanos</option>
                                    <option value="Ingeniería & Operaciones">Ingeniería & Operaciones</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-sm font-bold mb-3 text-slate-700 dark:text-slate-300 uppercase tracking-wider">Email Profesional *</label>
                                <input name="email" type="email" required className={inputClasses} placeholder="email@ejemplo.com" disabled={status === 'submitting'} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-3 text-slate-700 dark:text-slate-300 uppercase tracking-wider">LinkedIn URL</label>
                                <input name="linkedin" type="url" className={inputClasses} placeholder="https://linkedin.com/..." disabled={status === 'submitting'} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-3 text-slate-700 dark:text-slate-300 uppercase tracking-wider">Adjuntar CV (PDF) *</label>
                            <div className="p-8 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl bg-slate-50 dark:bg-slate-800/30 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-center relative group">
                                <input 
                                    type="file" 
                                    name="cv" 
                                    onChange={handleFileChange}
                                    accept=".pdf,.doc,.docx" 
                                    required 
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                                    disabled={status === 'submitting'}
                                />
                                <div className="flex flex-col items-center gap-3 group-hover:scale-105 transition-transform">
                                    <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 shadow-xl flex items-center justify-center text-magenta">
                                      <span className="material-symbols-outlined text-3xl">upload_file</span>
                                    </div>
                                    {fileName ? (
                                      <span className="font-bold text-[#7b2cbf] text-lg">{fileName}</span>
                                    ) : (
                                      <span className="font-bold text-slate-700 dark:text-white text-lg">Haga clic o arrastre su archivo aquí</span>
                                    )}
                                    <span className="text-xs text-slate-400 font-bold tracking-widest uppercase">Formatos PDF, DOCX (Máx 5MB)</span>
                                </div>
                            </div>
                        </div>
                        
                         {status === 'error' && (
                            <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm font-bold text-center">
                                Hubo un error al enviar. Por favor intente nuevamente.
                            </div>
                        )}

                        <button 
                            type="submit" 
                            disabled={status === 'submitting'}
                            className="w-full bg-gradient-to-r from-[#0f172a] via-[#7b2cbf] to-magenta text-white py-6 rounded-2xl font-black text-xl shadow-2xl hover:opacity-95 transition-all transform active:scale-[0.98] flex items-center justify-center gap-4 disabled:opacity-70 disabled:cursor-wait"
                        >
                            {status === 'submitting' ? (
                                <>
                                    <span className="animate-spin material-symbols-outlined">progress_activity</span>
                                    Procesando...
                                </>
                            ) : (
                                <>
                                    Enviar Postulación
                                    <span className="material-symbols-outlined">send</span>
                                </>
                            )}
                        </button>
                    </form>
                )}
             </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Careers;
