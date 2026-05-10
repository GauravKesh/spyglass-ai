import { NextResponse } from "next/server";

import User from "@/models/User";

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

    const user = await User.findById(
      decoded.userId
    ).select("-password");

    return NextResponse.json({
      user,
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