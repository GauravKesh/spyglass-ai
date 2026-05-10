import Navbar from "@/components/shared/Navbar";

import SummaryCard from "@/components/dashboard/SummaryCard";

import SWOTCard from "@/components/dashboard/SWOTCard";

import FeatureTable from "@/components/dashboard/FeatureTable";

import SEOCard from "@/components/dashboard/SEOCard";

import PricingCard from "@/components/dashboard/PricingCard";

import PositioningCard from "@/components/dashboard/PositioningCard";

import RecommendationsCard from "@/components/dashboard/RecommendationsCard";

import ChatPanel from "@/components/chat/ChatPanel";

async function getCompany(
  id: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/companies/${id}`,
    {
      cache: "no-store",
    }
  );

  return response.json();
}

export default async function CompanyPage({
  params,
}: any) {
  const data = await getCompany(
    params.id
  );

  const company = data.company;

  return (
    <main className="min-h-screen">
      <Navbar />

      <div className="p-10 space-y-8">
        <h1 className="text-5xl font-bold">
          {company.name}
        </h1>

        <SummaryCard
          summary={company.summary}
        />

        <div className="grid md:grid-cols-2 gap-6">
          <PricingCard
            pricing={company.pricing}
          />

          <PositioningCard
            positioning={
              company.positioning
            }
          />
        </div>

        <FeatureTable
          features={company.features}
        />

        <SWOTCard
          strengths={
            company.strengths
          }
          weaknesses={
            company.weaknesses
          }
        />

        <SEOCard
          keywords={
            company.seoKeywords
          }
        />

        <RecommendationsCard
          recommendations={
            company.recommendations
          }
        />

        <ChatPanel
          companyId={company._id}
        />
      </div>
    </main>
  );
}