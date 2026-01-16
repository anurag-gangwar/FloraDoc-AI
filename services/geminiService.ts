
import { GoogleGenAI, Type } from "@google/genai";
import { PlantAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzePlantImage = async (base64Image: string): Promise<PlantAnalysis> => {
  const model = 'gemini-3-flash-preview';
  
  const prompt = `Analyze this plant image. 
  1. Identify the plant species.
  2. Determine if it is healthy or diseased.
  3. If diseased, identify the disease and provide treatment steps.
  4. Provide long-term preventive care tips.
  Return the analysis in structured JSON format.`;

  const response = await ai.models.generateContent({
    model,
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
        { text: prompt }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          plantName: { type: Type.STRING, description: "Common name of the plant identified" },
          healthStatus: { type: Type.STRING, enum: ["Healthy", "Disease Detected", "Warning"] },
          diseaseName: { type: Type.STRING, description: "Scientific or common name of the disease" },
          confidence: { type: Type.NUMBER, description: "Confidence level between 0 and 1" },
          description: { type: Type.STRING, description: "Short description of the plant's current state" },
          treatmentSteps: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "List of actionable steps to treat the plant"
          },
          preventiveTips: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "List of tips to prevent future issues"
          },
          severity: { type: Type.STRING, enum: ["Low", "Medium", "High", "None"] }
        },
        required: ["plantName", "healthStatus", "description", "treatmentSteps", "preventiveTips", "severity"]
      }
    }
  });

  const result = JSON.parse(response.text);
  
  return {
    ...result,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    imageUrl: `data:image/jpeg;base64,${base64Image}`
  };
};
