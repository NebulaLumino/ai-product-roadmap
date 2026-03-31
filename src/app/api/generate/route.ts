import OpenAI from "openai";

export async function POST(req: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://api.deepseek.com/v1",
  });
  const { input } = await req.json();

  const completion = await openai.chat.completions.create({
    model: "deepseek-chat",
    messages: [
      {
        role: "system",
        content: "You are an expert startup and entrepreneurship AI assistant. Be concise, actionable, and professional. Generate a structured product roadmap. Include: prioritized feature backlog, quarterly release plan, swimlane roadmap view (now/next/later), effort vs impact matrix, and dependencies."
      },
      { role: "user", content: input }
    ],
    temperature: 0.7,
  });

  return Response.json({ result: completion.choices[0].message.content });
}
