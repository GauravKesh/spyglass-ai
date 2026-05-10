import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          message: "All fields required",
        },
        {
          status: 400,
        }
      );
    }

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "User already exists",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({
      success: true,
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