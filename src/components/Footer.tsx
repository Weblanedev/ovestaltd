"use client";

import Link from "next/link";
import { OvestaLogo } from "@/components/OvestaLogo";
import { contactInfo } from "@/lib/contact-info";
import { useAuth } from "@/context/AuthContext";

export function Footer() {
  const { user } = useAuth();
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <OvestaLogo className="inline-flex" />
            <p className="mt-3 text-sm text-slate-600">
              Tablets and accessories. Fast, friendly checkout when you are
              signed in.
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Shop
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link className="text-cyan-800 hover:underline" href="/products">
                  All products
                </Link>
              </li>
              <li>
                <Link
                  className="text-cyan-800 hover:underline"
                  href="/products?category=tablets"
                >
                  Tablets
                </Link>
              </li>
              <li>
                <Link
                  className="text-cyan-800 hover:underline"
                  href="/products?category=accessories"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Company
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link className="text-cyan-800 hover:underline" href="/about">
                  About
                </Link>
              </li>
              <li>
                <Link
                  className="text-cyan-800 hover:underline"
                  href="/contact"
                >
                  Contact
                </Link>
              </li>
              {user && (
                <li>
                  <Link
                    className="text-cyan-800 hover:underline"
                    href="/partner"
                  >
                    Partner
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Policies
            </h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  className="text-cyan-800 hover:underline"
                  href="/privacy"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  className="text-cyan-800 hover:underline"
                  href="/returns"
                >
                  Returns
                </Link>
              </li>
            </ul>
            <p className="mt-4 text-sm text-slate-600">
              {contactInfo.phone}
              <br />
              {contactInfo.supportEmail}
            </p>
          </div>
        </div>
        <p className="mt-10 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} {contactInfo.siteName}. Demo storefront.
        </p>
      </div>
    </footer>
  );
}
