import { PageHeader } from "@/components/PageHeader";
import { CartView } from "@/components/CartView";

export default function CartPage() {
  return (
    <main>
      <PageHeader
        title="Cart"
        description="Your shopping cart, saved in this browser."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/cart", label: "Cart" },
        ]}
      />
      <CartView />
    </main>
  );
}
