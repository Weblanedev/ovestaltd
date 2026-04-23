import Link from "next/link";

type Props = {
  className?: string;
  wordmarkClassName?: string;
  /** Light text for dark or saturated backgrounds (e.g. home hero). */
  variant?: "default" | "onDark";
};

export function OvestaLogo({ className, wordmarkClassName, variant = "default" }: Props) {
  const isDark = variant === "onDark";
  return (
    <Link
      href="/"
      className={`flex items-center gap-2 font-display text-xl font-bold tracking-tight ${
        isDark ? "text-white" : "text-slate-900"
      } ${className ?? ""}`}
    >
      <span
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-brand-600 text-white font-bold shadow-sm"
        aria-hidden
      >
        O
      </span>
      <span
        className={wordmarkClassName ?? (isDark ? "text-white" : "text-slate-900")}
      >
        Ovesta
      </span>
    </Link>
  );
}
