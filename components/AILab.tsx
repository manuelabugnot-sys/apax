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
  const [activeTab, setActiveTab] = useState<'video' | 'think' | 'image'>('think');
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
      setResult("Por favor, describa su desafío.");
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
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-lab" className="py-24 bg-purple-50 dark:bg-[#0f0520] text-slate-900 dark:text-white transition-colors duration-300">
      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-black mb-6 italic">
            <span className="text-primary dark:text-accent">Apax Strategic</span> Lab
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg">
            Potenciamos la consultoría de RRHH con inteligencia artificial avanzada.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-white/10 overflow-hidden shadow-2xl">
          <div className="flex border-b border-slate-100 dark:border-white/5">
            <button onClick={() => setActiveTab('think')} className={`flex-1 px-8 py-6 font-bold ${activeTab === 'think' ? 'text-primary border-b-2 border-primary' : 'text-slate-500'}`}>Thinking Mode</button>
            <button onClick={() => setActiveTab('video')} className={`flex-1 px-8 py-6 font-bold ${activeTab === 'video' ? 'text-primary border-b-2 border-primary' : 'text-slate-500'}`}>Video Analysis</button>
          </div>

          <div className="p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Escriba su consulta..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border rounded-2xl px-6 py-4 min-h-[150px] text-slate-900 dark:text-white"
                />
                {activeTab === 'video' && (
                  <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files?.[0] || null)} className="block w-full text-sm text-slate-500" />
                )}
                <button onClick={runAI} disabled={loading} className="w-full bg-primary text-white py-5 rounded-xl font-bold hover:opacity-90 transition-all">
                  {loading ? "Procesando..." : "Ejecutar IA Pro"}
                </button>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950/50 rounded-3xl p-8 min-h-[300px] flex items-center justify-center">
                {result ? <TypewriterText text={result} /> : <p className="opacity-30 uppercase font-bold text-xs">Esperando análisis...</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AILab;
