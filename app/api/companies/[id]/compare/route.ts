import { NextResponse } from "next/server";

import Company from "@/models/Company";
import User from "@/models/User";

import { connectDB } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/auth";

type ComparisonPayload = {
  advantages: string[];
  weaknesses: string[];
  recommendations: string[];
};

function normalizeArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [] as string[];
  }

  return value
    .map((item) => String(item).trim())
    .filter(Boolean);
}

function buildComparison(company: any, baseProfile: any): ComparisonPayload {
  const userCompany = baseProfile || {};
  const metadata = company.metadata || {};

  const userStrengths = normalizeArray(userCompany.strengths);
  const userWeaknesses = normalizeArray(userCompany.weaknesses);
  const userDifferentiators = normalizeArray(userCompany.differentiators);
  const marketWeaknesses = normalizeArray(metadata.weaknesses);
  const marketAdvantages = normalizeArray(metadata.competitiveAdvantages);
  const marketRecommendations = normalizeArray(metadata.recommendations);

  const advantages = [
    ...userDifferentiators,
    ...userStrengths.map((item) => `Your strength: ${item}`),
    ...marketWeaknesses.slice(0, 2).map((item) => `Competitor weakness to exploit: ${item}`),
    ...marketAdvantages.slice(0, 2).map((item) => `Competitor edge to account for: ${item}`),
  ].slice(0, 6);

  const weaknesses = [
    ...userWeaknesses,
    ...marketAdvantages.slice(0, 3).map((item) => `Potential pressure point: ${item}`),
  ].slice(0, 6);

  const recommendations = [
    ...marketRecommendations,
    "Clarify your value proposition against competitor positioning.",
    "Package your differentiators into pricing and landing-page copy.",
    "Use competitor keyword gaps to prioritize SEO content.",
  ].slice(0, 8);

  return {
    advantages: advantages.length
      ? advantages
      : ["Upload your company profile to unlock comparison advantages."],
    weaknesses: weaknesses.length
      ? weaknesses
      : ["Add your weaknesses/risks in upload data to generate targeted analysis."],
    recommendations,
  };
}

async function compareById(id: string, temporaryProfile?: any) {
  await connectDB();

  const decoded: any = await getCurrentUser();

  if (!decoded) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const company = await Company.findOne({
    _id: id,
    userId: decoded.userId,
  });

  if (!company) {
    return NextResponse.json(
      {
        message: "Company not found",
      },
      {
        status: 404,
      }
    );
  }

  const user = await User.findById(decoded.userId);

  const persistentProfile = user?.companyProfile || {};

  const selectedProfile = temporaryProfile && Object.keys(temporaryProfile).length
    ? temporaryProfile
    : persistentProfile && Object.keys(persistentProfile).length
    ? persistentProfile
    : company.userCompany || {};

  return NextResponse.json({
    ...buildComparison(company, selectedProfile),
    profileSource: temporaryProfile && Object.keys(temporaryProfile).length
      ? "temporary"
      : persistentProfile && Object.keys(persistentProfile).length
      ? "saved"
      : "company-fallback",
  });
}

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
    const { id } = await params;

    let temporaryProfile: any = null;

    try {
      const body = await req.json();
      temporaryProfile = body?.temporaryProfile || null;
    } catch {
      temporaryProfile = null;
    }

    return await compareById(id, temporaryProfile);
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

export async function GET(
  _req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    const { id } = await params;
    return await compareById(id);
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
