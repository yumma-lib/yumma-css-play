import { Redis } from "@upstash/redis";
import { type NextRequest, NextResponse } from "next/server";

const redis = Redis.fromEnv();
const TTL_SECONDS = 90 * 24 * 60 * 60; // 90 days

// GET /api/share?id
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id || id.length !== 10) {
      return NextResponse.json({ error: "Invalid share ID" }, { status: 400 });
    }

    const code = await redis.get<string>(`share:${id}`);

    if (!code) {
      return NextResponse.json({ error: "Share not found" }, { status: 404 });
    }

    return NextResponse.json({ code });
  } catch (error) {
    console.error("Error fetching share:", error);
    return NextResponse.json(
      { error: "Failed to fetch share" },
      { status: 500 },
    );
  }
}

// POST /api/share
export async function POST(request: NextRequest) {
  try {
    const { id, code } = await request.json();

    if (!id || !code || id.length !== 10) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    await redis.setex(`share:${id}`, TTL_SECONDS, code);

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("Error creating share:", error);
    return NextResponse.json(
      { error: "Failed to create share" },
      { status: 500 },
    );
  }
}
