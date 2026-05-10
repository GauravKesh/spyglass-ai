"use client";

import Link from "next/link";

export default function CompanyCard({
  company,
}: {
  company: any;
}) {
  return (
    <Link
      href={`/dashboard/${company._id}`}
      className="group border border-white/10 rounded-2xl p-6 block bg-white/5 hover:border-white/40 hover:bg-white/10 transition"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">{company.name}</h2>
        <span className="text-xs uppercase tracking-[0.3em] text-white/40 group-hover:text-white/70 transition">
          View
        </span>
      </div>

      <p className="text-white/60 mt-3">
        {company.summary}
      </p>
    </Link>
  );
}