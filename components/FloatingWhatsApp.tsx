import React, { useState } from 'react';
import { useCountryWhatsApp } from '../hooks/useCountryWhatsApp';

const FloatingWhatsApp: React.FC = () => {
  const { country, activeContact, contacts, setCountry, getUrl } = useCountryWhatsApp();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      {/* Popover selector de país y chat */}
      {showMenu && (
        <div 
          className="mb-3 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-4 animate-scale-up text-slate-900 dark:text-white"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#25d366] animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Atención Inmediata
              </span>
            </div>
            <button 
              onClick={() => setShowMenu(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold p-1"
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 mb-3">
            Selecciona la sede con la que deseas comunicarte:
          </p>

          <div className="space-y-2">
            {/* Opción México */}
            <a
              href={`https://wa.me/${contacts.MX.waNumber}?text=${encodeURIComponent(contacts.MX.defaultMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setCountry('MX')}
              className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                country === 'MX'
                  ? 'bg-primary/10 dark:bg-primary/20 border-primary/40 text-primary dark:text-white font-bold'
                  : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl">🇲🇽</span>
                <div className="text-left">
                  <div className="text-xs font-bold flex items-center gap-1.5">
                    México
                    {country === 'MX' && (
                      <span className="text-[10px] bg-[#25d366]/20 text-[#128c7e] dark:text-[#25d366] px-1.5 py-0.5 rounded font-bold">
                        Tu ubicación
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {contacts.MX.displayNumber}
                  </div>
                </div>
              </div>
              <span className="material-symbols-outlined text-sm text-[#25d366]">open_in_new</span>
            </a>

            {/* Opción Argentina */}
            <a
              href={`https://wa.me/${contacts.AR.waNumber}?text=${encodeURIComponent(contacts.AR.defaultMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setCountry('AR')}
              className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                country === 'AR'
                  ? 'bg-primary/10 dark:bg-primary/20 border-primary/40 text-primary dark:text-white font-bold'
                  : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl">🇦🇷</span>
                <div className="text-left">
                  <div className="text-xs font-bold flex items-center gap-1.5">
                    Argentina
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    {contacts.AR.displayNumber}
                  </div>
                </div>
              </div>
              <span className="material-symbols-outlined text-sm text-[#25d366]">open_in_new</span>
            </a>
          </div>
        </div>
      )}

      {/* Botón flotante principal */}
      <div className="relative flex items-center">
        {/* Tooltip informativo al pasar el cursor */}
        <div className="hidden sm:flex items-center gap-2 absolute right-full mr-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white px-3.5 py-2 rounded-2xl text-xs font-bold shadow-xl whitespace-nowrap pointer-events-auto">
          <span className="text-base">{activeContact.flag}</span>
          <span className="text-slate-700 dark:text-slate-200">
            WhatsApp {activeContact.countryName}
          </span>
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className="text-[11px] text-primary dark:text-accent underline font-semibold ml-1 cursor-pointer hover:opacity-80"
          >
            {country === 'MX' ? '¿O Argentina?' : '¿O México?'}
          </button>
        </div>

        {/* Botón Verde de WhatsApp con badge de bandera */}
        <div className="relative">
          <a 
            className="w-16 h-16 bg-[#25d366] hover:bg-[#20bd5a] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group cursor-pointer" 
            href={getUrl()} 
            target="_blank" 
            rel="noopener noreferrer"
            title={`Contactar vía WhatsApp (${activeContact.countryName})`}
          >
            <svg className="w-9 h-9 fill-current" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l121.7-31.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
            </svg>
          </a>

          {/* Mini badge con la bandera de la sede detectada */}
          <button
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            title="Cambiar sede (México / Argentina)"
            className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border-2 border-[#25d366] flex items-center justify-center text-xs shadow-md hover:scale-125 transition-transform cursor-pointer"
          >
            <span>{activeContact.flag}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingWhatsApp;
