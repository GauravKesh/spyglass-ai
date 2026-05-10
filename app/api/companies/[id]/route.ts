import { NextResponse } from "next/server";

import Company from "@/models/Company";

import { connectDB } from "@/lib/mongodb";

import { getCurrentUser } from "@/lib/auth";

export async function GET(
  req: Request,
  context: any
) {
  try {
    await connectDB();

    const decoded: any =
      await getCurrentUser();

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

    const company =
      await Company.findById(
        context.params.id
      );

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

    return NextResponse.json({
      company,
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