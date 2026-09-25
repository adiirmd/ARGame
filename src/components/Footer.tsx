import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-[#0a0e1c]">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-400">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <div className="mb-2 text-lg font-bold text-white">AR GAME</div>
            <p>
              A free browser game portal. Play instantly, no downloads, no
              accounts, no ads.
            </p>
          </div>
          <nav aria-label="Footer navigation">
            <h2 className="mb-2 font-semibold text-slate-200">Explore</h2>
            <ul className="space-y-1">
              <li>
                <Link href="/games" className="hover:text-white">
                  All games
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-white">
                  Search
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white">
                  About
                </Link>
              </li>
            </ul>
          </nav>
          <nav aria-label="Legal navigation">
            <h2 className="mb-2 font-semibold text-slate-200">Legal</h2>
            <ul className="space-y-1">
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <p className="mt-8 border-t border-white/5 pt-6 text-xs text-slate-500">
          © {new Date().getFullYear()} AR Game. Free online games, browser
          games, no ads, no tracking. Every game is either original or used
          under a verified open-source license. See each game page for
          source and license details.
        </p>
      </div>
    </footer>
  );
}
