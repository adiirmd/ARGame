import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About AR Game",
  description:
    "AR Game is a free online game portal built with Next.js. Learn about our mission: fun, fast, ad-free browser games for everyone.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-slate-300">
      <h1 className="text-3xl font-extrabold text-white">About AR Game</h1>
      <div className="mt-6 space-y-4 leading-relaxed">
        <p>
          AR Game is a free online game portal focused on one thing: letting
          you play fun browser games instantly, without downloads, sign-ups,
          ads, or trackers getting in the way.
        </p>
        <p>
          Every game in our catalog is either built from scratch for AR Game,
          or included from an open-source project whose license explicitly
          permits redistribution. Each one is checked against its original
          license file before it&apos;s added. We never scrape, mirror, or copy
          games from other game portals without permission.
        </p>
        <p>
          AR Game runs on Next.js and is designed to be fast, accessible, and
          responsive across desktop, tablet, and mobile devices.
        </p>
      </div>
    </div>
  );
}
