
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    
    // Velocidad variable para simular pensamiento humano/computadora
    const intervalId = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 15); // 15ms por caracter

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
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleKeySelectionFlow = async () => {
    // @ts-ignore
    const hasKey = await window.aistudio.hasSelectedApiKey();
    if (!hasKey) {
      // @ts-ignore
      await window.aistudio.openSelectKey();
    }
  };

  const runAI = async () => {
    if (!prompt && !videoFile) {
      setResult("Por favor, describa su desafío o suba un video para comenzar el análisis.");
      return;
    }
    setLoading(true);
    setResult(null);
    setGeneratedImageUrl(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

      if (activeTab === 'think') {
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-preview',
          contents: prompt,
          config: {
            thinkingConfig: { thinkingBudget: 32768 }
          },
        });
        setResult(response.text || "Análisis completado sin respuesta textual.");
      } 
      else if (activeTab === 'image') {
        await handleKeySelectionFlow();
        const aiImage = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await aiImage.models.generateContent({
          model: 'gemini-3-pro-image-preview',
          contents: { parts: [{ text: prompt }] },
          config: {
            imageConfig: {
              aspectRatio: "1:1",
              imageSize: imageSize
            }
          },
        });
        
        const imagePart = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
        if (imagePart?.inlineData) {
          setGeneratedImageUrl(`data:image/png;base64,${imagePart.inlineData.data}`);
        } else {
          setResult("No se pudo generar la imagen. Por favor, asegúrese de que su prompt sea descriptivo.");
        }
      } 
      else if (activeTab === 'video') {
        if (!videoFile) {
          setResult("Por favor, seleccione un archivo de video para analizar.");
          setLoading(false);
          return;
        }

        const base64Video = await fileToBase64(videoFile);
        const response = await ai.models.generateContent({
          model: 'gemini-3-pro-preview',
          contents: {
            parts: [
              {
                inlineData: {
                  data: base64Video,
                  mimeType: videoFile.type
                }
              },
              { text: prompt || "Describe los puntos clave de este video para una estrategia de RRHH." }
            ]
          }
        });
        setResult(response.text || "Video analizado exitosamente.");
      }
    } catch (error: any) {
      console.error(error);
      if (error.message?.includes("entity was not found") || error.message?.includes("API key")) {
        setResult("Se requiere una API Key válida. Por favor, seleccione una llave de un proyecto con facturación activa.");
        // @ts-ignore
        await window.aistudio.openSelectKey();
      } else {
        setResult(`Error de conexión con la IA: ${error.message}. Verifique su conexión a internet.`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-lab" className="py-24 bg-purple-50 dark:bg-[#0f0520] text-slate-900 dark:text-white scroll-mt-20 transition-colors duration-300">
      <div className="max-w-[95%] 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-accent/20 border border-primary/20 dark:border-accent/30 text-primary dark:text-accent font-bold text-xs uppercase tracking-widest mb-6">
            <span className="material-symbols-outlined text-sm">science</span>
            Innovation Lab
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-black mb-6 italic text-slate-900 dark:text-white">
            <span className="gradient-text-magenta">Apax Strategic</span> Lab
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg">
            Potenciamos la consultoría de RRHH con inteligencia artificial avanzada. Experimente el análisis de nueva generación.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-white/10 overflow-hidden shadow-2xl transition-colors duration-300">
          <div className="flex border-b border-slate-100 dark:border-white/5 overflow-x-auto">
            <button 
              onClick={() => { setActiveTab('think'); setResult(null); setGeneratedImageUrl(null); }}
              className={`flex-1 px-8 py-6 font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all min-w-[200px] ${activeTab === 'think' ? 'bg-slate-50 dark:bg-white/5 text-primary dark:text-accent border-b-2 border-primary dark:border-accent' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              <span className="material-symbols-outlined">psychology</span>
              Thinking Mode
            </button>
            <button 
              onClick={() => { setActiveTab('video'); setResult(null); setGeneratedImageUrl(null); }}
              className={`flex-1 px-8 py-6 font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all min-w-[200px] ${activeTab === 'video' ? 'bg-slate-50 dark:bg-white/5 text-primary dark:text-accent border-b-2 border-primary dark:border-accent' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              <span className="material-symbols-outlined">video_library</span>
              Video Analysis
            </button>
            <button 
              onClick={() => { setActiveTab('image'); setResult(null); setGeneratedImageUrl(null); }}
              className={`flex-1 px-8 py-6 font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all min-w-[200px] ${activeTab === 'image' ? 'bg-slate-50 dark:bg-white/5 text-primary dark:text-accent border-b-2 border-primary dark:border-accent' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              <span className="material-symbols-outlined">image</span>
              Image Gen
            </button>
          </div>

          <div className="p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-primary dark:text-white">
                    {activeTab === 'think' && "Análisis Estratégico Profundo"}
                    {activeTab === 'video' && "Inteligencia de Video"}
                    {activeTab === 'image' && "Generación Visual Premium"}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {activeTab === 'think' && "Uso de Deep Thinking para resolver dilemas de cultura, retención y estructura organizacional compleja."}
                    {activeTab === 'video' && "Analice entrevistas de salida, capacitaciones o videos corporativos para detectar patrones invisibles."}
                    {activeTab === 'image' && "Cree activos visuales para employer branding usando Nano Banana Pro."}
                  </p>
                </div>

                <div className="space-y-4">
                  {activeTab === 'video' && (
                    <div className="p-6 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl bg-slate-50 dark:bg-slate-950/30 text-center hover:bg-slate-100 dark:hover:bg-slate-950/50 transition-colors">
                      <input 
                        type="file" 
                        accept="video/*" 
                        ref={fileInputRef} 
                        className="hidden" 
                        onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                      />
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="flex flex-col items-center gap-2 mx-auto"
                      >
                        <span className="material-symbols-outlined text-4xl text-primary dark:text-accent">upload_file</span>
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{videoFile ? videoFile.name : "Subir Video (.mp4)"}</span>
                      </button>
                    </div>
                  )}

                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={
                      activeTab === 'image' ? "Describa el concepto visual (ej: Oficina moderna con luz natural y equipo diverso)..." : 
                      activeTab === 'video' ? "¿Qué desea analizar en el video? (ej: Resumir puntos clave de cultura)..." :
                      "Describa su desafío organizacional para un análisis profundo..."
                    }
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-4 min-h-[120px] outline-none focus:ring-2 focus:ring-primary dark:focus:ring-accent transition-all text-slate-900 dark:text-white placeholder:text-slate-400 custom-scrollbar"
                  />
                  
                  {activeTab === 'image' && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Resolución:</span>
                        {(['1K', '2K', '4K'] as const).map(size => (
                          <button
                            key={size}
                            onClick={() => setImageSize(size)}
                            className={`px-4 py-1.5 rounded-full text-[10px] font-black transition-all border ${imageSize === size ? 'bg-primary dark:bg-accent border-primary dark:border-accent text-white' : 'border-slate-200 dark:border-white/10 text-slate-400 hover:border-primary dark:hover:border-white/30'}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                      <p className="text-[10px] text-slate-500 italic">
                        Nota: La generación de alta resolución requiere una <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline text-primary dark:text-accent">API Key de pago</a>.
                      </p>
                    </div>
                  )}

                  <button 
                    onClick={runAI}
                    disabled={loading}
                    className="w-full btn-gradient text-white py-5 rounded-xl font-bold text-lg shadow-xl shadow-primary/20 hover:opacity-95 transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    {loading ? (
                      <span className="animate-spin material-symbols-outlined">progress_activity</span>
                    ) : (
                      <>
                        Ejecutar IA Pro
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">bolt</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950/50 rounded-3xl border border-slate-100 dark:border-white/5 p-8 min-h-[350px] flex flex-col items-center justify-center text-center relative overflow-hidden transition-colors duration-300">
                {!result && !generatedImageUrl && !loading && (
                  <div className="space-y-4 opacity-20">
                    <span className="material-symbols-outlined text-7xl text-slate-400 dark:text-white">neurology</span>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-white">Esperando instrucciones</p>
                  </div>
                )}
                
                {loading && (
                  <div className="space-y-6">
                    <div className="relative w-16 h-16 mx-auto">
                      <div className="absolute inset-0 border-2 border-primary/20 dark:border-accent/20 rounded-full"></div>
                      <div className="absolute inset-0 border-2 border-primary dark:border-accent border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-primary dark:text-accent font-black uppercase text-xs tracking-tighter animate-pulse">
                        {activeTab === 'think' ? "Deep Thinking en progreso..." : "Procesando con Gemini 3 Pro..."}
                      </p>
                      <p className="text-[10px] text-slate-500">Esto puede tomar unos segundos debido a la complejidad del análisis.</p>
                    </div>
                  </div>
                )}

                {result && (
                  <div className="w-full text-left overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                    <div className="flex items-center gap-2 text-primary dark:text-accent mb-4">
                      <span className="material-symbols-outlined text-sm">auto_awesome</span>
                      <span className="font-black text-[10px] uppercase tracking-widest">Strategic Insight</span>
                    </div>
                    {/* Using the new TypewriterText Component */}
                    <TypewriterText text={result} />
                  </div>
                )}

                {generatedImageUrl && (
                  <div className="w-full space-y-4">
                    <img src={generatedImageUrl} alt="Generated Asset" className="w-full rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10" />
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] text-slate-500 font-bold uppercase">Calidad: {imageSize}</span>
                       <a 
                        href={generatedImageUrl} 
                        download={`apax-gen-${Date.now()}.png`}
                        className="inline-flex items-center gap-2 text-[10px] font-black text-primary dark:text-accent hover:underline uppercase tracking-widest"
                      >
                        <span className="material-symbols-outlined text-sm">download</span>
                        Descargar Arte
                      </a>
                    </div>
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
