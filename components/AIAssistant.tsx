
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: '¡Hola! Soy el asistente virtual de Apax Management. ¿En qué puedo ayudarle hoy con su estrategia de talento?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: messages.concat({ role: 'user', text: userMessage }).map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          systemInstruction: "Eres el Concierge Digital de Apax Management. Tu tono es extremadamente profesional, elegante y experto en RRHH. Conoces los servicios de Apax: Reclutamiento de Excelencia, Gestión del Talento, Consultoría Estratégica e Innovation Lab. Tu objetivo es convertir consultas en oportunidades de negocio, invitando siempre a agendar una consultoría. Sé conciso.",
          temperature: 0.7,
        }
      });

      const reply = response.text || "Lo siento, no pude procesar su solicitud. ¿Podría reformularla?";
      setMessages(prev => [...prev, { role: 'model', text: reply }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Estamos experimentando alta demanda. Por favor, contacte a un especialista vía WhatsApp para atención inmediata." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-32 right-10 z-[60]">
      {/* Chat Window */}
      <div className={`absolute bottom-20 right-0 w-80 md:w-96 bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-white/10 overflow-hidden transition-all duration-500 transform ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'}`}>
        <div className="bg-gradient-to-r from-primary to-magenta p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
              <span className="material-symbols-outlined">smart_toy</span>
            </div>
            <div>
              <p className="font-display font-bold text-sm">Apax Concierge</p>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-80">En línea</p>
              </div>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-full transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div ref={scrollRef} className="h-80 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-slate-50 dark:bg-slate-900/50">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 shadow-sm rounded-tl-none border border-slate-100 dark:border-white/5'}`}>
                {m.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-100 dark:border-white/5 flex gap-1">
                <span className="w-1.5 h-1.5 bg-primary/40 dark:bg-accent/40 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-primary/40 dark:bg-accent/40 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-primary/40 dark:bg-accent/40 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-white/5 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pregunte sobre nuestros servicios..."
            className="flex-1 bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary dark:focus:ring-accent outline-none text-slate-900 dark:text-white"
          />
          <button type="submit" className="w-12 h-12 btn-gradient text-white rounded-xl flex items-center justify-center shadow-lg active:scale-90 transition-transform disabled:opacity-50" disabled={isTyping}>
            <span className="material-symbols-outlined text-xl">send</span>
          </button>
        </form>
      </div>

      {/* Floating Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 btn-gradient text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 relative group"
      >
        <span className="material-symbols-outlined text-3xl">{isOpen ? 'close' : 'forum'}</span>
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-magenta rounded-full border-2 border-white dark:border-slate-950 animate-bounce"></span>
        )}
        <span className="absolute right-full mr-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 translate-x-4 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all whitespace-nowrap border border-slate-100 dark:border-slate-700">
          Asistente IA Apax
        </span>
      </button>
    </div>
  );
};

export default AIAssistant;
