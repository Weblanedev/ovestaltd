import { NextResponse } from "next/server";
import OpenAI from "openai";
import { buildCatalogContextForChat } from "@/lib/store-chat/build-catalog-context";
import { getServerUser } from "@/lib/server-auth";

const defaultModel = "gpt-4o-mini";

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "Store help is not available on this server right now." },
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

  const catalog = await buildCatalogContextForChat();
  const system: ChatMessage = {
    role: "system",
    content: `You are Ovesta Store help: concise, professional answers about our tech products. Use only the catalog context below. If something is not listed, direct the customer to Contact for more.

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
