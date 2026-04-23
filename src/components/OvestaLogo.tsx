import Link from "next/link";

type Props = { className?: string; wordmarkClassName?: string };

export function OvestaLogo({ className, wordmarkClassName }: Props) {
  return (
    <Link
      href="/"
      className={className ?? "flex items-center gap-2 font-display text-xl font-bold tracking-tight text-slate-900"}
    >
      <span
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-brand-600 text-white font-bold shadow-sm"
        aria-hidden
      >
        O
      </span>
      <span className={wordmarkClassName ?? ""}>Ovesta</span>
    </Link>
  );
}
