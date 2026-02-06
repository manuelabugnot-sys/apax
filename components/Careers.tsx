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
    <section id="talento" className="py-16 bg-white dark:bg-slate-950 scroll-mt-20">
      <div className="max-w-[95%] 2xl:max-w-screen-xl mx-auto px-4">
        
        {/* BANNER REPLICADO DE LA IMAGEN OBJETIVO */}
        <div className="bg-gradient-to-r from-[#3100a3] via-[#7b2cbf] to-[#9d4edd] rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden shadow-2xl">
          
          <div className="relative z-10 max-w-3xl text-left">
             {/* Badge Superior */}
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[11px] font-bold uppercase tracking-widest mb-6">
                <span className="material-symbols-outlined text-sm">groups</span>
                TALENTO APAX
             </div>
             
             {/* Título - Fuente moderna y grosor exacto */}
             <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight" style={{ fontFamily: '"Inter", sans-serif' }}>
               ¿Buscas tu próximo desafío profesional?
             </h3>
             
             {/* Texto descriptivo largo como en la imagen */}
             <p className="text-white/80 text-lg md:text-xl leading-relaxed font-normal max-w-2xl">
               Somos el nexo estratégico entre tu potencial y las empresas líderes del mercado. Envianos tu CV para formar parte de nuestra base de talentos y participar de futuras búsquedas.
             </p>
          </div>

          <div className="relative z-10 shrink-0">
            {/* Botón con icono como en la imagen */}
            <button 
              onClick={() => setShowForm(true)}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-[#0a008a] font-bold rounded-2xl transition-all hover:scale-105 shadow-xl text-lg"
            >
              <span>Cargar mi CV</span>
              <span className="material-symbols-outlined text-[#7b2cbf] font-bold">upload_file</span>
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10">
            <div className="bg-[#3100a3] p-6 text-white flex justify-between items-center">
              <h3 className="text-lg font-bold">Enviar mi CV</h3>
              <button onClick={() => {setShowForm(false); setStatus('idle');}} className="material-symbols-outlined">close</button>
            </div>
            
            <div className="p-8">
              {status === 'success' ? (
                <div className="text-center py-6 text-green-600 font-bold text-xl">¡Recibido con éxito!</div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input name="nombre" placeholder="Nombre completo" required className="w-full p-4 bg-slate-100 dark:bg-slate-800 rounded-xl border-none" />
                  <input name="email" type="email" placeholder="Email" required className="w-full p-4 bg-slate-100 dark:bg-slate-800 rounded-xl border-none" />
                  <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 p-6 rounded-xl text-center">
                    <input type="file" name="cv" required className="w-full text-sm dark:text-white" />
                  </div>
                  <button type="submit" disabled={status === 'submitting'} className="w-full bg-[#3100a3] text-white py-4 rounded-xl font-bold hover:opacity-90">
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
