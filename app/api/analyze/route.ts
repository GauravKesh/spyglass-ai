import fs from "fs/promises";
import path from "path";

import { NextResponse } from "next/server";

import Company from "@/models/Company";

import { connectDB } from "@/lib/mongodb";
import { getCurrentUser } from "@/lib/auth";

const BASE = "https://api.anakin.io/v1";

const API_KEY = process.env.ANAKIN_API_KEY;

if (!API_KEY) {
  throw new Error("ANAKIN_API_KEY is not set");
}

export const maxDuration = 300;

type Job = {
  id: string;
  status: "pending" | "completed" | "failed";
  markdown?: string;
  generatedJson?: any;
  error?: string;
};

async function request(method: string, pathName: string, body?: any) {
  try {
    const resp = await fetch(BASE + pathName, {
      method,
      headers: {
        "X-API-Key": API_KEY,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(30000),
    });

    const text = await resp.text();

    let data: any = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = text;
    }

    await saveDebugLog({
      type: "anakin_api",
      request: { method, url: BASE + pathName, body },
      response: { status: resp.status, ok: resp.ok, data },
    });

    if (!resp.ok) {
      console.log("Anakin Error:", data);
      return null;
    }

    return data;
  } catch (error) {
    console.log("Fetch Error:", error);
    await saveDebugLog({
      type: "fetch_error",
      error: error instanceof Error ? error.message : error,
    });
    return null;
  }
}

async function saveDebugLog(data: any) {
  try {
    const logsDir = path.join(process.cwd(), "logs");
    await fs.mkdir(logsDir, { recursive: true });
    const fileName = `anakin-${Date.now()}.json`;
    const filePath = path.join(logsDir, fileName);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    console.log("Saved log:", filePath);
  } catch (error) {
    console.log("Failed to save log:", error);
  }
}

async function scrapeWebsite(url: string): Promise<Job> {
  const submitted = await request("POST", "/url-scraper", {
    url,
    generateJson: true,
    useBrowser: true,
  });

  if (!submitted?.jobId) {
    throw new Error("Failed to submit scrape job");
  }

  const jobId = submitted.jobId;

  for (let i = 0; i < 60; i++) {
    const job = await request("GET", `/url-scraper/${jobId}`);

    if (!job) {
      await new Promise((r) => setTimeout(r, 3000));
      continue;
    }

    if (job.status === "completed") return job;
    if (job.status === "failed") throw new Error(`Scrape failed: ${job.error}`);

    await new Promise((r) => setTimeout(r, 3000));
  }

  throw new Error("Timed out after 3 minutes");
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const decoded: any = await getCurrentUser();

    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ message: "URL required" }, { status: 400 });
    }

    const scrapeData = await scrapeWebsite(url);

    await saveDebugLog({ type: "scrape_result", url, scrapeData });

    // FIX: unwrap .data from generatedJson
    const aiData = scrapeData.generatedJson?.data;

    if (!aiData) {
      return NextResponse.json(
        { message: "Failed to generate structured data" },
        { status: 400 }
      );
    }

    const dbPayload = {
      userId:      decoded.userId,
      name:        aiData.title || new URL(url).hostname,
      url,
      status:      scrapeData.generatedJson?.status || "",
      title:       aiData.title       || "",
      description: aiData.description || "",
      pageType:    aiData.pageType    || "",
      links:       aiData.links       || [],
      sections:    aiData.sections    || [],
      metadata:    aiData.metadata    || {},
      rawMarkdown: scrapeData.markdown || "",
      aiRawData:   scrapeData.generatedJson,
    };

    await saveDebugLog({ type: "db_payload", payload: dbPayload });

    const company = await Company.create(dbPayload);

    return NextResponse.json({ success: true, company });
  } catch (error) {
    console.log("SERVER ERROR:", error);

    await saveDebugLog({
      type: "server_error",
      error: error instanceof Error ? error.message : error,
    });

    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Server error" },
      { status: 500 }
    );
  }
}