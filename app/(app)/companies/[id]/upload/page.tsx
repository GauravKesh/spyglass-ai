"use client";

import { useEffect, useState } from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

export default function UploadPage() {
  const params = useParams();

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [loadingExisting, setLoadingExisting] =
    useState(true);

  const [jsonText, setJsonText] =
    useState(`{
  "name": "SpyGlass AI",
  "website": "https://spyglass.ai",
  "features": [
    "AI competitor analysis",
    "SEO tracking"
  ]
}`);

  useEffect(() => {
    async function loadExistingProfile() {
      try {
        const res = await fetch(
          `/api/companies/${params.id}/user-company`
        );

        const data = await res.json();

        if (res.ok && data.userCompany && Object.keys(data.userCompany).length) {
          setJsonText(JSON.stringify(data.userCompany.rawData || data.userCompany, null, 2));
        }
      } catch {
        // keep default template if no saved profile is available
      } finally {
        setLoadingExisting(false);
      }
    }

    loadExistingProfile();
  }, [params.id]);

  async function handleSave() {
    try {
      setLoading(true);

      const parsed =
        JSON.parse(jsonText);

      const res = await fetch(
        `/api/companies/${params.id}/user-company`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            parsed
          ),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        alert(data.message);

        return;
      }

      alert("Saved");

      router.push(
        `/companies/${params.id}`
      );
    } catch (error) {
      alert("Invalid JSON");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Save My Company Data
        </h1>

        <p className="text-zinc-400 mt-2">
          Save once and reuse across all competitor comparisons. You can still use temporary comparison data later without overwriting this profile.
        </p>
      </div>

      {loadingExisting && (
        <p className="text-zinc-500 text-sm">
          Loading your saved profile...
        </p>
      )}

      <textarea
        value={jsonText}
        onChange={(e) =>
          setJsonText(
            e.target.value
          )
        }
        className="w-full min-h-125 rounded-2xl bg-zinc-900 border border-zinc-800 p-4 font-mono text-sm"
      />

      <button
        onClick={handleSave}
        disabled={loading}
        className="px-6 py-3 rounded-xl bg-white text-black font-semibold"
      >
        {loading
          ? "Saving..."
          : "Save My Data Permanently"}
      </button>
    </div>
  );
}