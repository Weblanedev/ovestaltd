import { PageHeader } from "@/components/PageHeader";
import { SellToCustomersForm } from "@/components/SellToCustomersForm";
import { contactInfo } from "@/lib/contact-info";

export default function SellPage() {
  return (
    <main>
      <PageHeader
        title="Sell your product to our customers"
        description={`${contactInfo.legalName} · ${contactInfo.businessActivity}. Tell us about your brand and we will follow up.`}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/sell", label: "Sell with us" },
        ]}
      />
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <p className="mb-6 text-slate-600">
          {contactInfo.legalName} connects shoppers with trusted suppliers in
          computers and software. Share your details and we will review fit for
          our catalog.
        </p>
        <SellToCustomersForm />
      </div>
    </main>
  );
}
