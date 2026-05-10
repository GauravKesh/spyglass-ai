import DashboardContent from "@/components/dashboard/DashboardContent";

import Company from "@/models/Company";

import { connectDB } from "@/lib/mongodb";

async function getCompany(id: string) {
  await connectDB();

  const company =
    await Company.findById(id).lean();

  if (!company) {
    throw new Error(
      "Company not found"
    );
  }

  return JSON.parse(
    JSON.stringify(company)
  );
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  const company =
    await getCompany(id);

  return (
    <DashboardContent
      company={company}
    />
  );
}