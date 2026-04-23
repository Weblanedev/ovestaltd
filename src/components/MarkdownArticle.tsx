"use client";

import ReactMarkdown from "react-markdown";

export function MarkdownArticle({ source }: { source: string }) {
  return (
    <div className="prose prose-slate max-w-none prose-headings:font-display prose-a:text-cyan-700">
      <ReactMarkdown>{source}</ReactMarkdown>
    </div>
  );
}
