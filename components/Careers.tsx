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
      <div className="max-w-[95%] mx-auto px-4">
        {/* DEGRADADO ORIGINAL RECUPERADO */}
        <div className="bg-gradient-to-br from-[#0a008a] via-[#7b2cbf] to-[#9d4edd] rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          
          <div className="relative z-10 max-w-2xl text-center md:text-left">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 italic">
              ¿Buscas tu próximo desafío profesional?
            </h3>
            <p className="text-blue-50 text-lg opacity-90 mb-6">
              Somos el nexo estratégico entre tu potencial y las empresas líderes. Envianos tu CV.
            </p>
            <button onClick={() => setShowForm(true)} className="px-10 py-5 bg-white text-[#0a008a] font-black rounded-2xl hover:scale-105 transition-all shadow-xl">
              CARGAR MI CV
            </button>
          </div>
          <span className="material-symbols-outlined text-[120px] text-white/10 hidden lg:block relative z-10">person_search</span>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden">
            <div className="bg-gradient-to-r from-[#0a008a] to-[#7b2cbf] p-6 text-white flex justify-between items-center">
              <h3 className="font-bold">Únete a Talento Apax</h3>
              <button onClick={() => {setShowForm(false); setStatus('idle');}} className="material-symbols-outlined">close</button>
            </div>
            <div className="p-8">
              {status === 'success' ? (
                <div className="text-center py-6 text-green-600 font-bold">¡CV recibido con éxito!</div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input name="nombre" placeholder="Nombre completo" required className="w-full p-4 bg-slate-100 dark:bg-slate-800 rounded-xl dark:text-white border-none" />
                  <input name="email" type="email" placeholder="Email" required className="w-full p-4 bg-slate-100 dark:bg-slate-800 rounded-xl dark:text-white border-none" />
                  <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 p-6 rounded-xl text-center">
                    <input type="file" name="cv" required className="w-full text-sm dark:text-white" />
                  </div>
                  <button type="submit" disabled={status === 'submitting'} className="w-full bg-[#0a008a] text-white py-4 rounded-xl font-bold hover:bg-[#7b2cbf] transition-all">
                    {status === 'submitting' ? "Enviando..." : "Enviar Postulación"}
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
