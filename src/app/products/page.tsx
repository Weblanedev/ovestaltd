import { Suspense } from "react";
import { ProductsClient } from "@/components/ProductsClient";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-slate-500">Loading shop…</div>
      }
    >
      <ProductsClient />
    </Suspense>
  );
}
