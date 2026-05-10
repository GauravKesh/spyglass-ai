"use client";

import {
  useEffect,
  useState,
} from "react";

import { useParams } from "next/navigation";

export default function ComparePage() {
  const params = useParams();

  const [data, setData] =
    useState<any>(null);

  const [tempMode, setTempMode] =
    useState(false);

  const [tempJson, setTempJson] =
    useState(`{
  "name": "Temporary Company",
  "strengths": ["Fast onboarding", "Strong product velocity"],
  "weaknesses": ["Low SEO visibility"],
  "differentiators": ["AI-first UX"]
}`);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchCompare();
  }, []);

  async function fetchCompare() {
    try {
      const res = await fetch(
        `/api/companies/${params.id}/compare`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: tempMode
            ? JSON.stringify({
                temporaryProfile: JSON.parse(tempJson),
              })
            : undefined,
        }
      );

      const json =
        await res.json();

      setData(json);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Competitor Comparison
        </h1>

        <p className="text-zinc-400 mt-2">
          Uses your saved profile by default. Toggle temporary mode to run one-off comparisons without changing saved data.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 space-y-4">
        <div className="flex items-center gap-3">
          <input
            id="temp-mode"
            type="checkbox"
            checked={tempMode}
            onChange={(e) =>
              setTempMode(
                e.target.checked
              )
            }
          />
          <label htmlFor="temp-mode" className="text-sm text-zinc-300">
            Use temporary profile for this comparison only
          </label>
        </div>

        {tempMode && (
          <textarea
            value={tempJson}
            onChange={(e) =>
              setTempJson(e.target.value)
            }
            className="w-full min-h-48 rounded-xl bg-zinc-950 border border-zinc-800 p-4 font-mono text-sm"
          />
        )}

        <button
          onClick={() => {
            setLoading(true);
            fetchCompare();
          }}
          className="px-5 py-2 rounded-lg bg-white text-black text-sm font-semibold"
        >
          Run Comparison
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            Advantages
          </h2>

          <ul className="space-y-2">
            {data.advantages?.map(
              (
                item: string,
                i: number
              ) => (
                <li key={i}>
                  • {item}
                </li>
              )
            )}
          </ul>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            Weaknesses
          </h2>

          <ul className="space-y-2">
            {data.weaknesses?.map(
              (
                item: string,
                i: number
              ) => (
                <li key={i}>
                  • {item}
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">
          Recommendations
        </h2>

        <p className="text-xs text-zinc-500 mb-4 uppercase tracking-[0.2em]">
          Source: {data.profileSource || "saved"}
        </p>

        <ul className="space-y-2">
          {data.recommendations?.map(
            (
              item: string,
              i: number
            ) => (
              <li key={i}>
                • {item}
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}