import {
  getAllDummyjsonCategorySlugs,
  isProductCategorySlug,
  type ProductCategorySlug,
} from "@/lib/categories";
import type { StoreProduct } from "@/lib/store-types";

const BASE = "https://dummyjson.com";

export type DummyJsonProduct = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  images: string[];
  thumbnail: string;
  reviews?: { rating: number; comment?: string }[];
};

type ProductsResponse = {
  products: DummyJsonProduct[];
  total: number;
  skip: number;
  limit: number;
};

function toPlainText(htmlish: string): string {
  return htmlish.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function mapDummy(p: DummyJsonProduct): StoreProduct {
  const discount = p.discountPercentage ?? 0;
  const onSale = discount > 0.5;
  const listPrice = onSale
    ? p.price / (1 - discount / 100)
    : p.price;
  const reviews = p.reviews ?? [];
  const reviewCount = reviews.length;
  const averageRating =
    reviewCount > 0
      ? reviews.reduce((s, r) => s + (r.rating ?? 0), 0) / reviewCount
      : p.rating ?? 0;

  const firstImage = p.images[0] ?? p.thumbnail;
  const image = firstImage || "https://placehold.co/600x400?text=Ovesta";

  return {
    sku: String(p.id),
    name: p.title,
    shortDescription: toPlainText(p.description).slice(0, 200),
    longDescription: p.description,
    regularPrice: Math.round(listPrice * 100) / 100,
    salePrice: Math.round(p.price * 100) / 100,
    onSale,
    image,
    imageAlt: p.title,
    categoryPath: [p.category],
    brand: p.brand,
    inStock: (p.stock ?? 0) > 0,
    reviewCount,
    averageRating: Math.round(averageRating * 10) / 10,
  };
}

const allowlisted = new Set(getAllDummyjsonCategorySlugs());

export async function fetchDummyJsonProducts(options: {
  page: number;
  pageSize: number;
  q?: string;
  categorySlug?: ProductCategorySlug;
}): Promise<{ products: StoreProduct[]; total: number; page: number; pageSize: number }> {
  const { page, pageSize, q, categorySlug } = options;
  const skip = (page - 1) * pageSize;

  if (q && q.trim()) {
    const res = await fetch(
      `${BASE}/products/search?q=${encodeURIComponent(q.trim())}&limit=${pageSize}&skip=${skip}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) throw new Error("Failed to search products");
    const data = (await res.json()) as ProductsResponse;
    return {
      products: data.products.map(mapDummy),
      total: data.total,
      page,
      pageSize,
    };
  }

  if (categorySlug && isProductCategorySlug(categorySlug)) {
    const cat = (await import("@/lib/categories")).getCategoryBySlug(
      categorySlug
    );
    if (!cat) {
      return { products: [], total: 0, page, pageSize };
    }
    const res = await fetch(
      `${BASE}/products/category/${encodeURIComponent(cat.dummyjsonCategorySlug)}?limit=${pageSize}&skip=${skip}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) throw new Error("Failed to load category");
    const data = (await res.json()) as ProductsResponse;
    return {
      products: data.products.map(mapDummy),
      total: data.total,
      page,
      pageSize,
    };
  }

  const slugs = getAllDummyjsonCategorySlugs();
  const merged: DummyJsonProduct[] = [];
  for (const slug of slugs) {
    const r = await fetch(
      `${BASE}/products/category/${encodeURIComponent(slug)}?limit=200&skip=0`,
      { next: { revalidate: 60 } }
    );
    if (!r.ok) continue;
    const data = (await r.json()) as ProductsResponse;
    merged.push(...data.products);
  }
  const unique = new Map<number, DummyJsonProduct>();
  for (const p of merged) {
    if (!allowlisted.has(p.category)) continue;
    unique.set(p.id, p);
  }
  const sorted = [...unique.values()].sort((a, b) => a.id - b.id);
  const total = sorted.length;
  const slice = sorted.slice(skip, skip + pageSize);
  return {
    products: slice.map(mapDummy),
    total,
    page,
    pageSize,
  };
}

export async function fetchDummyJsonProductById(
  id: string
): Promise<StoreProduct | null> {
  const res = await fetch(`${BASE}/products/${encodeURIComponent(id)}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  const p = (await res.json()) as DummyJsonProduct;
  if (!allowlisted.has(p.category)) return null;
  return mapDummy(p);
}
