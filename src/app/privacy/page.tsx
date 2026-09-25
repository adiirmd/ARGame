import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "AR Game's privacy policy: we do not use ads, analytics, or tracking of any kind. Read what data we handle and how.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-slate-300">
      <h1 className="text-3xl font-extrabold text-white">Privacy Policy</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-sm">
        <p>
          AR Game does not use advertising networks, analytics tools, or
          tracking technology of any kind. There is no Google Analytics, no
          Google Tag Manager, no Meta/Facebook Pixel, no TikTok Pixel, no
          Hotjar, no Microsoft Clarity, and no third-party tracking pixels or
          SDKs anywhere on this site.
        </p>
        <p>
          Some games use your browser&apos;s local storage (
          <code>localStorage</code>) purely to remember things like your
          personal high score on that device. This data never leaves your
          browser and is never transmitted to us or any third party.
        </p>
        <p>
          We do not require accounts, do not collect personal information,
          and do not set tracking cookies. Standard web server logs (such as
          those kept by our hosting infrastructure) may record basic
          technical request information for security and reliability
          purposes only.
        </p>
        <p>
          If this policy changes in the future, the update will be reflected
          on this page.
        </p>
      </div>
    </div>
  );
}
