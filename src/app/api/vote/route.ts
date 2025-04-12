import { NextRequest, NextResponse } from "next/server";
import { voteIdea } from "../../../lib/ideas";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const id = body.id;
    
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    
    const updatedIdeas = voteIdea(id);
    if (!updatedIdeas.find((i) => i.id === id)) {
      return NextResponse.json({ error: "Idea not found" }, { status: 404 });
    }
    
    return NextResponse.json(updatedIdeas, { status: 200 });
  } catch (error) {
    console.error("Error handling vote:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}