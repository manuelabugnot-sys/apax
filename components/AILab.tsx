import React, { useState, useRef, useEffect } from 'react';
// Cambiamos el import al nombre oficial que instalamos en el package.json
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
      // Usamos el nombre correcto de la clase: GoogleGenerativeAI
      const genAI = new GoogleGenerativeAI(process.env.API_KEY || "");
      const modelName = activeTab === 'image' ? 'gemini-1.5-flash' : 'gemini-1.5-pro';
      const model = genAI.getGenerativeModel({ model: modelName });

      if (activeTab === 'think') {
        const response = await model.generateContent(prompt);
        setResult(response.response.text() || "Análisis completado sin respuesta textual.");
      } 
      else if (activeTab === 'image') {
        setResult("La generación de imágenes requiere configuración de Vertex AI. Use el modo Thinking para análisis estratégico.");
      } 
      else if (activeTab === 'video') {
        if (!videoFile) {
          setResult("Por favor, seleccione un archivo de video para analizar.");
          setLoading(false);
          return;
        }

        const base64Video = await fileToBase64(videoFile);
        const response = await model.generateContent([
          {
            inlineData: {
              data: base64Video,
              mimeType: videoFile.type
            }
          },
          { text: prompt || "Describe los puntos clave de este video para una estrategia de RRHH." }
        ]);
        setResult(response.response.text() || "Video analizado exitosamente.");
      }
    } catch (error: any) {
      console.error(error);
      setResult(`Error de conexión con la IA: ${error.message}`);
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
          <h2 className="text-4xl md:text-5xl font-display font-black mb-6 italic text-slate-90
