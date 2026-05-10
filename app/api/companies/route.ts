import { NextResponse } from "next/server";

import Company from "@/models/Company";

import { connectDB } from "@/lib/mongodb";

import { getCurrentUser } from "@/lib/auth";

export async function GET() {
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

    const companies =
      await Company.find({
        userId: decoded.userId,
      }).sort({
        createdAt: -1,
      });

    return NextResponse.json({
      companies,
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