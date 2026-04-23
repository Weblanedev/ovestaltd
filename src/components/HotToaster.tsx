"use client";

import { Toaster } from "react-hot-toast";

export function HotToaster() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        className: "text-sm",
        style: { background: "#0f172a", color: "#f8fafc" },
      }}
    />
  );
}
