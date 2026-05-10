"use client";

import Navbar from "@/components/shared/Navbar";

import Loader from "@/components/shared/Loader";

import CompanyCard from "@/components/dashboard/CompanyCard";

import { useCompanies } from "@/hooks/useCompanies";

export default function DashboardPage() {
  const {
    companies,
    loading,
  } = useCompanies();

  if (loading) {
    return <Loader />;
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="p-10">
        <h1 className="text-4xl font-bold mb-10">
          Your Intelligence Workspace
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {companies.map((company) => (
            <CompanyCard
              key={(company as any)._id}
              company={company}
            />
          ))}
        </div>
      </div>
    </main>
  );
}