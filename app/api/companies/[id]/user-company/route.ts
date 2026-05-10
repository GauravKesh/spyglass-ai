import { NextResponse } from "next/server";

import Company from "@/models/Company";
import User from "@/models/User";

import { connectDB } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/auth";

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

    const user = await User.findById(decoded.userId);

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      userCompany:
        user.companyProfile ||
        company.userCompany ||
        {},
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

    const body = await req.json();

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

    const user = await User.findById(decoded.userId);

    if (!user) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    user.companyProfile = {
      ...body,
      rawData: body,
      updatedAt: new Date().toISOString(),
    };

    await user.save();

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
        message: "Server error",
      },
      {
        status: 500,
      }
    );
  }
}
