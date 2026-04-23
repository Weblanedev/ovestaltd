"use client";

import Link from "next/link";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useChatWidget } from "@/context/ChatWidgetContext";
import { useAuth } from "@/context/AuthContext";

type Msg = { role: "user" | "reply"; text: string };

export function StoreHelpPanel() {
  const { open, setOpen } = useChatWidget();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  if (!user || !open) return null;

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setInput("");
    setSending(true);
    const next: Msg[] = [...messages, { role: "user", text }];
    setMessages(next);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({
            role: m.role === "reply" ? "assistant" : "user",
            content: m.text,
          })),
        }),
      });
      const d = (await r.json()) as { text?: string; error?: string };
      if (!r.ok) {
        setMessages((m) => [
          ...m,
          {
            role: "reply",
            text: d.error ?? "Something went wrong. Try again or use Contact.",
          },
        ]);
        return;
      }
      setMessages((m) => [...m, { role: "reply", text: d.text ?? "" }]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "reply",
          text: "Network error. Check your connection or use Contact.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className="fixed bottom-0 right-0 z-[70] w-full max-w-md p-4"
      style={{ maxHeight: "min(80vh, 600px)" }}
    >
      <div className="flex max-h-[80vh] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2">
          <h2 className="text-sm font-semibold text-slate-900">Store help</h2>
          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="text-sm text-cyan-700 hover:underline"
            >
              Contact
            </Link>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-slate-500 hover:text-slate-800"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto px-3 py-3 text-sm">
          {messages.length === 0 && (
            <p className="text-slate-500">
              Ask about tablets, accessories, or your order. Replies are based
              on our public catalog. For anything else, use Contact.
            </p>
          )}
          {messages.map((m, i) => (
            <div
              key={i}
              className={
                m.role === "user"
                  ? "ml-6 rounded-md bg-cyan-50 p-2 text-slate-900"
                  : "mr-6 rounded-md bg-slate-50 p-2 text-slate-800 [&_a]:text-cyan-800"
              }
            >
              {m.role === "reply" ? (
                <div className="prose prose-sm prose-slate max-w-none">
                  <ReactMarkdown>{m.text}</ReactMarkdown>
                </div>
              ) : (
                m.text
              )}
            </div>
          ))}
        </div>
        <div className="border-t border-slate-200 p-2">
          <div className="flex gap-2">
            <input
              className="text-base min-h-12 flex-1 rounded-md border border-slate-200 px-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send();
                }
              }}
              placeholder="Ask a question"
              disabled={sending}
              aria-label="Message"
            />
            <button
              type="button"
              onClick={() => void send()}
              disabled={sending}
              className="rounded-md bg-cyan-600 px-3 text-sm font-semibold text-white disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
