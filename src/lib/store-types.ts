export type StoreProduct = {
  sku: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  regularPrice: number;
  salePrice: number;
  onSale: boolean;
  image: string;
  imageAlt: string;
  categoryPath: string[];
  brand?: string;
  inStock: boolean;
  reviewCount: number;
  averageRating: number;
};
