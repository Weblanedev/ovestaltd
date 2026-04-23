"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

type Props = { open: boolean; onClose: () => void };

/** Shown when the payment request fails; mimics a gateway response. */
const GATEWAY_FAILURE = {
  code: "PAY_2048",
  message:
    "The payment could not be completed. The transaction was not recorded. You can try again or return to the store to keep shopping. Your cart is unchanged.",
} as const;

const PROCESSING_MS = 50_000;

type Phase = "processing" | "error";

function ProcessingLoader() {
  return (
    <div
      className="mt-6 flex flex-col items-center justify-center gap-4 py-4"
      aria-busy
      aria-live="polite"
    >
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-200 border-t-cyan-600"
        role="status"
        aria-label="Connecting to gateway"
      />
      <p className="text-center text-slate-600">Connecting to gateway…</p>
    </div>
  );
}

export function PaymentModal({ open, onClose }: Props) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("processing");

  const runAttempt = useCallback(() => {
    setPhase("processing");
    return window.setTimeout(() => {
      setPhase("error");
    }, PROCESSING_MS);
  }, []);

  useEffect(() => {
    if (!open) {
      setPhase("processing");
      return;
    }
    const id = runAttempt();
    return () => clearTimeout(id);
  }, [open, runAttempt]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/50 p-4 sm:items-center"
      role="dialog"
      aria-modal
      aria-labelledby="pay-title"
    >
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white p-5 shadow-xl">
        <h2 id="pay-title" className="text-lg font-semibold text-slate-900">
          Complete payment
        </h2>
        {phase === "processing" && (
          <>
            <ProcessingLoader />
            <p className="mt-1 text-center text-xs text-slate-400">
              Connection can take up to a minute. Please keep this page open.
            </p>
            <button
              type="button"
              className="mt-4 w-full text-sm text-slate-500 hover:underline"
              onClick={onClose}
            >
              Cancel
            </button>
          </>
        )}
        {phase === "error" && (
          <div className="mt-4 space-y-4">
            <p className="text-sm font-medium text-rose-800" role="alert">
              Your payment was not successful.
            </p>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 font-mono text-sm">
              <p className="text-slate-500">
                <span className="text-slate-600">Error code</span>{" "}
                <span className="text-slate-900">{GATEWAY_FAILURE.code}</span>
              </p>
              <p className="mt-2 text-slate-800">{GATEWAY_FAILURE.message}</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                className="rounded-md bg-cyan-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-cyan-700"
                onClick={() => {
                  runAttempt();
                }}
              >
                Try again
              </button>
              <button
                type="button"
                className="rounded-md border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50"
                onClick={() => {
                  onClose();
                  router.push("/products");
                }}
              >
                Continue shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
