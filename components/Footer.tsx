
import React, { useState } from 'react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('submitting');
    try {
      const response = await fetch("https://formsubmit.co/ajax/hola@apaxmanagement.com.ar", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: "Nueva suscripción al Newsletter - Web Apax",
          email: email,
          _template: "box",
          _captcha: "false"
        })
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Error newsletter:", error);
      setStatus('error');
    }
  };

  return (
    <footer className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white pt-20 pb-12 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mb-16">
          
          {/* Columna 1: Logo e Identidad */}
          <div className="space-y-6">
            <div className="h-48 animate-float">
              <img 
                src="logo-color.png" 
                className="h-full w-auto object-contain block dark:hidden drop-shadow-lg" 
                alt="Apax Management"
                onError={(e) => {(e.target as HTMLImageElement).src = 'logo.png'}}
              />
              <img 
                src="logo.png" 
                className="h-full w-auto object-contain hidden dark:block drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]" 
                alt="Apax Management"
              />
            </div>
            
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-manrope">
              Potenciamos el talento de su organización mediante consultoría estratégica y un enfoque profundamente humano. Especialistas en soluciones integrales de Talento.
            </p>
            
            <div className="flex items-center">
              <a 
                href="https://www.linkedin.com/company/apax-management/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-accent/10 flex items-center justify-center text-primary dark:text-accent group-hover:bg-primary group-hover:text-white transition-all">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-primary dark:group-hover:text-accent transition-colors">
                  Apax Management
                </span>
              </a>
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div className="lg:pl-8">
            <h4 className="text-sm font-black uppercase tracking-widest mb-8 text-primary dark:text-accent border-b-2 border-primary/10 dark:border-accent/10 pb-2 inline-block">Navegación</h4>
            <ul className="space-y-4">
              <li><a href="#inicio" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors text-sm font-bold">Inicio</a></li>
              <li><a href="#quienes-somos" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors text-sm font-bold">Quiénes somos</a></li>
              <li><a href="#servicios" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors text-sm font-bold">Servicios</a></li>
              <li><a href="#equipo" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors text-sm font-bold">Nuestro equipo</a></li>
              <li><a href="#ai-lab" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors text-sm font-bold">Innovation Lab</a></li>
              <li><a href="#contacto" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors text-sm font-bold">Contacto</a></li>
            </ul>
          </div>

          {/* Columna 3: Newsletter */}
          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl border border-slate-100 dark:border-white/5 h-fit">
            <h4 className="text-sm font-black uppercase tracking-widest mb-4 text-primary dark:text-accent">Newsletter</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              Suscríbase para recibir tendencias de talento directo en su correo.
            </p>
            {status === 'success' ? (
              <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl text-xs font-bold animate-fade-in text-center">
                ¡Gracias por suscribirse!
              </div>
            ) : (
              <form className="space-y-3" onSubmit={handleNewsletterSubmit}>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary text-lg">mail</span>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Su email" 
                    disabled={status === 'submitting'}
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary outline-none transition-all dark:text-white disabled:opacity-50"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full btn-gradient text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                >
                  {status === 'submitting' ? 'Uniéndose...' : 'Unirse'}
                  <span className="material-symbols-outlined text-sm">send</span>
                </button>
                {status === 'error' && (
                  <p className="text-[10px] text-red-500 mt-2 text-center font-bold">Error al procesar. Reintente.</p>
                )}
              </form>
            )}
          </div>

        </div>

        <div className="pt-10 border-t border-slate-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} APAX MANAGEMENT. TODOS LOS DERECHOS RESERVADOS.
          </p>
          <div className="flex gap-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
            <span>Buenos Aires | Global Talent</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
