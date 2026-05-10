
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function UploadPage() {
  const params = useParams();

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [jsonText, setJsonText] =
    useState(`{
  "name": "SpyGlass AI",
  "website": "https://spyglass.ai",
  "features": [
    "Competitor analysis",
    "SEO tracking"
  ]
}`);

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

          body: JSON.stringify(parsed),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        alert(data.message);

        return;
      }

      alert("Saved successfully");

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
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Upload Startup Data
        </h1>

        <p className="text-zinc-400 mt-2">
          Paste your startup JSON.
        </p>
      </div>

      <textarea
        value={jsonText}
        onChange={(e) =>
          setJsonText(e.target.value)
        }
        className="w-full min-h-[500px] rounded-xl bg-zinc-900 border border-zinc-800 p-4 font-mono text-sm"
      />

      <button
        onClick={handleSave}
        disabled={loading}
        className="px-6 py-3 rounded-xl bg-white text-black font-semibold"
      >
        {loading
          ? "Saving..."
          : "Save Startup Data"}
      </button>
    </div>
  );
}
```

---

# app/api/companies/[id]/user-company/route.ts

```ts
import { NextResponse } from "next/server";

import Company from "@/models/Company";

import { connectDB } from "@/lib/mongodb";

import { getCurrentUser } from "@/lib/auth";

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    await connectDB();

    const decoded: any =
      await getCurrentUser();

    if (!decoded) {
      return NextResponse.json(
        {
          message:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const body = await req.json();

    const { id } = await params;

    const company =
      await Company.findOne({
        _id: id,

        userId:
          decoded.userId,
      });

    if (!company) {
      return NextResponse.json(
        {
          message:
            "Company not found",
        },
        {
          status: 404,
        }
      );
    }

    company.userCompany = {
      ...body,

      rawData: body,
    };

    await company.save();

    return NextResponse.json({
      success: true,

      company,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}
```

---

# app/(app)/companies/[id]/compare/page.tsx

```tsx
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
    <div className="p-6 max-w-6xl mx-auto space-y-8">
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
```

---

# app/api/companies/[id]/compare/route.ts

```ts
import { NextResponse } from "next/server";

import Company from "@/models/Company";

import { connectDB } from "@/lib/mongodb";

import { getCurrentUser } from "@/lib/auth";

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    await connectDB();

    const decoded: any =
      await getCurrentUser();

    if (!decoded) {
      return NextResponse.json(
        {
          message:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const { id } = await params;

    const company =
      await Company.findOne({
        _id: id,

        userId:
          decoded.userId,
      });

    if (!company) {
      return NextResponse.json(
        {
          message:
            "Company not found",
        },
        {
          status: 404,
        }
      );
    }

    const competitorFeatures =
      company.features || [];

    const userFeatures =
      company.userCompany
        ?.features || [];

    const missingFeatures =
      competitorFeatures.filter(
        (feature: string) =>
          !userFeatures.includes(
            feature
          )
      );

    const extraFeatures =
      userFeatures.filter(
        (feature: string) =>
          !competitorFeatures.includes(
            feature
          )
      );

    return NextResponse.json({
      advantages:
        extraFeatures,

      weaknesses:
        missingFeatures,

      recommendations: [
        "Improve positioning clarity",

        "Add SEO-focused landing pages",

        "Highlight differentiators more clearly",
      ],
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}
```

---

# Add To models/Company.ts

```ts
userCompany: {
  type: {
    name: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    tagline: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    positioning: {
      type: String,
      default: "",
    },

    targetAudience: {
      type: String,
      default: "",
    },

    pricing: {
      type: String,
      default: "",
    },

    features: {
      type: [String],
      default: [],
    },

    strengths: {
      type: [String],
      default: [],
    },

    weaknesses: {
      type: [String],
      default: [],
    },

    differentiators: {
      type: [String],
      default: [],
    },

    seoKeywords: {
      type: [String],
      default: [],
    },

    rawData: {
      type:
        mongoose.Schema.Types.Mixed,

      default: {},
    },
  },

  default: {},
},
```

---

# Add Button In app/(app)/companies/[id]/page.tsx

```tsx
<div className="flex gap-4 mt-6">
  <Link
    href={`/companies/${company._id}/upload`}
    className="px-5 py-3 rounded-xl bg-white text-black font-semibold"
  >
    Upload Startup Data
  </Link>

  <Link
    href={`/companies/${company._id}/compare`}
    className="px-5 py-3 rounded-xl border border-zinc-700"
  >
    Compare
  </Link>
</div>
```
