import type { Metadata } from "next";
import TextPage from "@/components/TextPage";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for AR Game, the free online game portal. Read the rules for playing games on our site.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <TextPage title="Terms of Use" accent="var(--sky)" glyph="📜">
      <p>
        By using AR Game, you agree to use the site and its games for personal,
        non-commercial entertainment purposes.
      </p>
      <p>
        All games are provided &quot;as is&quot;, without warranty of any kind.
        Every game on this site is either an original creation made for AR Game
        or an open-source project included under a verified license that
        permits redistribution; the exact source and license for each game is
        listed on its game page.
      </p>
      <p>
        You may not attempt to scrape, mirror, or redistribute this site&apos;s
        content in bulk, attempt to bypass security controls, or use the site
        in any way that could disrupt service for other players.
      </p>
      <p>We reserve the right to update these terms as the site evolves.</p>
    </TextPage>
  );
}
