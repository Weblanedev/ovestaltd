"use client";

import { usePathname, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { useChatWidget } from "@/context/ChatWidgetContext";

export function ChatUsButton() {
  const { user } = useAuth();
  const { toggle } = useChatWidget();
  const pathname = usePathname();
  const search = useSearchParams();
  const next =
    `/login?next=` +
    encodeURIComponent(
      (pathname ?? "/") + (search?.toString() ? `?${search.toString()}` : "")
    );

  return (
    <div className="pointer-events-auto fixed bottom-5 right-5 z-[60] max-w-full">
      <button
        type="button"
        onClick={() => {
          if (!user) {
            toast("Log in to use live chat and contact options.");
            window.location.assign(next);
            return;
          }
          toggle();
        }}
        className="min-h-12 min-w-[3rem] rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-lg ring-1 ring-cyan-800/20 hover:bg-cyan-500"
        aria-label="Live chat"
      >
        Live chat
      </button>
    </div>
  );
}
