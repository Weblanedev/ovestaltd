"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { PageHeader } from "@/components/PageHeader";
import {
  PRODUCT_CATEGORIES,
  isProductCategorySlug,
  type ProductCategorySlug,
} from "@/lib/categories";
import type { StoreProduct } from "@/lib/store-types";

type ApiRes = {
  products: StoreProduct[];
  total: number;
  page: number;
  pageSize: number;
};

const SLUGS = ["", ...PRODUCT_CATEGORIES.map((c) => c.slug)] as const;

export function ProductsClient() {
  const search = useSearchParams();
  const router = useRouter();
  const [q, setQ] = useState(search.get("q") ?? "");
  const [debounced, setDebounced] = useState(q);
  const [category, setCategory] = useState(() => {
    const c = search.get("category");
    return c && isProductCategorySlug(c) ? c : "";
  });
  const [page, setPage] = useState(
    () => Math.max(1, parseInt(search.get("page") ?? "1", 10) || 1)
  );
  const [data, setData] = useState<ApiRes | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(q), 300);
    return () => clearTimeout(t);
  }, [q]);

  const syncUrl = useCallback(() => {
    const p = new URLSearchParams();
    if (debounced.trim()) p.set("q", debounced.trim());
    if (category) p.set("category", category);
    if (page > 1) p.set("page", String(page));
    const s = p.toString();
    router.replace("/products" + (s ? `?${s}` : ""), { scroll: false });
  }, [debounced, category, page, router]);

  useEffect(() => {
    setPage(1);
  }, [debounced, category]);

  useEffect(() => {
    syncUrl();
  }, [debounced, category, page, syncUrl]);

  useEffect(() => {
    let ok = true;
    setLoading(true);
    setError(null);
    const pageSize = 12;
    const qs = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
    });
    if (debounced.trim()) qs.set("q", debounced.trim());
    if (category && isProductCategorySlug(category)) {
      qs.set("category", category);
    }
    void fetch("/api/store/products?" + qs.toString())
      .then((r) => r.json() as Promise<ApiRes & { error?: string }>)
      .then((j) => {
        if (!ok) return;
        if ("error" in j && j.error) {
          setError(j.error);
          setData(null);
          return;
        }
        setData({
          products: j.products,
          total: j.total,
          page: j.page,
          pageSize: j.pageSize,
        });
      })
      .catch(() => {
        if (!ok) return;
        setError("Could not load products.");
        setData(null);
      })
      .finally(() => {
        if (ok) setLoading(false);
      });
    return () => {
      ok = false;
    };
  }, [debounced, category, page]);

  return (
    <main>
      <PageHeader
        title="Shop"
        description="Tablets and accessories from the demo catalog."
        crumbs={[
          { href: "/", label: "Home" },
          { href: "/products", label: "Shop" },
        ]}
      />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-md flex-1">
            <label className="text-sm text-slate-600" htmlFor="search-p">
              Search
            </label>
            <input
              id="search-p"
              className="text-base mt-1 w-full min-h-12 rounded-md border border-slate-200 px-3"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products"
            />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {SLUGS.map((slug) => {
            const label =
              slug === ""
                ? "All"
                : PRODUCT_CATEGORIES.find((c) => c.slug === slug)?.label ??
                  slug;
            const active = category === slug;
            return (
              <button
                key={slug || "all"}
                type="button"
                onClick={() => {
                  if (slug === "") setCategory("");
                  else setCategory(slug as ProductCategorySlug);
                }}
                className={
                  "rounded-full px-3 py-1.5 text-sm " +
                  (active
                    ? "bg-cyan-600 text-white"
                    : "bg-slate-100 text-slate-800 hover:bg-slate-200")
                }
              >
                {label}
              </button>
            );
          })}
        </div>
        {error && <p className="mt-4 text-rose-700">{error}</p>}
        {loading && <p className="mt-6 text-slate-500">Loading…</p>}
        {!loading && data && (
          <>
            <ul className="mt-6 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.products.map((p, i) => (
                <li key={p.sku}>
                  <ProductCard product={p} priority={i < 4} />
                </li>
              ))}
            </ul>
            {data.products.length === 0 && (
              <p className="mt-6 text-slate-600">No products match. Try a different search.</p>
            )}
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                type="button"
                className="rounded-md border border-slate-200 px-3 py-1.5 text-sm disabled:opacity-50"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </button>
              <span className="text-sm text-slate-600">Page {page}</span>
              <button
                type="button"
                className="rounded-md border border-slate-200 px-3 py-1.5 text-sm disabled:opacity-50"
                disabled={data.products.length < data.pageSize}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
