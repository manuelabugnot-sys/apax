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
    <section id="talento" className="py-12 bg-white dark:bg-slate-950">
      <div className="max-w-[95%] 2xl:max-w-screen-xl mx-auto px-4 lg:px-10">
        <div className="bg-gradient-to-r from-[#3100a3] via-[#7b2cbf] to-[#9d4edd] rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-xl border border-white/10">
          <div className="relative z-10 max-w-2xl text-left">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-[9px] font-bold uppercase tracking-widest mb-5">TALENTO APAX</div>
             <h3 className="text-2xl md:text-[2.6rem] font-bold text-white mb-4 leading-[1.15]">¿Buscas tu próximo desafío profesional?</h3>
             <p className="text-white/85 text-base md:text-[1.05rem] leading-relaxed max-w-xl">Somos el nexo estratégico entre tu potencial y las empresas líderes del mercado. Envianos tu CV para participar de futuras búsquedas.</p>
          </div>
          <div className="relative z-10 shrink-0">
            <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-[#0a008a] font-bold rounded-xl hover:scale-105 transition-all shadow-lg text-[15px]">
              <span>Cargar mi CV</span>
              <span className="material-symbols-outlined text-[#7b2cbf] font-bold text-[20px]">upload_file</span>
            </button>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl">
            <div className="bg-[#3100a3] p-5 text-white flex justify-between items-center font-bold">
              <span>Enviar mi CV</span>
              <button onClick={() => {setShowForm(false); setStatus('idle');}} className="material-symbols-outlined">close</button>
            </div>
            <div className="p-7">
              {status === 'success' ? ( <div className="text-center py-6 text-green-600 font-bold">¡Enviado con éxito!</div> ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input name="nombre" placeholder="Nombre completo" required className="w-full p-3.5 bg-slate-100 dark:bg-slate-800 rounded-xl outline-none" />
                  <input name="email" type="email" placeholder="Email" required className="w-full p-3.5 bg-slate-100 dark:bg-slate-800 rounded-xl outline-none" />
                  <input type="file" name="cv" required className="w-full text-xs p-4 border-2 border-dashed rounded-xl" />
                  <button type="submit" disabled={status === 'submitting'} className="w-full bg-[#3100a3] text-white py-4 rounded-xl font-bold">{status === 'submitting' ? "Enviando..." : "Enviar Postulación"}</button>
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
