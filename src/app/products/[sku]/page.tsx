import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/AddToCartButton";
import { PageHeader } from "@/components/PageHeader";
import { fetchDummyJsonProductById } from "@/lib/dummyjson";
import { formatUsd, getUnitPrice } from "@/lib/pricing";

type Props = { params: Promise<{ sku: string }> };

export default async function ProductPage({ params }: Props) {
  const { sku } = await params;
  const p = await fetchDummyJsonProductById(sku);
  if (!p) notFound();
  const u = getUnitPrice(p);

  return (
    <main>
      <PageHeader
        title={p.name}
        description={p.shortDescription}
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/products", label: "Shop" },
          { href: "/products", label: p.name },
        ]}
      />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <Image
              src={p.image}
              alt={p.imageAlt}
              fill
              className="object-contain p-4"
              sizes="(min-width: 1024px) 40vw, 100vw"
              priority
            />
          </div>
          <div>
            <p className="text-sm text-slate-500">
              {p.brand && <span>{p.brand} · </span>}
              {p.inStock ? "In stock" : "Out of stock"} · {p.reviewCount}{" "}
              reviews
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold text-slate-900">
              {p.name}
            </h1>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-semibold text-slate-900">
                {formatUsd(u)}
              </span>
              {p.onSale && (
                <span className="text-slate-400 line-through">
                  {formatUsd(p.regularPrice)}
                </span>
              )}
            </div>
            {p.averageRating > 0 && (
              <p className="mt-1 text-sm text-slate-600">
                Avg. rating {p.averageRating} / 5
              </p>
            )}
            <div className="prose prose-slate mt-6 max-w-none">
              <p>{p.longDescription}</p>
            </div>
            <div className="mt-6">
              <AddToCartButton product={p} />
            </div>
            <p className="mt-4 text-sm text-slate-500">
              <Link className="text-cyan-800 underline" href="/returns">
                Returns
              </Link>{" "}
              and{" "}
              <Link className="text-cyan-800 underline" href="/privacy">
                privacy
              </Link>{" "}
              apply to every order.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
