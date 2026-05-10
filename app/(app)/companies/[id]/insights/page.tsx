"use client";

import { useCallback, useEffect, useState } from "react";

import Link from "next/link";
import { useParams } from "next/navigation";

type InsightsPayload = {
  success?: boolean;
  message?: string;
  insights?: {
    summary?: {
      title?: string;
      description?: string;
      pageType?: string;
      status?: string;
    };
    market?: {
      targetAudience?: string;
      pricing?: string;
      positioning?: string;
    };
    signals?: {
      strengths?: string[];
      weaknesses?: string[];
      seoKeywords?: string[];
      recommendations?: string[];
      growthOpportunities?: string[];
      competitiveAdvantages?: string[];
      risks?: string[];
    };
  };
};

type SignalKey =
  | "strengths"
  | "weaknesses"
  | "seoKeywords"
  | "recommendations"
  | "growthOpportunities"
  | "competitiveAdvantages"
  | "risks";

type SignalSection = {
  key: SignalKey;
  title: string;
  toneClass: string;
};

type ImprovementItem = {
  title: string;
  why: string;
  priority: "High" | "Medium" | "Low";
  impact: "High" | "Medium";
};

const sections: SignalSection[] = [
  {
    key: "strengths",
    title: "Strengths",
    toneClass: "bg-emerald-300",
  },
  {
    key: "weaknesses",
    title: "Weaknesses",
    toneClass: "bg-rose-300",
  },
  {
    key: "growthOpportunities",
    title: "Growth Opportunities",
    toneClass: "bg-sky-300",
  },
  {
    key: "competitiveAdvantages",
    title: "Competitive Advantages",
    toneClass: "bg-lime-300",
  },
  {
    key: "risks",
    title: "Risks",
    toneClass: "bg-orange-300",
  },
  {
    key: "recommendations",
    title: "Recommendations",
    toneClass: "bg-amber-200",
  },
  {
    key: "seoKeywords",
    title: "SEO Keywords",
    toneClass: "bg-violet-300",
  },
];

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function getPriorityStyles(priority: ImprovementItem["priority"]) {
  if (priority === "High") {
    return "border-rose-300/30 bg-rose-300/10 text-rose-100";
  }

  if (priority === "Medium") {
    return "border-amber-200/30 bg-amber-200/10 text-amber-100";
  }

  return "border-sky-300/30 bg-sky-300/10 text-sky-100";
}

