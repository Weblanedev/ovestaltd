import { PageHeader } from "@/components/PageHeader";
import { SellToCustomersForm } from "@/components/SellToCustomersForm";

export default function SellPage() {
  return (
    <main>
      <PageHeader
        title="Sell your product to our customers"
        description="Tell us about your brand and what you would like to list. We will follow up with next steps."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/sell", label: "Sell with us" },
        ]}
      />
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <p className="mb-6 text-slate-600">
          Ovesta Store connects tech shoppers with trusted brands and
          suppliers. Share your details and we will review fit for our
          catalog.
        </p>
        <SellToCustomersForm />
      </div>
    </main>
  );
}
