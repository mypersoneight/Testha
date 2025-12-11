import { GoogleGenAI } from "@google/genai";

export const generateInspirationalMessage = async (): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      // In a real scenario, this would likely be handled by a global error handler or configuration check.
      // For this demo, we'll throw an error that the UI can catch.
      console.warn("API Key is missing. Please ensure process.env.API_KEY is set.");
      throw new Error("API configuration missing");
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // We use gemini-2.5-flash for fast, efficient text generation suitable for this task.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Generate a short, unique, uplifting, and slightly poetic inspirational message or fortune cookie style wisdom. Keep it under 30 words. Do not use quotes in the output.',
      config: {
        temperature: 1.2, // Slightly higher creativity
        topK: 40,
        maxOutputTokens: 100,
      }
    });

    return response.text?.trim() || "The universe is vast, and you are a brilliant part of it.";
  } catch (error) {
    console.error("Gemini Service Error:", error);
    throw error;
  }
};