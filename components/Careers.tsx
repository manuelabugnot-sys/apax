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
    
    // Configuration for FormSubmit
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
    <section id="talento" className="py-12 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-white/5 overflow-hidden relative group transition-colors duration-300 scroll-mt-20">
      
      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-navy via-purple-700 to-magenta rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl transition-all hover:shadow-magenta/25 border border-white/10">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none mix-blend-overlay animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/20 rounded-full blur-[60px] -ml-16 -mb-16 pointer-events-none mix-blend-color-dodge"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] mix-blend-overlay"></div>

          <div className="text-center md:text-left relative z-10 max-w-3xl">
             <div className="inline-flex items-center justify-center md:justify-start gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest mb-6 backdrop-blur-md shadow-lg">
                <span className="material-symbols-outlined text-sm">groups</span>
                Talento Apax
             </div>
             <h3 className="text-2xl md:text-4xl font-display font-bold text-white mb-4 leading-tight">
               ¿Buscas tu próximo desafío profesional?
             </h3>
             <p className="text-purple-50 text-lg leading-relaxed font-manrope font-medium opacity-90">
               Somos el nexo estratégico entre tu potencial y las empresas líderes del mercado. Envianos tu CV para formar parte de nuestra base de talentos y participar de futuras búsquedas.
             </p>
          </div>

          <div className="relative z-10 shrink-0 w-full md:w-auto flex justify-center">
            <button 
              onClick={() => setShowForm(true)}
              className="group/btn relative inline-flex items-center justify-center gap-3 px-8 py-5 bg-white text-navy font-bold rounded-2xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] w-full md:w-auto border border-white/50 shadow-xl cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-slate-50 to-purple-50 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
              <span className="relative z-10">Cargar mi CV</span>
              <span className="material-symbols-outlined relative z-10 group-hover/btn:translate-x-1 transition-transform text-magenta font-bold">upload_file</span>
            </button>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fade-in bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10 my-auto animate-scale-up">
             
             <div className="bg-gradient-to-r from-navy to-magenta p-8 md:p-10 relative overflow-hidden text-white text-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[50px] -mr-16 -mt-16 pointer-events-none"></div>
                <button 
                    onClick={() => { setShowForm(false); setStatus('idle'); }}
                    className="absolute top-6 right-6 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors z-20"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mx-auto mb-6 border border-white/20 shadow-lg">
                    <span className="material-symbols-outlined text-4xl">person_add</span>
                </div>
                <h3 className="text-3xl font-bold mb-2">Únete a Talento Apax</h3>
                <p className="text-white/90 max-w-xl mx-auto">
                    Complete el formulario y adjunte su CV. Nuestro equipo de selección analizará su perfil para oportunidades que coincidan con su experiencia.
                </p>
             </div>

             <div className="p-8 md:p-12 bg-white dark:bg-slate-900 max-h-[60vh] overflow-y-auto custom-scrollbar">
                {status === 'success' ? (
                   <div className="text-center py-12">
                     <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-up">
                       <span className="material-symbols-outlined text-5xl">check_circle</span>
                     </div>
                     <h4 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">¡Perfil Recibido!</h4>
                     <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto mb-8 text-lg">
                        Gracias por confiar en Apax Management. Su información ha sido ingresada exitosamente a nuestra base de datos confidencial.
                     </p>
                     <button 
                       onClick={() => { setShowForm(false); setStatus('idle'); }}
                       className="px-8 py-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                     >
                       Volver al sitio
                     </button>
                   </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">
                                  Nombre Completo <span className="text-red-500">*</span>
                                </label>
                                <input name="nombre" type="text" required className={inputClasses} placeholder="Ej: Maria Gonzalez" disabled={status === 'submitting'} />
                            </div>
                             <div>
                                <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">
                                  Área de Interés <span className="text-red-500">*</span>
                                </label>
                                <select name="area" className={inputClasses} disabled={status === 'submitting'} required defaultValue="">
                                    <option value="" disabled>Seleccione un área...</option>
                                    <option value="IT & Tecnología">IT & Tecnología</option>
                                    <option value="Administración & Finanzas">Administración & Finanzas</option>
                                    <option value="Comercial & Marketing">Comercial & Marketing</option>
                                    <option value="Recursos Humanos">Recursos Humanos</option>
                                    <option value="Ingeniería & Operaciones">Ingeniería & Operaciones</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">
                                  Email de Contacto <span className="text-red-500">*</span>
                                </label>
                                <input name="email" type="email" required className={inputClasses} placeholder="ejemplo@email.com" disabled={status === 'submitting'} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Perfil de LinkedIn (URL)</label>
                                <input name="linkedin" type="url" className={inputClasses} placeholder="https://linkedin.com/in/..." disabled={status === 'submitting'} />
                            </div>
                        </div>

                         <div>
                            <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Breve Presentación</label>
                            <textarea name="mensaje" rows={3} className={inputClasses} placeholder="Cuéntenos brevemente qué tipo de desafío está buscando..." disabled={status === 'submitting'}></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">
                                Adjuntar CV <span className="text-red-500">*</span>
                            </label>
                            <div className="p-6 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-center relative group">
                                <input 
                                    type="file" 
                                    name="cv" 
                                    onChange={handleFileChange}
                                    accept=".pdf,.doc,.docx" 
                                    required 
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                                    disabled={status === 'submitting'}
                                />
                                <div className="flex flex-col items-center gap-2 group-hover:scale-105 transition-transform">
                                    <span className="material-symbols-outlined text-4xl text-primary dark:text-accent">cloud_upload</span>
                                    {fileName ? (
                                      <span className="font-bold text-primary dark:text-accent">{fileName}</span>
                                    ) : (
                                      <span className="font-bold text-slate-700 dark:text-white">Haga clic o arrastre su CV aquí</span>
                                    )}
                                    <span className="text-xs text-slate-500 uppercase font-bold tracking-wide">PDF, DOC, DOCX (Máx 5MB)</span>
                                </div>
                            </div>
                        </div>
                        
                         {status === 'error' && (
                            <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm font-bold text-center">
                                Hubo un error al enviar su postulación. Por favor intente nuevamente o escriba a cv@apaxmanagement.com
                            </div>
                        )}

                        <button 
                            type="submit" 
                            disabled={status === 'submitting'}
                            className="w-full btn-gradient text-white py-5 rounded-xl font-bold text-lg shadow-xl shadow-primary/20 hover:opacity-95 transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-wait"
                        >
                            {status === 'submitting' ? (
                                <>
                                    <span className="animate-spin material-symbols-outlined">progress_activity</span>
                                    Enviando...
                                </>
                            ) : (
                                <>
                                    Enviar
                                    <span className="material-symbols-outlined">send</span>
                                </>
                            )}
                        </button>
                        
                        <p className="text-center text-xs text-slate-400 mt-4">
                            Al enviar este formulario, acepta que Apax Management guarde sus datos para procesos de selección vigentes y futuros.
                        </p>
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