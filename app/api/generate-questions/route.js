import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
    });

   const prompt = `
      Generate 20 sample interview questions for a software developer.
      Include:
      - Technical questions
      - HR questions
      Return only questions (no numbering).
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const questions = text
      .split("\n")
      .filter((q) => q.trim() !== "");

    return Response.json({ questions });

  } catch (error) {
    return Response.json({ error: "Error generating questions" });
  }
}