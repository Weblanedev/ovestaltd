import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { RegisterForm } from "@/components/RegisterForm";

export default function RegisterPage() {
  return (
    <main>
      <PageHeader
        title="Create account"
        description="Use a real-style email and a password of at least eight characters."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/register", label: "Register" },
        ]}
      />
      <div className="mx-auto max-w-lg px-4 py-10 sm:px-6">
        <RegisterForm />
        <p className="mt-6 text-sm text-slate-600">
          Already have an account?{" "}
          <Link className="text-cyan-800 underline" href="/login">
            Log in
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
