import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import User from "@/models/User";

import { connectDB } from "@/lib/mongodb";
import { generateToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Email and password required",
        },
        {
          status: 400,
        }
      );
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid credentials",
        },
        {
          status: 400,
        }
      );
    }

    const isPasswordValid =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          message: "Invalid credentials",
        },
        {
          status: 400,
        }
      );
    }

    const token = generateToken({
      _id: user._id.toString(),
      email: user.email,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
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