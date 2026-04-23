"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { OvestaLogo } from "@/components/OvestaLogo";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

const links = [
  { href: "/products", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

function cartCount(lines: { quantity: number }[]) {
  return lines.reduce((s, l) => s + l.quantity, 0);
}

export function Navbar() {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const { lines } = useCart();
  const [open, setOpen] = useState(false);
  const n = cartCount(lines);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <OvestaLogo className="flex items-center" />

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Main"
        >
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={
                  "rounded-md px-3 py-2 text-sm font-medium " +
                  (active
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900")
                }
              >
                {l.label}
              </Link>
            );
          })}
          {user && (
            <Link
              href="/partner"
              className={
                "rounded-md px-3 py-2 text-sm font-medium " +
                (pathname === "/partner"
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-600 hover:bg-slate-50")
              }
            >
              Partner
            </Link>
          )}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/cart"
            className="relative rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            aria-label={`Cart, ${n} items`}
          >
            Cart
            {n > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-cyan-600 px-1 text-xs text-white">
                {n > 9 ? "9+" : n}
              </span>
            )}
          </Link>
          {!loading &&
            (user ? (
              <div className="flex max-w-xs items-center gap-2">
                <Link
                  href="/dashboard"
                  className="truncate rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Account
                </Link>
                <span
                  className="hidden max-w-[10rem] truncate text-sm text-slate-500 lg:inline"
                  title={user.email}
                >
                  {user.email}
                </span>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700"
                >
                  Sign up
                </Link>
              </>
            ))}
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-slate-200 text-slate-800 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Open menu"
        >
          {open ? "×" : "≡"}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-slate-200 bg-white px-4 py-3 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-base text-slate-800"
              >
                {l.label}
              </Link>
            ))}
            {user && (
              <Link
                href="/partner"
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-base"
              >
                Partner
              </Link>
            )}
            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2 text-base"
            >
              Cart{n ? ` (${n})` : ""}
            </Link>
            {user ? (
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-base"
              >
                Account
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-md px-2 py-2 text-base"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="rounded-md px-2 py-2 text-base text-cyan-700"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
