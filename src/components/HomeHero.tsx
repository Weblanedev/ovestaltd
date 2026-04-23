import Image from "next/image";
import Link from "next/link";

type Props = {
  imageSrc?: string;
  imageAlt?: string;
};

export function HomeHero({ imageSrc, imageAlt }: Props) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-900 shadow-sm">
      <div className="grid items-center gap-0 md:grid-cols-2">
        <div className="order-2 space-y-5 px-6 py-10 sm:px-10 sm:py-12 md:order-1">
          <p className="text-sm font-medium uppercase tracking-wide text-cyan-300/90">
            Ovesta
          </p>
          <h1 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Tablets and accessories, curated for every day
          </h1>
          <p className="max-w-lg text-lg text-slate-300">
            Compare devices and gear from our demo catalog. Sign in to checkout
            and get help from support when you need it.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/products?category=tablets"
              className="inline-flex min-h-12 min-w-[10rem] items-center justify-center rounded-md bg-amber-500 px-5 text-sm font-semibold text-slate-900 shadow-sm hover:bg-amber-400"
            >
              Shop tablets
            </Link>
            <Link
              href="/products?category=accessories"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-slate-500/60 bg-transparent px-5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Browse accessories
            </Link>
          </div>
        </div>
        <div className="relative order-1 aspect-[4/3] w-full min-h-[220px] md:order-2 md:aspect-auto md:min-h-[320px]">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={imageAlt ?? ""}
              fill
              className="object-contain p-6 sm:p-8"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
            />
          ) : (
            <div
              className="flex h-full min-h-[220px] items-center justify-center p-8 md:min-h-[320px]"
              aria-hidden
            >
              <div className="h-32 w-32 rounded-2xl bg-cyan-500/20 ring-1 ring-cyan-400/30" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
