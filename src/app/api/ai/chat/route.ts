import { NextResponse } from "next/server";
import OpenAI from "openai";
import { buildProductContextForAI } from "@/lib/ai/build-product-context";
import { getServerUser } from "@/lib/server-auth";

const defaultModel = "gpt-4o-mini";

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "AI assistant is not configured on this server." },
      { status: 503 }
    );
  }

  const u = await getServerUser();
  if (!u) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = (await request.json()) as { messages?: ChatMessage[] };
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { error: "messages array is required" },
      { status: 400 }
    );
  }

  const catalog = await buildProductContextForAI();
  const system: ChatMessage = {
    role: "system",
    content: `You are the Ovesta product assistant for a store focused on tablets and accessories. Be concise and helpful. Use only the catalog context as reference for what we carry. If asked about something outside the catalog, say you can help compare our listed items or they can use Contact for more.

Catalog context:
${catalog}`,
  };

  const model = process.env.OPENAI_MODEL || defaultModel;
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const completion = await openai.chat.completions.create({
      model,
      messages: [system, ...messages],
    });
    const text = completion.choices[0]?.message?.content ?? "";
    return NextResponse.json({ text });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Could not complete request." },
      { status: 500 }
    );
  }
}
