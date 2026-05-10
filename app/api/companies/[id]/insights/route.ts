import { NextResponse } from "next/server";

import Company from "@/models/Company";

import { connectDB } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/auth";

function normalizeArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [] as string[];
  }

  return value
    .map((item) => String(item).trim())
    .filter(Boolean);
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

    const { id } = await params;

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

    const metadata = company.metadata || {};

    return NextResponse.json({
      success: true,
      insights: {
        summary: {
          title: company.title || company.name || "",
          description: company.description || "",
          pageType: company.pageType || "",
          status: company.status || "",
        },
        market: {
          targetAudience: metadata.targetAudience || "",
          pricing: metadata.pricing || "",
          positioning: metadata.positioning || "",
        },
        signals: {
          strengths: normalizeArray(metadata.strengths),
          weaknesses: normalizeArray(metadata.weaknesses),
          seoKeywords: normalizeArray(metadata.seoKeywords),
          recommendations: normalizeArray(metadata.recommendations),
          growthOpportunities: normalizeArray(metadata.growthOpportunities),
          competitiveAdvantages: normalizeArray(metadata.competitiveAdvantages),
          risks: normalizeArray(metadata.risks),
        },
        userCompany: company.userCompany || {},
      },
    });
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
