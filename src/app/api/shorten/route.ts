import { createHash } from "node:crypto";
import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code || typeof code !== "string") {
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }

    const id = createHash("sha256").update(code).digest("hex").slice(0, 10);

    // Only write if this exact content hasn't been stored before
    await kv.set(`share:${id}`, code, { nx: true });

    return NextResponse.json({ id });
  } catch {
    return NextResponse.json({ error: "Failed to shorten" }, { status: 500 });
  }
}
