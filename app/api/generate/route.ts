import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const input = body?.input?.trim();

    if (!input) {
      return NextResponse.json(
        { error: "Please enter a movie preference first." },
        { status: 400 }
      );
    }

    const prompt = `
You are a reliable AI movie recommendation assistant.

The user will describe the type of movie they want.

Your task:
- Recommend exactly 3 main movies
- For each movie, explain in 1 short sentence why it matches
- Then give 2 extra optional picks

Rules:
- Recommend real, well-known movies only. Do NOT invent movie names.
- Keep the tone simple and helpful.
- Do NOT repeat any movie names.
- All movie recommendations must be UNIQUE.
- Do NOT include the same movie in both main picks and extra picks.
- If the user provides multiple genres or moods, combine them intelligently.
- Try to balance all requested genres in the recommendations.
- If genres conflict, choose movies that best blend them.
- If the input is vague, meaningless, or too short, do not guess.
- Ask the user to provide a clearer genre, mood, or example movie.
- If the request is unclear, return empty arrays for "bullets" and "extras".

Return valid JSON only in this exact format:

{
  "title": "Movie Recommendations",
  "mainOutput": "A short sentence about the overall recommendation result.",
  "bullets": [
    "Movie 1 - reason",
    "Movie 2 - reason",
    "Movie 3 - reason"
  ],
  "extras": [
    "Extra movie 1",
    "Extra movie 2"
  ]
}

User request: ${input}
    `.trim();

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const raw = response.text ?? "";

    let parsed: any;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        { error: "The model returned invalid JSON." },
        { status: 500 }
      );
    }

    // Small safe cleanup only
    parsed.bullets = Array.isArray(parsed.bullets) ? parsed.bullets : [];
    parsed.extras = Array.isArray(parsed.extras) ? parsed.extras : [];

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Gemini route error:", error);
    return NextResponse.json(
      { error: "Something went wrong while generating recommendations." },
      { status: 500 }
    );
  }
}