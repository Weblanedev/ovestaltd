"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

type Ctx = { open: boolean; setOpen: (v: boolean) => void; toggle: () => void };

const ChatWidgetContext = createContext<Ctx | null>(null);

export function ChatWidgetProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((o) => !o), []);
  return (
    <ChatWidgetContext.Provider value={{ open, setOpen, toggle }}>
      {children}
    </ChatWidgetContext.Provider>
  );
}

export function useChatWidget() {
  const v = useContext(ChatWidgetContext);
  if (!v) {
    throw new Error("useChatWidget must be used within ChatWidgetProvider");
  }
  return v;
}
