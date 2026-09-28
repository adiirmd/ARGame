import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist on AR Game.",
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20">
      <div className="nb nb-sh-lg bg-[var(--pink)] p-8 text-center sm:p-12">
        <p
          aria-hidden="true"
          className="font-display text-6xl leading-none text-[var(--panel)] ink-edge sm:text-8xl"
        >
          404
        </p>
        <h1 className="mt-4 font-display text-lg uppercase text-[var(--ink)] sm:text-xl">
          Game over
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[var(--ink)]/75">
          This page doesn&apos;t exist. It might have been moved, or the link
          is broken.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="nb nb-sh nb-press bg-[var(--yellow)] px-5 py-2.5 font-display text-xs uppercase text-[var(--ink)]"
          >
            Back to home
          </Link>
          <Link
            href="/games"
            className="nb nb-sh nb-press bg-[var(--panel)] px-5 py-2.5 font-display text-xs uppercase text-[var(--ink)]"
          >
            All games
          </Link>
        </div>
      </div>
    </div>
  );
}
