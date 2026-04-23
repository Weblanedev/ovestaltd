"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PaymentModal } from "@/components/PaymentModal";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { formatUsd, SHIPPING_FLAT } from "@/lib/pricing";
import { checkoutSchema, type CheckoutValues } from "@/lib/validations";

export function CheckoutClient() {
  const { user, refresh } = useAuth();
  const { lines, subtotal } = useCart();
  const [showPay, setShowPay] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CheckoutValues>({
    resolver: yupResolver(checkoutSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        phone: user.profile?.phone,
        line1: user.profile?.line1,
        line2: user.profile?.line2,
        city: user.profile?.city,
        region: user.profile?.region,
        postal: user.profile?.postal,
        country: user.profile?.country,
      });
    }
  }, [user, reset]);

  const ship = lines.length > 0 ? SHIPPING_FLAT : 0;
  const total = subtotal + ship;

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-12 text-center sm:px-6">
        <p className="text-slate-600">Your cart is empty.</p>
        <Link
          className="mt-4 inline-block text-cyan-800 underline"
          href="/products"
        >
          View products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
      <form
        className="grid gap-8 lg:grid-cols-2"
        onSubmit={handleSubmit(async (v) => {
          const r = await fetch("/api/user/profile", {
            method: "PATCH",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: v.name,
              profile: {
                phone: v.phone,
                line1: v.line1,
                line2: v.line2,
                city: v.city,
                region: v.region,
                postal: v.postal,
                country: v.country,
              },
            }),
          });
          if (!r.ok) {
            toast.error("Could not save profile");
            return;
          }
          await refresh();
          toast.success("Profile updated for this order step.");
          setShowPay(true);
        })}
      >
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-500">Shipping</h2>
          <div>
            <label className="text-sm" htmlFor="c-name">
              Full name
            </label>
            <input
              id="c-name"
              className="text-base mt-1 w-full min-h-12 rounded border border-slate-200 px-3"
              {...register("name")}
            />
          </div>
          <div>
            <label className="text-sm" htmlFor="c-phone">
              Phone
            </label>
            <input
              id="c-phone"
              className="text-base mt-1 w-full min-h-12 rounded border border-slate-200 px-3"
              {...register("phone")}
            />
          </div>
          <div>
            <label className="text-sm" htmlFor="c-line1">
              Address line 1
            </label>
            <input
              id="c-line1"
              className="text-base mt-1 w-full min-h-12 rounded border border-slate-200 px-3"
              {...register("line1")}
            />
          </div>
          <div>
            <label className="text-sm" htmlFor="c-line2">
              Line 2
            </label>
            <input
              id="c-line2"
              className="text-base mt-1 w-full min-h-12 rounded border border-slate-200 px-3"
              {...register("line2")}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-sm" htmlFor="c-city">
                City
              </label>
              <input
                id="c-city"
                className="text-base mt-1 w-full min-h-12 rounded border border-slate-200 px-3"
                {...register("city")}
              />
            </div>
            <div>
              <label className="text-sm" htmlFor="c-region">
                State / region
              </label>
              <input
                id="c-region"
                className="text-base mt-1 w-full min-h-12 rounded border border-slate-200 px-3"
                {...register("region")}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-sm" htmlFor="c-postal">
                Postal
              </label>
              <input
                id="c-postal"
                className="text-base mt-1 w-full min-h-12 rounded border border-slate-200 px-3"
                {...register("postal")}
              />
            </div>
            <div>
              <label className="text-sm" htmlFor="c-country">
                Country
              </label>
              <input
                id="c-country"
                className="text-base mt-1 w-full min-h-12 rounded border border-slate-200 px-3"
                {...register("country")}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full min-h-12 rounded bg-cyan-600 text-sm font-semibold text-white disabled:opacity-50"
          >
            {isSubmitting ? "Saving…" : "Save and continue to payment"}
          </button>
        </div>
        <div className="h-fit rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h2 className="text-sm font-semibold text-slate-500">Summary</h2>
          <ul className="mt-2 text-sm text-slate-800">
            {lines.map((l) => (
              <li
                key={l.sku}
                className="flex justify-between gap-2 border-b border-slate-200 py-1"
              >
                <span className="line-clamp-1">
                  {l.name} × {l.quantity}
                </span>
                <span className="flex-shrink-0">
                  {formatUsd(l.unitPrice * l.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-3 space-y-1 text-sm">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>{formatUsd(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Shipping</dt>
              <dd>{formatUsd(ship)}</dd>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-1 font-semibold">
              <dt>Total</dt>
              <dd>{formatUsd(total)}</dd>
            </div>
          </dl>
        </div>
      </form>
      <PaymentModal open={showPay} onClose={() => setShowPay(false)} />
    </div>
  );
}
