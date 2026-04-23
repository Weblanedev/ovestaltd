import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        title="About Ovesta"
        description="A focused storefront for tablets and accessories."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
        ]}
      />
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-10 text-slate-700 sm:px-6">
        <p>
          Ovesta is built as a clean Next.js experience: search and categories,
          cart in the browser, sign-in for checkout, and clear policies.
        </p>
        <p>
          Product data on this site is <strong>demo data</strong> from DummyJSON.
          Prices and stock are not real. Payment is simulated.
        </p>
        <p>
          <Link className="text-cyan-800 underline" href="/contact">
            Contact
          </Link>{" "}
          the team for partnerships or support questions.
        </p>
      </div>
    </main>
  );
}
