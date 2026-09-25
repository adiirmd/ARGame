import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist on AR Game.",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-24 text-center">
      <h1 className="text-5xl font-extrabold text-white">404</h1>
      <p className="text-slate-400">
        This page doesn&apos;t exist. It might have been moved or the link is
        broken.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-full bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-500"
      >
        Back to Home
      </Link>
    </div>
  );
}
