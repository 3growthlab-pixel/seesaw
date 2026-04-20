
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const analyzeUserVibe = async (imageDataBase64: string) => {
  if (!API_KEY) {
    console.error("API Key is missing");
    return "분석 실패 (API Key 없음)";
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: imageDataBase64,
            },
          },
          {
            text: "이 청년의 이미지(또는 분위기)를 분석해서 어떤 성향의 사람인지 짧게 한 문장으로 한국어로 설명해줘. 예를 들어 '열정적인 아웃도어파 취준생' 또는 '차분한 자기계발형 대학생' 처럼. 반드시 한 문장으로 답변해줘."
          }
        ]
      },
    });

    return response.text || "활동적인 청년";
  } catch (error) {
    console.error("Analysis Error:", error);
    return "호기심 많은 청년";
  }
};
