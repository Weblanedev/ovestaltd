import Image from "next/image";
import Link from "next/link";

type Props = {
  imageSrc?: string;
  imageAlt?: string;
};

export function HomeHero({ imageSrc, imageAlt }: Props) {
  return (
    <section
      className="relative w-full min-h-[100dvh] overflow-hidden bg-gradient-to-b from-slate-950 via-cyan-950 to-slate-900"
      aria-label="Welcome"
    >
      <div className="mx-auto grid min-h-[100dvh] w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 pb-12 pt-24 sm:px-6 sm:pt-28 lg:grid-cols-2 lg:gap-12 lg:pt-32">
        <div className="order-2 max-w-2xl space-y-6 md:order-1 lg:space-y-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300/90">
            Ovesta Store
          </p>
          <h1 className="font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            Tech and electronics, curated for real life
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl">
            Discover devices and gear for work, home, and everything in between.
            Sign in to check out and get help when you need it.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/products?category=tablets"
              className="inline-flex min-h-12 min-w-[10rem] items-center justify-center rounded-md bg-amber-500 px-6 text-sm font-semibold text-slate-900 shadow-lg hover:bg-amber-400"
            >
              Shop devices
            </Link>
            <Link
              href="/products?category=accessories"
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/30 bg-white/5 px-6 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/15"
            >
              Shop add-ons
            </Link>
          </div>
        </div>
        <div className="relative order-1 min-h-[280px] w-full sm:min-h-[360px] md:order-2 md:min-h-[min(50dvh,480px)]">
          {imageSrc ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src={imageSrc}
                alt={imageAlt ?? ""}
                width={800}
                height={800}
                className="h-auto w-full max-w-lg object-contain drop-shadow-2xl"
                sizes="(min-width: 1024px) 45vw, 90vw"
                priority
              />
            </div>
          ) : (
            <div
              className="flex h-full min-h-[280px] items-center justify-center md:min-h-[400px]"
              aria-hidden
            >
              <div className="h-40 w-40 rounded-3xl bg-cyan-500/15 ring-2 ring-cyan-400/25 sm:h-48 sm:w-48" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
