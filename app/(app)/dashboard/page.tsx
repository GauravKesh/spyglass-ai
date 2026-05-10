"use client";

import UrlForm from "@/components/landing/UrlForm";

import Loader from "@/components/shared/Loader";

import CompanyCard from "@/components/dashboard/CompanyCard";

import { useCompanies } from "@/hooks/useCompanies";

import { useSearchParams } from "next/navigation";

export default function DashboardPage() {
  const {
    companies,
    loading,
  } = useCompanies();

  const searchParams =
    useSearchParams();

  const showAnalyze =
    searchParams.get(
      "analyze"
    ) === "1";

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto p-8">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">
              Workspace
            </p>

            <h1 className="text-5xl font-bold">
              Intelligence Workspace
            </h1>

            <p className="text-white/50 mt-4 max-w-2xl">
              Analyze competitors,
              track positioning, and
              chat with your AI market
              analyst.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 min-w-[240px]">
            <p className="text-white/50 text-sm">
              Active Reports
            </p>

            <h2 className="text-5xl font-bold mt-3">
              {companies.length}
            </h2>
          </div>
        </div>

        {/* ANALYZE */}
        {showAnalyze && (
          <div className="mb-10">
            <UrlForm />
          </div>
        )}

        {/* GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-10">
          {companies.map((company) => (
            <CompanyCard
              key={company._id}
              company={company}
            />
          ))}
        </div>
      </div>
    </div>
  );
}