"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import { getUnitPrice } from "@/lib/pricing";
import type { StoreProduct } from "@/lib/store-types";

type Props = { product: StoreProduct; label?: string };

export function AddToCartButton({ product, label = "Add to cart" }: Props) {
  const { add } = useCart();
  const [adding, setAdding] = useState(false);
  const price = getUnitPrice(product);

  return (
    <button
      type="button"
      disabled={!product.inStock || adding}
      onClick={() => {
        if (!product.inStock) {
          toast.error("This item is currently out of stock.");
          return;
        }
        setAdding(true);
        add({
          sku: product.sku,
          name: product.name,
          unitPrice: price,
          image: product.image,
          quantity: 1,
        });
        toast.success("Added to cart");
        setAdding(false);
      }}
      className="inline-flex min-h-11 w-full max-w-sm items-center justify-center rounded-md bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
    >
      {adding ? "Adding…" : product.inStock ? label : "Out of stock"}
    </button>
  );
}
