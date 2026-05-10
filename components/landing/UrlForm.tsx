"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

export default function UrlForm() {
  const router = useRouter();

  const [url, setUrl] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleAnalyze() {
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

    setLoading(false);

    if (data.company) {
      router.push(
        `/dashboard/${data.company._id}`
      );
    }
  }

  return (
    <div className="max-w-2xl mx-auto flex gap-4">
      <input
        type="text"
        placeholder="Enter startup URL..."
        className="flex-1 border p-4 rounded-xl"
        value={url}
        onChange={(e) =>
          setUrl(e.target.value)
        }
      />

      <button
        onClick={handleAnalyze}
        className="bg-black text-white px-6 rounded-xl"
      >
        {loading
          ? "Analyzing..."
          : "Analyze"}
      </button>
    </div>
  );
}