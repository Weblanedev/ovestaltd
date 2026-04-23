import { PageHeader } from "@/components/PageHeader";
import { PartnerForm } from "@/components/PartnerForm";

export default function PartnerPage() {
  return (
    <main>
      <PageHeader
        title="Partner with Ovesta"
        description="Tell us about your business. This form is a demo capture only."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/partner", label: "Partner" },
        ]}
      />
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <PartnerForm />
      </div>
    </main>
  );
}
