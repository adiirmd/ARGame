"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { Game } from "@/lib/types";

// Only same-origin local game paths are allowed by default. If we ever embed
// an approved external game, its exact origin must be added here explicitly.
// No wildcards, no arbitrary iframe src.
const ALLOWED_IFRAME_ORIGINS: string[] = [];

function isAllowedGameUrl(url: string): boolean {
  if (url.startsWith("/")) return true; // same-origin local game
  try {
    const parsed = new URL(url);
    return ALLOWED_IFRAME_ORIGINS.includes(parsed.origin);
  } catch {
    return false;
  }
}

export default function GamePlayer({ game }: { game: Game }) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const containerRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const allowed = isAllowedGameUrl(game.gameUrl);

  const handleLoad = useCallback(() => setStatus("ready"), []);
  const handleError = useCallback(() => setStatus("error"), []);

  const retry = useCallback(() => {
    setStatus("loading");
    if (iframeRef.current) {
      // Force a reload by resetting src.
      const src = iframeRef.current.src;
      iframeRef.current.src = "about:blank";
      requestAnimationFrame(() => {
        if (iframeRef.current) iframeRef.current.src = src;
      });
    }
  }, []);

  // Safety-net timeout: some iframes fail silently (e.g. blocked by CSP)
  // without firing onerror. Surface a clear error state instead of an
  // infinite spinner or a raw stack trace.
  useEffect(() => {
    if (status !== "loading") return;
    const t = setTimeout(() => {
      setStatus((s) => (s === "loading" ? "error" : s));
    }, 12000);
    return () => clearTimeout(t);
  }, [status, game.gameUrl]);

  // Race-condition fix: on a fast/cached load the iframe can finish loading
  // (and fire its native `load` event) before React finishes mounting and
  // attaching the `onLoad` prop's listener. That event fires and gets missed,
  // leaving the UI stuck on the loading spinner forever even though the game
  // is fully rendered underneath it. Poll `iframe.complete` right after mount
  // (and again shortly after) as a fallback so a missed event can't strand
  // the player on a permanent spinner.
  useEffect(() => {
    if (status !== "loading") return;
    let cancelled = false;
    const check = () => {
      if (cancelled) return;
      const el = iframeRef.current;
      if (!el) return;
      try {
        // Same-origin local games: readyState becomes "complete" (or at
        // least "interactive") once the document inside has parsed, even if
        // the native `load` event was missed by React's listener.
        const doc = el.contentDocument;
        if (doc && (doc.readyState === "complete" || doc.readyState === "interactive")) {
          setStatus((s) => (s === "loading" ? "ready" : s));
        }
      } catch {
        // Cross-origin iframe: contentDocument access throws. We can't probe
        // readiness this way; rely on the onLoad/onError handlers and the
        // 12s safety-net timeout above instead.
      }
    };
    check();
    const t1 = setTimeout(check, 150);
    const t2 = setTimeout(check, 600);
    return () => {
      cancelled = true;
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [status, game.gameUrl]);

  useEffect(() => {
    function onFsChange() {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    }
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (!containerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Fullscreen API can be denied by the browser/user; fail silently,
      // no stack trace shown to the user.
    }
  }, []);

  if (!allowed) {
    return (
      <div
        role="alert"
        className="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center"
      >
        <p className="font-semibold text-red-300">
          This game source is not on the approved list and cannot be
          displayed.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black"
    >
      <div className="relative aspect-video w-full">
        {status === "loading" && (
          <div
            role="status"
            aria-live="polite"
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#0b1020]"
          >
            <div
              aria-hidden="true"
              className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500/30 border-t-indigo-500 motion-reduce:animate-none"
            />
            <p className="text-sm text-slate-300">Loading {game.title}…</p>
          </div>
        )}

        {status === "error" && (
          <div
            role="alert"
            className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-[#0b1020] p-6 text-center"
          >
            <p className="font-semibold text-red-300">
              We couldn&apos;t load this game.
            </p>
            <p className="max-w-sm text-sm text-slate-400">
              Please check your connection and try again.
            </p>
            <button
              type="button"
              onClick={retry}
              className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Retry
            </button>
          </div>
        )}

        <iframe
          ref={iframeRef}
          src={game.gameUrl}
          title={`Playable game: ${game.title}`}
          className="h-full w-full border-0 bg-black"
          // Strict sandbox: only what's needed for a self-contained HTML5/JS
          // game to run (scripts + same-origin storage for local high scores).
          // No allow-top-navigation, no allow-popups, no allow-forms.
          sandbox="allow-scripts allow-same-origin"
          onLoad={handleLoad}
          onError={handleError}
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 bg-[#0a0e1c] px-4 py-2 text-xs text-slate-400">
        <span>
          Controls: {game.controls ?? "See in-game instructions"} |
          Orientation: {game.orientation ?? "any"}
        </span>
        <button
          type="button"
          onClick={toggleFullscreen}
          className="rounded-full border border-white/15 px-3 py-1.5 font-medium text-slate-200 hover:bg-white/10"
        >
          {isFullscreen ? "Exit fullscreen" : "Fullscreen"}
        </button>
      </div>
    </div>
  );
}
