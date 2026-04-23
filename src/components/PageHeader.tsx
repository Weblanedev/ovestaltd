import Link from "next/link";

type Crumb = { href: string; label: string };

type Props = {
  title: string;
  description?: string;
  crumbs?: Crumb[];
};

export function PageHeader({ title, description, crumbs }: Props) {
  return (
    <div className="border-b border-slate-200/80 bg-slate-50/60">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {crumbs && crumbs.length > 0 && (
          <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
            <ol className="flex flex-wrap gap-2">
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden>/</span>}
                  {i < crumbs.length - 1 ? (
                    <Link href={c.href} className="hover:text-cyan-700">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-slate-800">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-2xl text-slate-600">{description}</p>
        )}
      </div>
    </div>
  );
}
