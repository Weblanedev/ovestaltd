import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
      <h1 className="font-display text-4xl font-bold text-slate-900">404</h1>
      <p className="mt-2 text-slate-600">That page is not in this build.</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-md bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-cyan-700"
      >
        Back home
      </Link>
    </div>
  );
}
