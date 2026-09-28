import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t-[3px] border-[var(--ink)] bg-[var(--bg-deep)]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span
                aria-hidden="true"
                className="nb-2 nb-sh-sm inline-flex h-8 w-8 items-center justify-center bg-[var(--yellow)] font-display text-xs text-[var(--ink)]"
              >
                AR
              </span>
              <span className="font-display text-base uppercase text-[var(--panel)]">
                AR Game
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[var(--panel)]/70">
              A free browser game portal. Play instantly, no downloads, no
              accounts, no ads.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="mb-3 font-display text-xs uppercase tracking-wide text-[var(--yellow)]">
              Explore
            </h2>
            <ul className="text-sm">
              <li>
                <Link
                  href="/games"
                  className="inline-flex min-h-11 items-center text-[var(--panel)]/75 underline-offset-4 hover:text-[var(--panel)] hover:underline"
                >
                  All games
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="inline-flex min-h-11 items-center text-[var(--panel)]/75 underline-offset-4 hover:text-[var(--panel)] hover:underline"
                >
                  Search
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="inline-flex min-h-11 items-center text-[var(--panel)]/75 underline-offset-4 hover:text-[var(--panel)] hover:underline"
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Legal navigation">
            <h2 className="mb-3 font-display text-xs uppercase tracking-wide text-[var(--cyan)]">
              Legal
            </h2>
            <ul className="text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="inline-flex min-h-11 items-center text-[var(--panel)]/75 underline-offset-4 hover:text-[var(--panel)] hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="inline-flex min-h-11 items-center text-[var(--panel)]/75 underline-offset-4 hover:text-[var(--panel)] hover:underline"
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-8 border-t-2 border-[var(--panel)]/15 pt-6 text-xs leading-relaxed text-[var(--panel)]/50">
          © {new Date().getFullYear()} AR Game. Free online games, browser
          games, no ads, no tracking. Every game is either original or used
          under a verified open-source license. See each game page for source
          and license details.
        </p>
      </div>
    </footer>
  );
}
