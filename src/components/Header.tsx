import Link from "next/link";
import { CATEGORY_LABELS, GAME_CATEGORIES } from "@/lib/types";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b1020]/90 backdrop-blur supports-[backdrop-filter]:bg-[#0b1020]/70">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-white"
        >
          <span
            aria-hidden="true"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-sm"
          >
            AR
          </span>
          AR GAME
        </Link>

        <div className="hidden items-center gap-6 text-sm font-medium text-slate-200 md:flex">
          <Link href="/games" className="hover:text-white">
            Games
          </Link>
          <div className="group relative">
            <button
              type="button"
              className="flex items-center gap-1 hover:text-white"
              aria-haspopup="true"
            >
              Categories
            </button>
            <div className="invisible absolute left-0 top-full grid w-64 grid-cols-2 gap-1 rounded-xl border border-white/10 bg-[#0f1526] p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              {GAME_CATEGORIES.map((cat) => (
                <Link
                  key={cat}
                  href={`/games/${cat}`}
                  className="rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-white/5 hover:text-white"
                >
                  {CATEGORY_LABELS[cat]}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/about" className="hover:text-white">
            About
          </Link>
        </div>

        <Link
          href="/search"
          className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-white/10"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            className="h-4 w-4"
          >
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
            <path d="M17 17l-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <span>Search</span>
        </Link>
      </nav>
    </header>
  );
}
