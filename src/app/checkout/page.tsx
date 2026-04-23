import { PageHeader } from "@/components/PageHeader";
import { CheckoutClient } from "@/components/CheckoutClient";

export default function CheckoutPage() {
  return (
    <main>
      <PageHeader
        title="Checkout"
        description="Save shipping to your profile, then try the demo payment."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/cart", label: "Cart" },
          { href: "/checkout", label: "Checkout" },
        ]}
      />
      <CheckoutClient />
    </main>
  );
}
