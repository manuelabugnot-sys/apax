import React, { useState } from 'react';

const Careers: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const response = await fetch("https://formsubmit.co/cv@apaxmanagement.com", {
        method: "POST",
        body: new FormData(e.currentTarget),
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) { setStatus('success'); } else { setStatus('error'); }
    } catch { setStatus('error'); }
  };

  return (
    <section id="talento" className="py-20 bg-slate-50 dark:bg-slate-950 scroll-mt-20">
      <div className="max-w-[95%] mx-auto px-4">
        <div className="bg-[#0a008a] rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden shadow-2xl border border-white/10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]"></div>
          
          <div className="text-center md:text-left relative z-10 max-w-2xl">
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 italic">
              Talento <span className="text-purple-300">Apax</span>
            </h3>
            <p className="text-blue-100 text-lg mb-8 opacity-90">
              ¿Buscas tu próximo desafío? Envianos tu CV para formar parte de nuestra red estratégica de profesionales.
            </p>
            <button onClick={() => setShowForm(true)} className="px-10 py-5 bg-white text-[#0a008a] font-black rounded-2xl hover:scale-105 transition-all shadow-xl">
              CARGAR MI CV
            </button>
          </div>
          <span className="material-symbols-outlined text-[150px] text-white/10 hidden lg:block">person_search</span>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl">
            <div className="bg-[#0a008a] p-6 text-white flex justify-between items-center">
              <h3 className="font-bold">Enviar CV</h3>
              <button onClick={() => setShowForm(false)}><span className="material-symbols-outlined">close</span></button>
            </div>
            <div className="p-8">
              {status === 'success' ? (
                <div className="text-center py-6 text-green-600 font-bold">¡Recibido con éxito!</div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input name="nombre" placeholder="Nombre completo" required className="w-full p-4 bg-slate-100 dark:bg-slate-800 rounded-xl dark:text-white" />
                  <input name="email" type="email" placeholder="Email" required className="w-full p-4 bg-slate-100 dark:bg-slate-800 rounded-xl dark:text-white" />
                  <input type="file" name="cv" required className="w-full p-4 border-2 border-dashed rounded-xl dark:text-white" />
                  <button type="submit" disabled={status === 'submitting'} className="w-full bg-[#0a008a] text-white py-4 rounded-xl font-bold">
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
