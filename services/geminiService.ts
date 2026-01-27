
import { GoogleGenAI } from "@google/genai";

export const getGeminiResponse = async (prompt: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: "Eres el Asistente IA de Apax Management, una consultora de Recursos Humanos de élite. Tu objetivo es ayudar a los usuarios a entender cómo la gestión estratégica del talento, el liderazgo y la IA pueden transformar sus organizaciones. Sé profesional, empático, analítico y visionario. Mantén respuestas concisas pero de alto impacto.",
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Estoy experimentando dificultades técnicas. Por favor, intente nuevamente en unos instantes.";
  }
};
