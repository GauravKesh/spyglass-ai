import { NextResponse } from "next/server";

import Company from "@/models/Company";
import Chat from "@/models/Chat";

import { connectDB } from "@/lib/mongodb";

import { getCurrentUser } from "@/lib/auth";

import { model } from "@/lib/gemini";

import { chatPrompt } from "@/lib/prompts";

export async function POST(req: Request) {
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

    const body = await req.json();

    const {
      companyId,
      question,
    } = body;

    const company =
      await Company.findById(
        companyId
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

    const prompt = chatPrompt(
      JSON.stringify(company),
      question
    );

    const result =
      await model.generateContent(
        prompt
      );

    const answer =
      result.response.text();

    await Chat.create({
      companyId,
      userId: decoded.userId,
      role: "user",
      message: question,
    });

    await Chat.create({
      companyId,
      userId: decoded.userId,
      role: "assistant",
      message: answer,
    });

    return NextResponse.json({
      answer,
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