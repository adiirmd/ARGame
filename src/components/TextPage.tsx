import type { ReactNode } from "react";

/**
 * Shared shell for the text-only pages (about, privacy, terms).
 *
 * Long-form copy goes on a cream panel rather than straight onto the dark
 * dotted background, because dark-on-light is easier to read for several
 * paragraphs and it keeps these pages inside the same sticker-sheet
 * language as the rest of the site.
 */
export default function TextPage({
  title,
  accent,
  glyph,
  children,
}: {
  title: string;
  accent: string;
  glyph: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div
        className="nb nb-sh flex items-center gap-3 p-5 sm:p-6"
        style={{ backgroundColor: accent }}
      >
        <span aria-hidden="true" className="text-3xl leading-none">
          {glyph}
        </span>
        <h1 className="font-display text-2xl uppercase text-[var(--ink)] sm:text-3xl">
          {title}
        </h1>
      </div>

      <div className="nb nb-sh mt-4 space-y-4 bg-[var(--panel)] p-5 text-sm leading-relaxed text-[var(--ink)]/80 sm:p-6 [&_code]:border-2 [&_code]:border-[var(--ink)] [&_code]:bg-[var(--panel-2)] [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[var(--ink)]">
        {children}
      </div>
    </div>
  );
}
