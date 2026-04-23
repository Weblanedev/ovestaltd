"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export function Newsletter() {
  const [email, setEmail] = useState("");

  return (
    <section className="mt-20 border-t border-slate-200 py-12">
      <div className="mx-auto max-w-3xl rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50 to-white px-6 py-8 text-center shadow-sm sm:px-8">
        <h2 className="font-display text-2xl font-bold text-slate-900">
          Stay in the loop
        </h2>
        <p className="mt-2 text-slate-600">
          Product tips and stock alerts. Unsubscribe any time from emails we
          send.
        </p>
        <form
          className="mt-6 flex max-w-md flex-col gap-2 sm:mx-auto sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            if (!email.trim()) {
              toast.error("Enter a valid email.");
              return;
            }
            toast.success("Thanks. You are on the list.");
            setEmail("");
          }}
        >
          <input
            type="email"
            className="text-base w-full min-h-12 rounded-md border border-slate-200 px-3 text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-200"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            aria-label="Email"
          />
          <button
            type="submit"
            className="min-h-12 rounded-md bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Notify me
          </button>
        </form>
      </div>
    </section>
  );
}
