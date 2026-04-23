import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import { HomeHero } from "@/components/HomeHero";
import { Newsletter } from "@/components/Newsletter";
import { ProductCard } from "@/components/ProductCard";
import { fetchDummyJsonProducts } from "@/lib/dummyjson";
import { getCategoryBySlug } from "@/lib/categories";

export default async function HomePage() {
  const accessories = getCategoryBySlug("accessories");
  const tablets = getCategoryBySlug("tablets");
  if (!accessories || !tablets) {
    throw new Error("Categories misconfigured");
  }

  const [featuredTablets, accRow] = await Promise.all([
    fetchDummyJsonProducts({
      page: 1,
      pageSize: 4,
      categorySlug: "tablets",
    }),
    fetchDummyJsonProducts({
      page: 1,
      pageSize: 4,
      categorySlug: "accessories",
    }),
  ]);

  const hero = featuredTablets.products[0];
  const heroImage = hero?.image;
  const heroAlt = hero?.name ?? "Featured product";

  return (
    <main>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <HomeHero
          imageSrc={heroImage}
          imageAlt={heroAlt}
        />
        <section className="mt-12">
          <AnimatedSection>
            <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
              Shop by category
            </h2>
            <p className="mt-2 text-slate-600">
              Choose tablets or accessories. Smartphones and laptops are not
              part of this storefront.
            </p>
            <ul className="mt-4 flex flex-wrap gap-3 list-none text-sm">
              <li>
                <Link
                  className="text-cyan-800 underline"
                  href="/products?category=tablets"
                >
                  Tablets
                </Link>
              </li>
              <li>
                <span aria-hidden>·</span>{" "}
                <Link
                  className="text-cyan-800 underline"
                  href="/products?category=accessories"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </AnimatedSection>
        </section>
        {featuredTablets.products.length > 0 && (
          <section className="mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
              Featured tablets
            </h2>
            <ul className="mt-6 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featuredTablets.products.map((p, i) => (
                <li key={p.sku}>
                  <ProductCard product={p} priority={i < 2} />
                </li>
              ))}
            </ul>
          </section>
        )}
        {accRow.products.length > 0 && (
          <section className="mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
              Accessories
            </h2>
            <ul className="mt-6 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {accRow.products.map((p) => (
                <li key={p.sku}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
            <p className="mt-3 text-right text-sm">
              <Link
                className="text-cyan-800 underline"
                href="/products?category=accessories"
              >
                All accessories
              </Link>
            </p>
          </section>
        )}
        <section className="mt-14 grid gap-4 rounded-xl border border-slate-200 bg-cyan-50/40 p-6 sm:grid-cols-3 sm:p-8">
          <div>
            <h3 className="font-medium text-slate-900">Fast dispatch</h3>
            <p className="mt-1 text-sm text-slate-600">
              Orders in this demo are not fulfilled. In production you set lead
              times here.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-slate-900">Secure checkout</h3>
            <p className="mt-1 text-sm text-slate-600">
              You sign in before checkout. Payment in this app is a simulation
              only.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-slate-900">Support</h3>
            <p className="mt-1 text-sm text-slate-600">
              Contact us, or open the product assistant when you are signed in.
            </p>
          </div>
        </section>
        <Newsletter />
      </div>
    </main>
  );
}
