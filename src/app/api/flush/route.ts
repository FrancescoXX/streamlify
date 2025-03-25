// app/api/flush/route.ts
import { NextRequest, NextResponse } from "next/server";
import { flushIdeas } from "../../../lib/ideas";

export async function POST(_request: NextRequest) {
  const updatedIdeas = flushIdeas();
  return NextResponse.json(updatedIdeas, { status: 200 });
}