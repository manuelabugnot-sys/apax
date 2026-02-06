import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    const intervalId = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 15);
    return () => clearInterval(intervalId);
  }, [text]);

  return (
    <div className="prose prose-sm max-w-none text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap font-sans transition-colors duration-300">
      {displayedText}
      <span className="inline-block w-2 h-4 ml-1 bg-primary dark:bg-accent animate-pulse align-middle"></span>
    </div>
  );
};

const AILab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'video' | 'think'>('think');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const runAI = async () => {
    if (!prompt && !videoFile) {
      setResult("Por favor, describa su desafío o suba un video.");
      return;
    }
    setLoading(true);
    setResult(null);

    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      if (activeTab === 'think') {
        const response = await model.generateContent(prompt);
        setResult(response.response.text());
      } else if (activeTab === 'video' && videoFile) {
        const base64Video = await fileToBase64(videoFile);
        const response = await model.generateContent([
          { inlineData: { data: base64Video, mimeType: videoFile.type } },
          { text: prompt || "Analiza este video para RRHH." }
        ]);
        setResult(response.response.text());
      }
    } catch (error: any) {
      setResult(`Error de conexión: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-lab" className="py-24 bg-purple-50 dark:bg-[#0f0520] text-slate-900 dark:text-white scroll-mt-20 transition-colors duration-300">
      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-accent/20 border border-primary/20 dark:border-accent/30 text-primary dark:text-accent font-bold text-xs uppercase tracking-widest mb-6">
            <span className="material-symbols-outlined text-sm">science</span>
            Innovation Lab
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-black mb-6 italic">
            <span className="gradient-text-magenta">Apax Strategic</span> Lab
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg">
            Potenciamos la consultoría de RRHH con inteligencia artificial avanzada.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-white/10 overflow-hidden shadow-2xl">
          <div className="flex border-b border-slate-100 dark:border-white/5 overflow-x-auto">
            <button 
              onClick={() => setActiveTab('think')} 
              className={`flex-1 px-8 py-6 font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${activeTab === 'think' ? 'bg-slate-50 dark:bg-white/5 text-primary dark:text-accent border-b-2 border-primary' : 'text-slate-500'}`}
            >
              <span className="material-symbols-outlined">psychology</span>
              Thinking Mode
            </button>
            <button 
              onClick={() => setActiveTab('video')} 
              className={`flex-1 px-8 py-6 font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${activeTab === 'video' ? 'bg-slate-50 dark:bg-white/5 text-primary dark:text-accent border-b-2 border-primary' : 'text-slate-500'}`}
            >
              <span className="material-symbols-outlined">video_library</span>
              Video Analysis
            </button>
          </div>

          <div className="p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describa su desafío organizacional..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 min-h-[150px] outline-none focus:ring-2 focus:ring-primary text-slate-900 dark:text-white transition-all"
                />
                
                {activeTab === 'video' && (
                  <div className="p-6 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl bg-slate-50 dark:bg-slate-950/30 text-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <input type="file" accept="video/*" ref={fileInputRef} className="hidden" onChange={(e) => setVideoFile(e.target.files?.[0] || null)} />
                    <span className="material-symbols-outlined text-4xl text-primary dark:text-accent mb-2">upload_file</span>
                    <p className="text-sm font-bold">{videoFile ? videoFile.name : "Subir Video (.mp4)"}</p>
                  </div>
                )}

                <button 
                  onClick={runAI} 
                  disabled={loading} 
                  className="w-full btn-gradient text-white py-5 rounded-xl font-bold text-lg shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="animate-spin material-symbols-outlined">progress_activity</span>
                  ) : (
                    <>Ejecutar IA Pro <span className="material-symbols-outlined">bolt</span></>
                  )}
                </button>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950/50 rounded-3xl border border-slate-100 dark:border-white/5 p-8 min-h-[300px] flex items-center justify-center text-center">
                {result ? (
                  <div className="text-left w-full">
                     <TypewriterText text={result} />
                  </div>
                ) : (
                  <div className="space-y-4 opacity-20 italic">
                    <span className="material-symbols-outlined text-6xl">neurology</span>
                    <p className="text-xs font-bold uppercase">Esperando instrucciones</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AILab;
