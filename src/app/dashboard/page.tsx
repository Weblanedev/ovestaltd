"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { contactInfo } from "@/lib/contact-info";
import { useAuth } from "@/context/AuthContext";
import { useChatWidget } from "@/context/ChatWidgetContext";

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const { setOpen } = useChatWidget();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login?next=/dashboard");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <main>
        <PageHeader title="Account" />
        <p className="p-8 text-center text-slate-500">Loading…</p>
      </main>
    );
  }

  return (
    <main>
      <PageHeader
        title="Your account"
        description="Profile summary and ways to reach us."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/dashboard", label: "Account" },
        ]}
      />
      <div className="mx-auto max-w-3xl space-y-8 px-4 py-10 sm:px-6">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-display text-lg font-semibold text-slate-900">
            Profile
          </h2>
          <p className="mt-2 text-slate-700">{user.name}</p>
          <p className="text-sm text-slate-500">{user.email}</p>
        </section>
        <section className="rounded-xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="font-display text-lg font-semibold text-slate-900">
            Live chat
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Call{" "}
            <a className="text-cyan-800 underline" href={`tel:${contactInfo.phoneTel}`}>
              {contactInfo.phone}
            </a>
            , visit{" "}
            <Link className="text-cyan-800 underline" href="/contact">
              Contact
            </Link>
            , or open store help from live chat when you are signed in.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-md bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-cyan-700"
              onClick={() => setOpen(true)}
            >
              Open store help
            </button>
            <Link
              href="/contact"
              className="rounded-md border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-800"
            >
              Contact
            </Link>
          </div>
        </section>
        <section>
          <h2 className="text-sm font-semibold text-slate-500">Shopping</h2>
          <ul className="mt-2 list-disc pl-5 text-cyan-800">
            <li>
              <Link className="underline" href="/products">
                Browse products
              </Link>
            </li>
            <li>
              <Link className="underline" href="/cart">
                Cart
              </Link>
            </li>
          </ul>
        </section>
        <button
          type="button"
          onClick={() => void logout().then(() => router.refresh())}
          className="text-sm text-rose-800 hover:underline"
        >
          Log out
        </button>
      </div>
    </main>
  );
}
