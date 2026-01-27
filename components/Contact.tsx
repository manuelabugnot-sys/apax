
import React, { useState } from 'react';

const Contact: React.FC = () => {
  // Enhanced input classes with focus scale and border transition
  const inputClasses = "w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none transition-all duration-300 placeholder:text-slate-400 text-slate-900 dark:text-white focus:scale-[1.02] focus:border-primary dark:focus:border-accent focus:ring-4 focus:ring-primary/10 dark:focus:ring-accent/10 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed";

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      // Utilizamos FormSubmit.co vinculado al nuevo correo corporativo
      const response = await fetch("https://formsubmit.co/ajax/hola@apaxmanagement.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `Nueva Consulta Web: ${formData.name} - ${formData.company}`,
          nombre: formData.name,
          empresa: formData.company,
          email: formData.email,
          mensaje: formData.message,
          _template: "table",
          _captcha: "false"
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', company: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Error al enviar formulario", error);
      setStatus('error');
    }
  };

  return (
    <section id="contacto" className="py-24 bg-slate-50 dark:bg-slate-900/50 scroll-mt-20">
      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <div>
            <div className="mb-8">
              <h2 className="text-4xl md:text-6xl font-display font-bold text-primary dark:text-white tracking-tight mb-6">Contacto</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                ¿Desea transformar su estrategia de talento? Nuestro equipo está listo para escuchar sus desafíos y diseñar una solución de impacto.
              </p>
            </div>
            
            <div className="space-y-8 mt-10">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-[#25d366]/10 flex items-center justify-center text-[#25d366] shrink-0 transition-transform group-hover:scale-110">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l121.7-31.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-primary dark:text-white">Escríbanos</h4>
                  <p className="text-slate-600 dark:text-slate-400">Atención vía WhatsApp</p>
                  <a className="text-[#25d366] font-bold text-xl hover:underline block mt-1 transition-all" href="https://wa.me/5491156023106" target="_blank" rel="noopener noreferrer">Contactar ahora</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-primary dark:text-white">Email Corporativo</h4>
                  <a className="text-accent font-bold text-lg hover:underline block mt-1 transition-all" href="mailto:hola@apaxmanagement.com">hola@apaxmanagement.com</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg text-primary dark:text-white">Nuestras Oficinas</h4>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">Palermo, Ciudad Autónoma de Buenos Aires</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-8 lg:p-12 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl relative overflow-hidden h-full min-h-[500px] flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16"></div>
            
            {status === 'success' ? (
              <div className="text-center animate-fade-in-up">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-4xl">check</span>
                </div>
                <h3 className="text-2xl font-bold text-primary dark:text-white mb-2">¡Mensaje Enviado!</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                  Gracias por contactarnos. Hemos recibido su información correctamente en nuestro sistema y nos pondremos en contacto a la brevedad.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-white font-bold hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Nombre</label>
                    <input 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClasses} 
                      placeholder="Juan Pérez" 
                      required 
                      type="text"
                      disabled={status === 'submitting'} 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Empresa</label>
                    <input 
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={inputClasses} 
                      placeholder="Nombre de su empresa" 
                      required 
                      type="text"
                      disabled={status === 'submitting'} 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Correo Electrónico</label>
                  <input 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClasses} 
                    placeholder="ejemplo@empresa.com" 
                    required 
                    type="email"
                    disabled={status === 'submitting'} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 text-slate-700 dark:text-slate-300">Mensaje</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={inputClasses} 
                    placeholder="¿Cómo podemos potenciar su equipo?" 
                    required 
                    rows={4}
                    disabled={status === 'submitting'}
                  ></textarea>
                </div>

                {status === 'error' && (
                  <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">error</span>
                    Hubo un error al enviar. Por favor intente nuevamente.
                  </div>
                )}

                <button 
                  className="w-full btn-gradient text-white py-5 rounded-xl font-bold text-lg shadow-xl shadow-primary/20 hover:opacity-95 transition-all transform active:scale-[0.98] mt-4 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait" 
                  type="submit"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? (
                    <>
                      <span className="animate-spin material-symbols-outlined">progress_activity</span>
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Mensaje
                      <span className="material-symbols-outlined">send</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
