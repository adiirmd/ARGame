import Link from "next/link";
import { CATEGORY_LABELS, GAME_CATEGORIES } from "@/lib/types";
import { CATEGORY_COLOR, CATEGORY_GLYPH } from "@/lib/category-style";

/**
 * The old header hid categories behind a hover dropdown, which is
 * unreachable on touch devices. They now live in an always-visible rail
 * that scrolls horizontally on small screens, so every category is one
 * tap away and no JavaScript is involved.
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b-[3px] border-[var(--ink)] bg-[var(--bg-deep)]">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3"
      >
        <Link
          href="/"
          className="group flex min-h-11 shrink-0 items-center gap-2 font-display text-lg uppercase text-[var(--panel)]"
        >
          <span
            aria-hidden="true"
            className="nb-2 nb-sh-sm inline-flex h-9 w-9 items-center justify-center bg-[var(--yellow)] font-display text-sm text-[var(--ink)] transition-transform duration-150 group-hover:-rotate-6"
          >
            AR
          </span>
          <span className="hidden sm:inline">AR Game</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/games"
            className="nb-2 nb-sh-sm nb-press hidden min-h-11 items-center bg-[var(--panel)] px-3 py-2 font-display text-xs uppercase text-[var(--ink)] sm:inline-flex"
          >
            All Games
          </Link>
          <Link
            href="/about"
            className="nb-2 nb-sh-sm nb-press hidden min-h-11 items-center bg-[var(--panel)] px-3 py-2 font-display text-xs uppercase text-[var(--ink)] md:inline-flex"
          >
            About
          </Link>
          <Link
            href="/search"
            className="nb-2 nb-sh-sm nb-press flex min-h-11 items-center gap-1.5 bg-[var(--cyan)] px-3.5 py-2 font-display text-xs uppercase text-[var(--ink)]"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2.4" />
              <path
                d="M17 17l-3.6-3.6"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
            <span>Search</span>
          </Link>
        </div>
      </nav>

      <div className="border-t-2 border-[var(--ink)] bg-[var(--bg)]">
        <ul
          aria-label="Game categories"
          className="no-scrollbar mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-2"
        >
          {GAME_CATEGORIES.map((cat) => (
            <li key={cat} className="shrink-0">
              <Link
                href={`/games/${cat}`}
                className="nb-2 nb-sh-sm nb-press flex min-h-11 items-center gap-1.5 px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-[var(--ink)]"
                style={{ backgroundColor: CATEGORY_COLOR[cat] }}
              >
                <span aria-hidden="true">{CATEGORY_GLYPH[cat]}</span>
                {CATEGORY_LABELS[cat]}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
