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