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

export async function GET(req: Request) {
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

    const { searchParams } = new URL(req.url);
    const companyId = searchParams.get("companyId");

    const companies = await Company.find({
      userId: decoded.userId,
    })
      .select("name url metadata userCompany")
      .sort({ createdAt: -1 });

    if (!companyId) {
      return NextResponse.json({
        success: true,
        competitors: companies,
      });
    }

    const currentCompany = companies.find(
      (company: any) => String(company._id) === companyId
    );

    if (!currentCompany) {
      return NextResponse.json(
        {
          message: "Company not found",
        },
        {
          status: 404,
        }
      );
    }

    const namedCompetitors = normalizeArray(
      currentCompany.userCompany?.competitors
    );

    const databaseMatches = companies
      .filter(
        (company: any) =>
          String(company._id) !== companyId
      )
      .map((company: any) => ({
        id: company._id,
        name: company.name,
        url: company.url,
      }));

    return NextResponse.json({
      success: true,
      namedCompetitors,
      databaseMatches,
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
