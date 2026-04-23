import type { StoreProduct } from "@/lib/store-types";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatUsd(amount: number): string {
  return usd.format(amount);
}

export function getUnitPrice(product: StoreProduct): number {
  return product.onSale ? product.salePrice : product.regularPrice;
}

export const SHIPPING_FLAT = 9.99;
