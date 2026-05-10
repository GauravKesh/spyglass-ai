"use client";

import Link from "next/link";

import Loader from "@/components/shared/Loader";
import { useCompanies } from "@/hooks/useCompanies";

export default function CompaniesPage() {
  const { companies, loading } = useCompanies();

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">
            Companies
          </p>
          <h1 className="text-5xl font-bold">Your Tracked Companies</h1>
          <p className="text-white/50 mt-4 max-w-2xl">
            Review analyzed startups, upload your own company profile, and compare against market signals.
          </p>
        </div>

        {companies.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/3 p-8 text-white/70">
            No companies yet. Go to Analyze Startup to create your first report.
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {companies.map((company: any) => (
              <div
                key={company._id}
                className="rounded-3xl border border-white/10 bg-white/3 p-6 space-y-5"
              >
                <div>
                  <h2 className="text-2xl font-semibold">{company.name}</h2>
                  <p className="text-white/50 mt-2">{company.url}</p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/dashboard/${company._id}`}
                    className="rounded-xl border border-white/20 px-4 py-2 text-sm hover:bg-white/10 transition"
                  >
                    Open Dashboard
                  </Link>
                  <Link
                    href={`/companies/${company._id}`}
                    className="rounded-xl border border-white/20 px-4 py-2 text-sm hover:bg-white/10 transition"
                  >
                    Company Page
                  </Link>
                  <Link
                    href={`/companies/${company._id}/upload`}
                    className="rounded-xl border border-white/20 px-4 py-2 text-sm hover:bg-white/10 transition"
                  >
                    Upload My Data
                  </Link>
                  <Link
                    href={`/companies/${company._id}/compare`}
                    className="rounded-xl border border-white/20 px-4 py-2 text-sm hover:bg-white/10 transition"
                  >
                    Compare
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
