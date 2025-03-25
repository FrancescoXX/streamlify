import { NextRequest, NextResponse } from "next/server";
import { getIdeas, addIdea } from "../../../lib/ideas"; // Adjusted path

export async function GET() {
  return NextResponse.json(getIdeas());
}

export async function POST(request: NextRequest) {
  const { text }: { text: string } = await request.json();
  if (!text) {
    return NextResponse.json({ error: "Text is required" }, { status: 400 });
  }
  const updatedIdeas = addIdea(text);
  return NextResponse.json(updatedIdeas, { status: 201 });
}