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
      className="border rounded-2xl p-6 block hover:border-black transition"
    >
      <h2 className="text-2xl font-bold">
        {company.name}
      </h2>

      <p className="text-gray-500 mt-2">
        {company.summary}
      </p>
    </Link>
  );
}