export default function CompanyInsightsPage() {
  const params = useParams();
  const companyId =
    typeof params.id === "string"
      ? params.id
      : "";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState<InsightsPayload | null>(null);

  const fetchInsightsCore = useCallback(async () => {
    if (!companyId) {
      throw new Error("Invalid company id");
    }

    const response = await fetch(
      `/api/companies/${companyId}/insights`
    );
    const json: InsightsPayload =
      await response.json();

    if (!response.ok) {
      throw new Error(
        json.message ||
          "Failed to fetch insights"
      );
    }

    return json;
  }, [companyId]);

  async function loadInsightsForRetry() {
    try {
      setLoading(true);
      setError("");

      const json = await fetchInsightsCore();
      setData(json);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load insights"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function loadOnMount() {
      try {
        const json = await fetchInsightsCore();
        setData(json);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load insights"
        );
      } finally {
        setLoading(false);
      }
    }

    loadOnMount();
  }, [fetchInsightsCore]);

  if (loading) {
    return (
      <div className="h-full overflow-y-auto">
        <div className="max-w-6xl mx-auto p-8 space-y-6 animate-pulse">
          <div className="h-5 w-28 rounded bg-white/10" />
          <div className="h-12 w-2/3 rounded bg-white/10" />
          <div className="h-4 w-4/5 rounded bg-white/10" />

          <div className="grid md:grid-cols-3 gap-4 pt-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-28 rounded-2xl border border-white/10 bg-white/3"
              />
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-44 rounded-2xl border border-white/10 bg-white/3"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8">
          <div className="rounded-2xl border border-rose-300/30 bg-rose-300/10 p-6 space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-rose-200/90">
              Insights Error
            </p>
            <p className="text-rose-100">{error}</p>
            <button
              onClick={loadInsightsForRetry}
              className="rounded-xl border border-rose-200/40 px-4 py-2 text-sm text-rose-100 hover:bg-rose-200/10 transition"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const insights = data?.insights;
  const strengths = insights?.signals?.strengths || [];
  const weaknesses = insights?.signals?.weaknesses || [];
  const seoKeywords = insights?.signals?.seoKeywords || [];
  const recommendations = insights?.signals?.recommendations || [];
  const opportunities = insights?.signals?.growthOpportunities || [];
  const competitiveAdvantages = insights?.signals?.competitiveAdvantages || [];
  const risks = insights?.signals?.risks || [];

  const signalCount = sections.reduce(
    (total, section) =>
      total + (insights?.signals?.[section.key]?.length || 0),
    0
  );

  const insightHealthScore = clamp(
    50 +
      strengths.length * 6 +
      competitiveAdvantages.length * 5 +
      opportunities.length * 4 -
      weaknesses.length * 5 -
      risks.length * 6,
    10,
    95
  );

  const seoReadinessScore = clamp(
    seoKeywords.length * 14 +
      recommendations.filter((item) =>
        item.toLowerCase().includes("seo")
      ).length * 10,
    0,
    100
  );

  const strategicCoverage = clamp(
    signalCount * 4,
    10,
    100
  );

  const executionPressure = clamp(
    (weaknesses.length + risks.length) * 10,
    0,
    100
  );

  const improvementPlan: ImprovementItem[] = [
    ...recommendations.slice(0, 3).map((item) => ({
      title: item,
      why: "Directly identified by the analysis engine as a strategic lever.",
      priority: "High" as const,
      impact: "High" as const,
    })),
    ...opportunities.slice(0, 2).map((item) => ({
      title: `Capture growth opportunity: ${item}`,
      why: "Improves long-term growth posture and market expansion potential.",
      priority: "Medium" as const,
      impact: "High" as const,
    })),
    ...risks.slice(0, 2).map((item) => ({
      title: `Mitigate risk: ${item}`,
      why: "Reducing this risk lowers execution drag and competitive exposure.",
      priority: "High" as const,
      impact: "Medium" as const,
    })),
  ].slice(0, 7);

  const quickWins = [
    ...seoKeywords.slice(0, 3).map((kw) =>
      `Create landing/content pages around '${kw}'`
    ),
    ...weaknesses.slice(0, 2).map((weakness) =>
      `Fix messaging gap: ${weakness}`
    ),
  ].slice(0, 5);

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto p-8 space-y-8">
        <div className="rounded-3xl border border-white/10 bg-white/3 p-8 space-y-5">
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">
            Insights
          </p>
          <h1 className="text-4xl md:text-5xl font-bold">
            {insights?.summary?.title || "Company Insights"}
          </h1>
          <p className="text-white/60 leading-relaxed max-w-4xl">
            {insights?.summary?.description ||
              "No description available."}
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <span className="rounded-full border border-white/15 bg-white/4 px-4 py-2 text-xs uppercase tracking-[0.15em] text-white/70">
              Page: {insights?.summary?.pageType || "N/A"}
            </span>
            <span className="rounded-full border border-white/15 bg-white/4 px-4 py-2 text-xs uppercase tracking-[0.15em] text-white/70">
              Status: {insights?.summary?.status || "N/A"}
            </span>
            <span className="rounded-full border border-white/15 bg-white/4 px-4 py-2 text-xs uppercase tracking-[0.15em] text-white/70">
              Total Signals: {signalCount}
            </span>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href={`/dashboard/${companyId}`}
              className="rounded-xl border border-white/20 px-4 py-2 text-sm hover:bg-white/10 transition"
            >
              Open Dashboard
            </Link>
            <Link
              href={`/companies/${companyId}/compare`}
              className="rounded-xl border border-white/20 px-4 py-2 text-sm hover:bg-white/10 transition"
            >
              Compare
            </Link>
            <Link
              href={`/companies/${companyId}/upload`}
              className="rounded-xl border border-white/20 px-4 py-2 text-sm hover:bg-white/10 transition"
            >
              Upload My Data
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/3 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2">
              Audience
            </p>
            <p className="text-white/85 leading-relaxed">
              {insights?.market?.targetAudience || "N/A"}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/3 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2">
              Pricing
            </p>
            <p className="text-white/85 leading-relaxed">
              {insights?.market?.pricing || "N/A"}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/3 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2">
              Positioning
            </p>
            <p className="text-white/85 leading-relaxed">
              {insights?.market?.positioning || "N/A"}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          {[
            {
              label: "Insight Health",
              value: `${insightHealthScore}%`,
              hint: "Strength vs weakness balance",
            },
            {
              label: "SEO Readiness",
              value: `${seoReadinessScore}%`,
              hint: "Keyword + SEO recommendation depth",
            },
            {
              label: "Strategic Coverage",
              value: `${strategicCoverage}%`,
              hint: "How much strategic signal is captured",
            },
            {
              label: "Execution Pressure",
              value: `${executionPressure}%`,
              hint: "Weakness + risk burden to resolve",
            },
          ].map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-white/10 bg-white/3 p-5"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-2">
                {metric.label}
              </p>
              <p className="text-3xl font-semibold text-white">{metric.value}</p>
              <p className="text-white/50 text-sm mt-2">{metric.hint}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/3 p-6">
            <h2 className="text-xl font-semibold mb-4">Improvement Plan</h2>
            {improvementPlan.length ? (
              <div className="space-y-3">
                {improvementPlan.map((item, index) => (
                  <div
                    key={`${item.title}-${index}`}
                    className="rounded-xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-[11px] uppercase tracking-[0.15em] ${getPriorityStyles(item.priority)}`}
                      >
                        {item.priority}
                      </span>
                      <span className="rounded-full border border-white/15 bg-white/4 px-2.5 py-1 text-[11px] uppercase tracking-[0.15em] text-white/70">
                        Impact {item.impact}
                      </span>
                    </div>
                    <p className="text-white/90 font-medium leading-relaxed">{item.title}</p>
                    <p className="text-white/55 text-sm mt-2 leading-relaxed">{item.why}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/50">No recommendations available yet.</p>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/3 p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Wins (Next 7 Days)</h2>
            {quickWins.length ? (
              <ul className="space-y-3 text-white/85">
                {quickWins.map((item, index) => (
                  <li
                    key={`${item}-${index}`}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-200" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white/50">Add more signals to generate quick wins.</p>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {sections.map((section) => {
            const list = insights?.signals?.[section.key] || [];

            return (
              <div
                key={section.key}
                className="rounded-2xl border border-white/10 bg-white/3 p-6"
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                  <span className="text-xs uppercase tracking-[0.2em] text-white/50">
                    {list.length}
                  </span>
                </div>

                {list.length ? (
                  section.key === "seoKeywords" ? (
                    <div className="flex flex-wrap gap-2">
                      {list.map((item, index) => (
                        <span
                          key={`${section.key}-${index}`}
                          className="rounded-full border border-white/15 bg-white/4 px-3 py-1.5 text-sm text-white/85"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <ul className="space-y-2 text-white/85">
                      {list.map((item, index) => (
                        <li
                          key={`${section.key}-${index}`}
                          className="flex items-start gap-3"
                        >
                          <span
                            className={`mt-2 h-1.5 w-1.5 rounded-full ${section.toneClass}`}
                          />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )
                ) : (
                  <p className="text-white/50">No data available.</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
