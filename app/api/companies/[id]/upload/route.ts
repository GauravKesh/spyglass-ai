import { NextResponse } from "next/server";

import Company from "@/models/Company";

import { connectDB } from "@/lib/mongodb";

import { getCurrentUser } from "@/lib/auth";

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
    await connectDB();

    const decoded: any =
      await getCurrentUser();

    if (!decoded) {
      return NextResponse.json(
        {
          message:
            "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const body =
      await req.json();

    const { id } =
      await params;

    const company =
      await Company.findOne({
        _id: id,

        userId:
          decoded.userId,
      });

    if (!company) {
      return NextResponse.json(
        {
          message:
            "Company not found",
        },
        {
          status: 404,
        }
      );
    }

    company.userCompany = {
      ...body,

      rawData: body,
    };

    await company.save();

    return NextResponse.json({
      success: true,

      company,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        message:
          "Server error",
      },
      {
        status: 500,
      }
    );
  }
}