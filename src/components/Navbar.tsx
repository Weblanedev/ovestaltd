"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const n = cartCount(lines);

  const isHome = pathname === "/";
  const overlay = isHome && !scrolled;

  useEffect(() => {
    if (!isHome) {
      setScrolled(false);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const homeBar =
    "fixed top-0 left-0 right-0 z-50 " +
    (scrolled
      ? "border-b border-slate-200/90 bg-white/95 shadow-sm backdrop-blur"
      : "border-b border-white/10 bg-slate-950/40 backdrop-blur-md");
  const otherBar =
    "sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur";
  const headerClass = isHome ? homeBar : otherBar;

  const linkClass = (active: boolean) => {
    if (overlay) {
      return (
        "rounded-md px-3 py-2 text-sm font-medium " +
        (active
          ? "bg-white/20 text-white"
          : "text-white/90 hover:bg-white/10 hover:text-white")
      );
    }
    return (
      "rounded-md px-3 py-2 text-sm font-medium " +
      (active
        ? "bg-slate-100 text-slate-900"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900")
    );
  };

  const subLinkClass = overlay
    ? "text-white/90 hover:bg-white/10"
    : "text-slate-700 hover:bg-slate-50";

  return (
    <header className={headerClass}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <OvestaLogo
          className="flex items-center"
          variant={overlay ? "onDark" : "default"}
        />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link key={l.href} href={l.href} className={linkClass(active)}>
                {l.label}
              </Link>
            );
          })}
          {user && (
            <Link
              href="/sell"
              className={linkClass(pathname === "/sell")}
            >
              Sell to customers
            </Link>
          )}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/cart"
            className={`relative rounded-md px-3 py-2 text-sm font-medium ${subLinkClass}`}
            aria-label={`Cart, ${n} items`}
          >
            Cart
            {n > 0 && (
              <span
                className={
                  "absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs text-white " +
                  (overlay ? "bg-cyan-500" : "bg-cyan-600")
                }
              >
                {n > 9 ? "9+" : n}
              </span>
            )}
          </Link>
          {!loading &&
            (user ? (
              <div className="flex max-w-xs items-center gap-2">
                <Link
                  href="/dashboard"
                  className={`truncate rounded-md px-3 py-2 text-sm font-medium ${subLinkClass}`}
                >
                  Account
                </Link>
                <span
                  className={
                    "hidden max-w-[10rem] truncate text-sm lg:inline " +
                    (overlay ? "text-white/70" : "text-slate-500")
                  }
                  title={user.email}
                >
                  {user.email}
                </span>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`rounded-md px-3 py-2 text-sm font-medium ${subLinkClass}`}
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className={
                    "rounded-md px-3 py-2 text-sm font-semibold shadow-sm " +
                    (overlay
                      ? "bg-cyan-500 text-slate-900 hover:bg-cyan-400"
                      : "bg-cyan-600 text-white hover:bg-cyan-700")
                  }
                >
                  Sign up
                </Link>
              </>
            ))}
        </div>

        <button
          type="button"
          className={
            "inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border md:hidden " +
            (overlay
              ? "border-white/30 text-white"
              : "border-slate-200 text-slate-800")
          }
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
          className={
            "px-4 py-3 md:hidden " +
            (overlay
              ? "border-t border-white/10 bg-slate-950/90 backdrop-blur"
              : "border-t border-slate-200 bg-white")
          }
        >
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={
                  "rounded-md px-2 py-2 text-base " +
                  (overlay ? "text-white" : "text-slate-800")
                }
              >
                {l.label}
              </Link>
            ))}
            {user && (
              <Link
                href="/sell"
                onClick={() => setOpen(false)}
                className={
                  "rounded-md px-2 py-2 text-base " +
                  (overlay ? "text-white" : "text-slate-800")
                }
              >
                Sell to customers
              </Link>
            )}
            <Link
              href="/cart"
              onClick={() => setOpen(false)}
              className={
                "rounded-md px-2 py-2 text-base " +
                (overlay ? "text-white" : "text-slate-800")
              }
            >
              Cart{n ? ` (${n})` : ""}
            </Link>
            {user ? (
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className={
                  "rounded-md px-2 py-2 text-base " +
                  (overlay ? "text-white" : "text-slate-800")
                }
              >
                Account
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className={
                    "rounded-md px-2 py-2 text-base " +
                    (overlay ? "text-white" : "text-slate-800")
                  }
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className={
                    "rounded-md px-2 py-2 text-base " +
                    (overlay ? "text-cyan-300" : "text-cyan-700")
                  }
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
