import Link from "next/link";
import { notFound } from "next/navigation";

import Company from "@/models/Company";

import { connectDB } from "@/lib/mongodb";

async function getCompany(id: string) {
  await connectDB();

  const company = await Company.findById(id).lean();

  if (!company) {
    return null;
  }

  return JSON.parse(JSON.stringify(company));
}

export default async function CompanyProfilePage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;
  const company = await getCompany(id);

  if (!company) {
    notFound();
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto p-8 space-y-8">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4">
            Company Profile
          </p>
          <h1 className="text-5xl font-bold">{company.name}</h1>
          <p className="text-white/50 mt-4">{company.url}</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/3 p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Summary</h2>
          <p className="text-white/70 leading-relaxed">
            {company.description || "No description available yet."}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href={`/dashboard/${company._id}`}
            className="rounded-xl border border-white/20 px-4 py-2 text-sm hover:bg-white/10 transition"
          >
            Open Dashboard
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
            Compare with Competitor
          </Link>
        </div>
      </div>
    </div>
  );
}
