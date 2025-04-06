"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";

interface Idea {
  id: number;
  text: string;
  votes: number;
}

export default function Home() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [newIdea, setNewIdea] = useState<string>("");

  useEffect(() => {
    fetch("/api/ideas")
      .then((res) => res.json())
      .then((data: Idea[]) => setIdeas(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIdea.trim()) return;

    const response = await fetch("/api/ideas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newIdea }),
    });
    const updatedIdeas: Idea[] = await response.json();
    setIdeas(updatedIdeas);
    setNewIdea("");
  };

  const handleVote = async (id: number) => {
    const response = await fetch("/api/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const updatedIdeas: Idea[] = await response.json();
    setIdeas(updatedIdeas);
  };

  const handleFlush = async () => {
    const response = await fetch("/api/flush", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    const updatedIdeas: Idea[] = await response.json();
    setIdeas(updatedIdeas);
  };

  return (
    <main className="main">
      <SignedIn>
        <div style={{ textAlign: "right", marginBottom: "20px" }}>
          <UserButton />
        </div>
        <h1 className="title">Streamlify</h1>
        <p className="motto">Extreamly good stream ideas</p>

        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            value={newIdea}
            onChange={(e) => setNewIdea(e.target.value)}
            placeholder="Drop your extreamly good idea..."
            className="input"
          />
          <button type="submit" className="button">
            Submit
          </button>
        </form>

        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <button onClick={handleFlush} className="button">
            Flush DB
          </button>
        </div>

        <ul className="list">
          {ideas
            .sort((a, b) => b.votes - a.votes)
            .map((idea) => (
              <li key={idea.id} className="item">
                <span>
                  {idea.text} - Votes: {idea.votes}
                </span>
                <button onClick={() => handleVote(idea.id)} className="voteButton">
                  Vote
                </button>
              </li>
            ))}
        </ul>
      </SignedIn>

      <SignedOut>
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h1>Welcome to Streamlify</h1>
          <p>Please sign in to access the app.</p>
          <SignInButton />
        </div>
      </SignedOut>
    </main>
  );
}