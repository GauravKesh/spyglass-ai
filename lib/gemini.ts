import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export const model =
  genAI.getGenerativeModel({
    model: "gemini-1.5-flash",

    generationConfig: {
      temperature: 0.7,
      responseMimeType:
        "application/json",
    },
  });

export async function generateJSON(
  prompt: string
) {
  try {
    const result =
      await model.generateContent(
        prompt
      );

    const text =
      result.response.text();

    return JSON.parse(text);
  } catch (error: any) {
    console.error(
      "Gemini Error:",
      error
    );

    if (
      error?.status === 429 ||
      error?.message?.includes(
        "quota"
      )
    ) {
      throw new Error(
        "Gemini quota exceeded. Try again later or upgrade billing."
      );
    }

    throw new Error(
      "Failed to generate AI response"
    );
  }
}