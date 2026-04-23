"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { formatUsd, SHIPPING_FLAT } from "@/lib/pricing";

export function CartView() {
  const { lines, setQty, remove, subtotal } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const ship = lines.length > 0 ? SHIPPING_FLAT : 0;
  const total = subtotal + ship;

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
        <h1 className="font-display text-2xl font-bold text-slate-900">
          Your cart is empty
        </h1>
        <p className="mt-2 text-slate-600">Browse products to get started.</p>
        <Link
          href="/products"
          className="mt-6 inline-flex rounded-md bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-cyan-700"
        >
          View products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-slate-900">Cart</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {lines.map((l) => (
            <div
              key={l.sku}
              className="flex gap-3 rounded-lg border border-slate-200 bg-white p-3"
            >
              <div className="relative h-20 w-24 flex-shrink-0">
                <Image
                  src={l.image}
                  alt=""
                  fill
                  className="object-contain"
                  sizes="120px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-slate-900 line-clamp-2">
                  {l.name}
                </p>
                <p className="text-sm text-slate-600">{formatUsd(l.unitPrice)}</p>
                <div className="mt-2 flex items-center gap-2">
                  <label className="text-sm text-slate-500" htmlFor={`q-${l.sku}`}>
                    Qty
                  </label>
                  <input
                    id={`q-${l.sku}`}
                    type="number"
                    min={1}
                    className="text-base w-20 rounded border border-slate-200 px-2 py-1"
                    value={l.quantity}
                    onChange={(e) => {
                      const n = parseInt(e.target.value, 10);
                      if (!Number.isNaN(n)) setQty(l.sku, n);
                    }}
                  />
                  <button
                    type="button"
                    className="text-sm text-rose-700 hover:underline"
                    onClick={() => remove(l.sku)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-fit rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-sm font-semibold text-slate-500">Order summary</h2>
          <dl className="mt-3 space-y-1 text-sm">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>{formatUsd(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Shipping (flat)</dt>
              <dd>{formatUsd(ship)}</dd>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-semibold text-slate-900">
              <dt>Total</dt>
              <dd>{formatUsd(total)}</dd>
            </div>
          </dl>
          {user ? (
            <Link
              href="/checkout"
              className="mt-4 block w-full rounded-md bg-cyan-600 py-2.5 text-center text-sm font-semibold text-white hover:bg-cyan-700"
            >
              Checkout
            </Link>
          ) : (
            <button
              type="button"
              className="mt-4 w-full rounded-md bg-slate-900 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              onClick={() =>
                router.push(
                  "/login?next=" + encodeURIComponent("/checkout")
                )
              }
            >
              Log in to checkout
            </button>
          )}
          <p className="mt-2 text-xs text-slate-500">Checkout requires an account. No guest checkout in this demo.</p>
        </div>
      </div>
    </div>
  );
}
