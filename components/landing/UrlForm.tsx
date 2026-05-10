"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

const examples = [
  "https://linear.app",
  "https://notion.so",
  "https://perplexity.ai",
];

export default function UrlForm() {
  const router = useRouter();

  const [url, setUrl] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleAnalyze() {
    if (!url.trim()) return;

    try {
      setLoading(true);

      const response = await fetch(
        "/api/analyze",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            url,
          }),
        }
      );

      const data =
        await response.json();

      if (data.company) {
        router.push(
          `/dashboard/${data.company._id}`
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      {/* INPUT CONTAINER */}
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.03] p-5 backdrop-blur-2xl">
        {/* GLOW */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_45%)] pointer-events-none" />

        <div className="relative z-10">
          {/* LABEL */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-lg">
              ✦
            </div>

            <div>
              <h3 className="font-semibold text-lg">
                AI Intelligence Engine
              </h3>

              <p className="text-sm text-white/50">
                Analyze any startup
                instantly
              </p>
            </div>
          </div>

          {/* INPUT */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Paste a startup URL..."
                className="w-full h-16 rounded-2xl border border-white/10 bg-black/40 px-5 pr-12 text-white placeholder:text-white/30 outline-none focus:border-amber-200/40 focus:ring-4 focus:ring-amber-200/10 transition-all"
                value={url}
                onChange={(e) =>
                  setUrl(
                    e.target.value
                  )
                }
              />

              <div className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20">
                ↗
              </div>
            </div>

            {/* BUTTON */}
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="h-16 px-8 rounded-2xl bg-amber-200 text-black font-semibold hover:bg-amber-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed min-w-[180px]"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-black border-t-transparent animate-spin" />

                  <span>
                    Analyzing
                  </span>
                </div>
              ) : (
                "Analyze Startup"
              )}
            </button>
          </div>

          {/* EXAMPLES */}
          <div className="flex flex-wrap items-center gap-3 mt-5">
            <p className="text-sm text-white/40">
              Try:
            </p>

            {examples.map((example) => (
              <button
                key={example}
                onClick={() =>
                  setUrl(example)
                }
                className="px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-sm text-white/60 hover:bg-white/[0.06] hover:text-white transition-all"
              >
                {example.replace(
                  "https://",
                  ""
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}