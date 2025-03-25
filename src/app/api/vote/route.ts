import { NextRequest, NextResponse } from "next/server";
import { voteIdea } from "../../../lib/ideas"; // Adjusted path

export async function POST(request: NextRequest) {
  const { id }: { id: number } = await request.json();
  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }
  const updatedIdeas = voteIdea(id);
  if (!updatedIdeas.find((i) => i.id === id)) {
    return NextResponse.json({ error: "Idea not found" }, { status: 404 });
  }
  return NextResponse.json(updatedIdeas, { status: 200 });
}