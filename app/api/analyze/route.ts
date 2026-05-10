import { NextResponse } from "next/server";

import Company from "@/models/Company";

import { connectDB } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/auth";

import { crawlWebsite } from "@/lib/anakin";

import { model } from "@/lib/gemini";

import { analysisPrompt } from "@/lib/prompts";

import { safeJSONParse } from "@/lib/utils";

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

    const { url } = body;

    if (!url) {
      return NextResponse.json(
        {
          message: "URL required",
        },
        {
          status: 400,
        }
      );
    }

    const crawlData =
      await crawlWebsite(url);

    const markdown =
      crawlData?.results
        ?.map(
          (page: any) =>
            page.markdown || ""
        )
        .join("\n");

    const prompt =
      analysisPrompt(markdown);

    const result =
      await model.generateContent(
        prompt
      );

    const response =
      result.response.text();

    const parsed =
      safeJSONParse(response);

    if (!parsed) {
      return NextResponse.json(
        {
          message:
            "Failed to parse AI response",
        },
        {
          status: 500,
        }
      );
    }

    const company =
      await Company.create({
        userId: decoded.userId,

        name:
          url
            .replace("https://", "")
            .replace("http://", "")
            .split("/")[0],

        url,

        ...parsed,

        rawMarkdown: markdown,
      });

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