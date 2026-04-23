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
      <HomeHero imageSrc={heroImage} imageAlt={heroAlt} />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <section>
          <AnimatedSection>
            <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
              Shop by category
            </h2>
            <p className="mt-2 text-slate-600">
              From portable devices to everyday tech add-ons, browse the way
              you like.
            </p>
            <ul className="mt-4 flex flex-wrap gap-3 list-none text-sm">
              <li>
                <Link
                  className="text-cyan-800 underline"
                  href="/products?category=tablets"
                >
                  Devices
                </Link>
              </li>
              <li>
                <span aria-hidden>·</span>{" "}
                <Link
                  className="text-cyan-800 underline"
                  href="/products?category=accessories"
                >
                  Add-ons
                </Link>
              </li>
            </ul>
          </AnimatedSection>
        </section>
        {featuredTablets.products.length > 0 && (
          <section className="mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
              Featured picks
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
              More gear
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
                See all in category
              </Link>
            </p>
          </section>
        )}
        <section className="mt-14 grid gap-4 rounded-xl border border-slate-200 bg-cyan-50/40 p-6 sm:grid-cols-3 sm:p-8">
          <div>
            <h3 className="font-medium text-slate-900">Dispatch</h3>
            <p className="mt-1 text-sm text-slate-600">
              We aim to process orders quickly. Delivery times and carriers are
              confirmed at checkout.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-slate-900">Secure checkout</h3>
            <p className="mt-1 text-sm text-slate-600">
              Create an account to check out. Your payment is processed through
              our gateway and protected by industry-standard security.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-slate-900">Support</h3>
            <p className="mt-1 text-sm text-slate-600">
              Email support@ovestastore.com, use live chat, or the contact form
              when you are signed in.
            </p>
          </div>
        </section>
        <Newsletter />
      </div>
    </main>
  );
}
