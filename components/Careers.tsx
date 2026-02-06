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
    <section id="talento" className="py-16 bg-white dark:bg-slate-950 scroll-mt-20" style={{ fontFamily: '"Inter", sans-serif' }}>
      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4">
        
        {/* BANNER PRINCIPAL CON DISEÑO ORIGINAL */}
        <div className="bg-gradient-to-br from-[#0a008a] via-[#7b2cbf] to-[#9d4edd] rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden shadow-[0_20px_50px_rgba(10,0,138,0.3)] border border-white/20">
          
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-[100px]"></div>

          <div className="relative z-10 max-w-2xl text-center md:text-left">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[11px] font-black uppercase tracking-[0.3em] mb-8 backdrop-blur-md">
                Talento Apax
             </div>
             
             <h3 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight italic">
               ¿Buscas tu próximo <br />
               <span className="text-purple-200">desafío profesional?</span>
             </h3>
             
             <p className="text-blue-50 text-xl md:text-2xl leading-relaxed opacity-90 font-medium max-w-xl">
               Somos el nexo estratégico entre tu potencial y las empresas líderes. Envianos tu CV.
             </p>
          </div>

          <div className="relative z-10">
            <button 
              onClick={() => setShowForm(true)}
              className="px-12 py-6 bg-white text-[#0a008a] font-[900] rounded-2xl transition-all hover:scale-105 hover:shadow-2xl border-none cursor-pointer uppercase tracking-tighter text-lg shadow-xl"
            >
              Cargar mi CV
            </button>
          </div>
        </div>
      </div>

      {/* MODAL DEL FORMULARIO */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10">
            <div className="bg-[#0a008a] p-8 text-white flex justify-between items-center">
              <h3 className="text-2xl font-bold">Postulación</h3>
              <button onClick={() => {setShowForm(false); setStatus('idle');}} className="material-symbols-outlined scale-150">close</button>
            </div>
            
            <div className="p-10">
              {status === 'success' ? (
                <div className="text-center py-10">
                  <span className="material-symbols-outlined text-7xl text-green-500 mb-4">check_circle</span>
                  <h4 className="text-3xl font-bold">¡Recibido!</h4>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <input name="nombre" placeholder="Nombre completo" required className="w-full p-5 bg-slate-100 dark:bg-slate-800 rounded-2xl dark:text-white border-none text-lg" />
                  <input name="email" type="email" placeholder="Email" required className="w-full p-5 bg-slate-100 dark:bg-slate-800 rounded-2xl dark:text-white border-none text-lg" />
                  <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 p-10 rounded-2xl text-center bg-slate-50 dark:bg-slate-800/50">
                    <input type="file" name="cv" required className="w-full text-sm dark:text-white" />
                  </div>
                  <button type="submit" disabled={status === 'submitting'} className="w-full bg-[#0a008a] text-white py-5 rounded-2xl font-black text-xl hover:bg-[#7b2cbf] transition-all">
                    {status === 'submitting' ? "ENVIANDO..." : "ENVIAR"}
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
