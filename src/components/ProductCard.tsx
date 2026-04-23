import Image from "next/image";
import Link from "next/link";
import type { StoreProduct } from "@/lib/store-types";
import { formatUsd, getUnitPrice } from "@/lib/pricing";

type Props = { product: StoreProduct; priority?: boolean };

export function ProductCard({ product, priority }: Props) {
  const u = getUnitPrice(product);
  return (
    <Link
      href={`/products/${product.sku}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm transition hover:border-cyan-200 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-contain p-3 transition group-hover:scale-[1.02]"
          priority={priority}
        />
        {product.onSale && (
          <span className="absolute right-2 top-2 rounded-full bg-amber-500/95 px-2 py-0.5 text-xs font-semibold text-white">
            Sale
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3">
        <h3 className="line-clamp-2 min-h-12 font-medium text-slate-900 group-hover:text-cyan-800">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-slate-500">
          {product.shortDescription}
        </p>
        <div className="mt-auto flex items-baseline gap-2 pt-2">
          <span className="text-lg font-semibold text-slate-900">
            {formatUsd(u)}
          </span>
          {product.onSale && (
            <span className="text-sm text-slate-400 line-through">
              {formatUsd(product.regularPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
