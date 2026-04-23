import { PRODUCT_CATEGORIES } from "@/lib/categories";
import { fetchDummyJsonProducts } from "@/lib/dummyjson";
import { formatUsd, getUnitPrice } from "@/lib/pricing";
import type { StoreProduct } from "@/lib/store-types";

function line(p: StoreProduct) {
  const u = getUnitPrice(p);
  return `- ${p.name} · sku ${p.sku} · ${formatUsd(u)} · ${p.shortDescription.slice(0, 120)}`;
}

export async function buildCatalogContextForChat(): Promise<string> {
  const intro = "Ovesta catalog: tablets and accessories (public listings).";
  const blocks: string[] = [intro];
  for (const cat of PRODUCT_CATEGORIES) {
    const { products } = await fetchDummyJsonProducts({
      page: 1,
      pageSize: 4,
      categorySlug: cat.slug,
    });
    if (products.length === 0) continue;
    blocks.push(`\n[${cat.label}]`);
    for (const p of products) {
      blocks.push(line(p));
    }
  }
  return blocks.join("\n");
}
