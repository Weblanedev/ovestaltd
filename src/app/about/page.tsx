import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        title="About Ovesta Store"
        description="A tech store built around products you can trust and checkout you can count on."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
        ]}
      />
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-10 text-slate-700 sm:px-6">
        <p>
          We bring together quality electronics, smart accessories, and
          the support you need to choose with confidence.
        </p>
        <p>
          Browse the shop, build your cart, and check out when you are ready.
          For questions, use{" "}
          <Link className="text-cyan-800 underline" href="/contact">
            Contact
          </Link>{" "}
          or email{" "}
          <a className="text-cyan-800 underline" href="mailto:support@ovestastore.com">
            support@ovestastore.com
          </a>
          .
        </p>
        <p>
          Vendors: learn about{" "}
          <Link className="text-cyan-800 underline" href="/sell">
            offering your products through Ovesta
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
