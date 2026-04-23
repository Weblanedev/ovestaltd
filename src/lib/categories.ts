export const PRODUCT_CATEGORIES = [
  {
    slug: "tablets",
    label: "Tablets",
    description: "Portable slates and compact tablets for reading and light productivity.",
    dummyjsonCategorySlug: "tablets",
  },
  {
    slug: "accessories",
    label: "Accessories",
    description: "Cases, chargers, audio, and smart add-ons to complete your setup.",
    dummyjsonCategorySlug: "mobile-accessories",
  },
] as const;

export type ProductCategorySlug = (typeof PRODUCT_CATEGORIES)[number]["slug"];

const slugSet = new Set(
  PRODUCT_CATEGORIES.map((c) => c.slug)
) as Set<ProductCategorySlug>;

export function isProductCategorySlug(s: string): s is ProductCategorySlug {
  return slugSet.has(s as ProductCategorySlug);
}

export function getCategoryBySlug(slug: ProductCategorySlug) {
  return PRODUCT_CATEGORIES.find((c) => c.slug === slug);
}

export function getAllDummyjsonCategorySlugs(): string[] {
  return [...new Set(PRODUCT_CATEGORIES.map((c) => c.dummyjsonCategorySlug))];
}
