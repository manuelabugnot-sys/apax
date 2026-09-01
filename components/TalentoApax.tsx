import React, { useState, useRef } from 'react';

interface TalentFormData {
  fullName: string;
  email: string;
  phone: string;
  area: string;
  seniority: string;
  workMode: string;
  linkedin: string;
  portfolioOrCvLink: string;
  message: string;
  fileName?: string;
}

const areasOptions = [
  'Tecnología & IT / Desarrollo',
  'Recursos Humanos & People',
  'Finanzas, Contabilidad & Legales',
  'Comercial, Ventas & Business Development',
  'Marketing, Growth & Comunicación',
  'Operaciones, Logística & Supply Chain',
  'Management & C-Level / Dirección',
  'Otra especialidad'
];

const seniorityOptions = [
  'Junior (0-2 años)',
  'Semi-Senior (2-5 años)',
  'Senior (+5 años)',
  'Líder Técnico / Coordinador',
  'Gerencia / Dirección'
];

const workModeOptions = [
  'Indistinto / Abierto a propuestas',
  '100% Remoto',
  'Híbrido',
  'Presencial'
];

const TalentoApax: React.FC = () => {
  const [formData, setFormData] = useState<TalentFormData>({
    fullName: '',
    email: '',
    phone: '',
    area: '',
    seniority: '',
    workMode: 'Indistinto / Abierto a propuestas',
    linkedin: '',
    portfolioOrCvLink: '',
    message: '',
    fileName: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const inputClasses = "w-full bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 outline-none transition-all duration-300 placeholder:text-slate-400 text-slate-900 dark:text-white focus:border-primary dark:focus:border-accent focus:ring-4 focus:ring-primary/10 dark:focus:ring-accent/10 shadow-sm text-sm sm:text-base";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFormData(prev => ({ ...prev, fileName: file.name }));
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setFormData(prev => ({ ...prev, fileName: file.name }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Usamos formsubmit.co con AJAX dirigido a cv@apaxmanagement.com
      const response = await fetch("https://formsubmit.co/ajax/cv@apaxmanagement.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `Nuevo Candidato - Talento Apax: ${formData.fullName} (${formData.area || 'General'})`,
          nombre_completo: formData.fullName,
          email: formData.email,
          telefono: formData.phone,
          area_especialidad: formData.area,
          seniority: formData.seniority,
          modalidad_preferida: formData.workMode,
          perfil_linkedin: formData.linkedin,
          enlace_cv_drive: formData.portfolioOrCvLink || 'No especificado',
          archivo_adjuntado: selectedFile ? selectedFile.name : 'No adjuntó archivo directo',
          mensaje_presentacion: formData.message,
          _template: "table",
          _captcha: "false"
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          area: '',
          seniority: '',
          workMode: 'Indistinto / Abierto a propuestas',
          linkedin: '',
          portfolioOrCvLink: '',
          message: '',
          fileName: ''
        });
        setSelectedFile(null);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Error al enviar postulación", error);
      setStatus('error');
    }
  };

  return (
    <section id="talento-apax" className="py-24 bg-white dark:bg-slate-900 scroll-mt-20 relative overflow-hidden">
      {/* Background soft ambient shapes */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-accent/5 dark:bg-accent/10 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header de la Sección */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary/10 text-primary dark:bg-accent/20 dark:text-violet-300 mb-4 border border-primary/20 dark:border-accent/30">
            <span className="material-symbols-outlined text-sm">groups</span>
            Base de Profesionales & Búsquedas Activas
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-primary dark:text-white tracking-tight mb-5">
            Talento Apax
          </h2>
          
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Sumate a nuestra red estratégica de talentos. Conectamos a profesionales destacados con oportunidades laborales que potencian su crecimiento profesional.
          </p>
        </div>

        {/* Grid de 2 Columnas: Beneficios para el Candidato + Formulario */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Columna Izquierda: Información y Propuesta de Valor (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 dark:text-white">
                ¿Por qué registrar tu perfil en Apax?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                Trabajamos con empresas líderes de Argentina y la región que buscan constantemente perfiles calificados para posiciones estratégicas.
              </p>
            </div>

            {/* Tarjetas de Beneficios */}
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700/60 shadow-sm flex items-start gap-4 hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary dark:text-violet-300 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl">work</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">Búsquedas Exclusivas</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
                    Accedé a procesos de selección que no siempre se publican de forma abierta.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700/60 shadow-sm flex items-start gap-4 hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#9d4edd]/10 dark:bg-[#9d4edd]/20 text-[#9d4edd] dark:text-violet-300 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl">handshake</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">Acompañamiento Humano</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
                    Feedback constructivo, comunicación transparente y respeto por tu tiempo en cada instancia.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700/60 shadow-sm flex items-start gap-4 hover:border-primary/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl">lock</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base">Confidencialidad Garantizada</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1">
                    Tu información profesional se gestiona bajo los más estrictos estándares de privacidad.
                  </p>
                </div>
              </div>
            </div>

            {/* Banner de acceso directo a Empleabilidad */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-transparent border border-primary/20 dark:border-accent/30">
              <div className="flex items-center gap-2 text-primary dark:text-violet-300 font-bold text-sm mb-2">
                <span className="material-symbols-outlined text-lg">auto_awesome</span>
                ¿Querés optimizar tu perfil antes?
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4">
                Conocé nuestro Programa Estratégico de Empleabilidad para perfeccionar tu CV, optimizar LinkedIn y simular entrevistas reales.
              </p>
              <a
                href="#empleabilidad"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary dark:text-accent hover:underline"
              >
                Ver Programa de Empleabilidad
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </div>

          {/* Columna Derecha: Formulario de Postulación de Talento (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 dark:bg-slate-800/90 p-6 sm:p-10 rounded-[2rem] border border-slate-200/80 dark:border-slate-700 shadow-xl relative overflow-hidden">
              
              <div className="mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-primary dark:text-white mb-2">
                  Cargar Perfil y CV
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Completá tus datos para ingresar a nuestra base de talentos. Te contactaremos cuando se abra una búsqueda afín a tu perfil.
                </p>
              </div>

              {status === 'success' ? (
                <div className="text-center py-12 animate-fade-in-up">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <span className="material-symbols-outlined text-4xl">check_circle</span>
                  </div>
                  <h4 className="text-2xl font-bold text-primary dark:text-white mb-3">
                    ¡CV Recibido con Éxito!
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-md mx-auto mb-8">
                    Tu información ha sido ingresada a nuestra base de datos de Talento Apax. Nuestro equipo de selección revisará tu perfil ante búsquedas vigentes y futuras.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-8 py-3 rounded-full bg-primary hover:bg-navy text-white font-bold transition-colors cursor-pointer text-sm shadow-md"
                  >
                    Cargar otro perfil
                  </button>
                </div>
              ) : (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  
                  {/* Nombre y Teléfono */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                        Nombre y Apellido *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        placeholder="Ej: Sofia Morales"
                        className={inputClasses}
                        disabled={status === 'submitting'}
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="Ej: +54 9 11 ..."
                        className={inputClasses}
                        disabled={status === 'submitting'}
                      />
                    </div>
                  </div>

                  {/* Correo Electrónico y LinkedIn */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="tuemail@ejemplo.com"
                        className={inputClasses}
                        disabled={status === 'submitting'}
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                        Perfil de LinkedIn
                      </label>
                      <input
                        type="url"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/tu-perfil"
                        className={inputClasses}
                        disabled={status === 'submitting'}
                      />
                    </div>
                  </div>

                  {/* Área y Seniority */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                        Área de Especialidad *
                      </label>
                      <select
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        required
                        className={`${inputClasses} cursor-pointer`}
                        disabled={status === 'submitting'}
                      >
                        <option value="">Seleccioná un área...</option>
                        {areasOptions.map((area, idx) => (
                          <option key={idx} value={area} className="text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800">
                            {area}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                        Nivel de Experiencia / Seniority *
                      </label>
                      <select
                        name="seniority"
                        value={formData.seniority}
                        onChange={handleChange}
                        required
                        className={`${inputClasses} cursor-pointer`}
                        disabled={status === 'submitting'}
                      >
                        <option value="">Seleccioná tu nivel...</option>
                        {seniorityOptions.map((sen, idx) => (
                          <option key={idx} value={sen} className="text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800">
                            {sen}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Modalidad de Interés y Enlace CV / Drive */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                        Modalidad de Trabajo Preferida
                      </label>
                      <select
                        name="workMode"
                        value={formData.workMode}
                        onChange={handleChange}
                        className={`${inputClasses} cursor-pointer`}
                        disabled={status === 'submitting'}
                      >
                        {workModeOptions.map((mode, idx) => (
                          <option key={idx} value={mode} className="text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800">
                            {mode}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                        Enlace a CV Online / Google Drive (Opcional)
                      </label>
                      <input
                        type="url"
                        name="portfolioOrCvLink"
                        value={formData.portfolioOrCvLink}
                        onChange={handleChange}
                        placeholder="https://drive.google.com/..."
                        className={inputClasses}
                        disabled={status === 'submitting'}
                      />
                    </div>
                  </div>

                  {/* Carga de Archivo CV (Drag & Drop + Selector) */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                      Adjuntar CV (PDF, DOCX)
                    </label>
                    <div
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all duration-200 ${
                        dragActive
                          ? 'border-primary bg-primary/5 dark:bg-primary/10'
                          : selectedFile
                          ? 'border-emerald-500/50 bg-emerald-50/50 dark:bg-emerald-950/20'
                          : 'border-slate-300 dark:border-slate-700 hover:border-primary/50 bg-white dark:bg-slate-900/50'
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={status === 'submitting'}
                      />
                      
                      {selectedFile ? (
                        <div className="flex items-center justify-center gap-3 text-emerald-600 dark:text-emerald-400">
                          <span className="material-symbols-outlined text-2xl">description</span>
                          <div className="text-left">
                            <p className="text-xs sm:text-sm font-bold truncate max-w-xs">{selectedFile.name}</p>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">
                              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • Clic para cambiar archivo
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-1.5 text-slate-500 dark:text-slate-400">
                          <span className="material-symbols-outlined text-3xl text-primary/70 dark:text-accent">
                            upload_file
                          </span>
                          <p className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                            Arrastrá tu CV aquí o <span className="text-primary dark:text-accent underline">hacé clic para examinar</span>
                          </p>
                          <p className="text-[11px] text-slate-400">Formatos permitidos: PDF, DOC, DOCX (Hasta 10MB)</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Mensaje / Presentación Breve */}
                  <div>
                    <label className="block text-xs sm:text-sm font-bold mb-1.5 text-slate-700 dark:text-slate-300">
                      Carta de Presentación / Mensaje Breve (Opcional)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Contanos brevemente qué tipo de desafíos buscás o cuál es tu principal diferencial..."
                      className={inputClasses}
                      disabled={status === 'submitting'}
                    ></textarea>
                  </div>

                  {/* Error Notification */}
                  {status === 'error' && (
                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 text-xs sm:text-sm font-medium flex items-center gap-2">
                      <span className="material-symbols-outlined text-lg shrink-0">error</span>
                      Hubo un problema al procesar el envío. Por favor reintentá o contactanos por WhatsApp.
                    </div>
                  )}

                  {/* Botón Submit */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full btn-gradient text-white py-4 rounded-xl font-bold text-base sm:text-lg shadow-xl shadow-primary/20 hover:opacity-95 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait cursor-pointer"
                  >
                    {status === 'submitting' ? (
                      <>
                        <span className="animate-spin material-symbols-outlined text-xl">progress_activity</span>
                        Registrando perfil en Apax...
                      </>
                    ) : (
                      <>
                        <span>Postular mi Perfil a Talento Apax</span>
                        <span className="material-symbols-outlined text-xl">send</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-slate-400 dark:text-slate-500">
                    Al enviar tu postulación aceptás que Apax Management almacene tu perfil para futuros procesos de selección.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TalentoApax;
