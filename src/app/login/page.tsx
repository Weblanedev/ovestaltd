import Link from "next/link";
import { Suspense } from "react";
import { PageHeader } from "@/components/PageHeader";
import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main>
      <PageHeader
        title="Log in"
        description="Sign in to checkout, list products for our customers, and use live chat."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/login", label: "Log in" },
        ]}
      />
      <div className="mx-auto max-w-lg px-4 py-10 sm:px-6">
        <Suspense fallback={<p className="text-slate-500">Loading…</p>}>
          <LoginForm />
        </Suspense>
        <p className="mt-6 text-sm text-slate-600">
          No account?{" "}
          <Link className="text-cyan-800 underline" href="/register">
            Create one
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
