import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { contactInfo } from "@/lib/contact-info";

export default function AboutPage() {
  return (
    <main>
      <PageHeader
        title="About Ovesta Store"
        description={`${contactInfo.legalName} · ${contactInfo.businessActivity}`}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/about", label: "About" },
        ]}
      />
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-10 text-slate-700 sm:px-6">
        <p>
          <strong>{contactInfo.legalName}</strong> operates{" "}
          <strong>{contactInfo.siteName}</strong> at{" "}
          <a
            className="text-cyan-800 underline"
            href={contactInfo.siteUrl}
          >
            {contactInfo.domain}
          </a>
          . {contactInfo.businessActivity}. Online shopping with checkout and
          support built for a smooth experience.
        </p>
        <p>
          <strong>Registered address:</strong> {contactInfo.address}
        </p>
        <p>
          <strong>Phone:</strong>{" "}
          <a className="text-cyan-800 underline" href={`tel:${contactInfo.phoneTel}`}>
            {contactInfo.phone}
          </a>
          {" · "}
          <strong>Email:</strong>{" "}
          <a
            className="text-cyan-800 underline"
            href={`mailto:${contactInfo.servicesEmail}`}
          >
            {contactInfo.servicesEmail}
          </a>
        </p>
        <p>
          Browse the shop, build your cart, and check out when you are ready.
          For help, use the{" "}
          <Link className="text-cyan-800 underline" href="/contact">
            contact page
          </Link>
          .
        </p>
        <p>
          Suppliers: learn about{" "}
          <Link className="text-cyan-800 underline" href="/sell">
            offering your products through our store
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
