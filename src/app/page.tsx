"use client";

import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs"; // Import useUser hook
import { useState, useEffect } from "react";
import GitHubStars from "../components/GitHubStars"; // Import the GitHubStars component

interface Idea {
  id: number;
  text: string;
  votes: number;
}

export default function Home() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [newIdea, setNewIdea] = useState<string>("");
  const { user } = useUser(); // Get the current user

  const isAdmin = user?.publicMetadata?.role === "admin"; // Check if the user has the "admin" role

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
      {/* Top bar with GitHub stars and UserButton */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <GitHubStars /> {/* GitHubStars component */}
        <SignedIn>
          <UserButton /> {/* UserButton for logged-in users */}
        </SignedIn>
      </div>

      <SignedIn>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 className="title">Streamlify</h1>
          <p className="motto">Extreamly good stream ideas</p>
        </div>

        <form onSubmit={handleSubmit} className="form" style={{ marginBottom: "30px" }}>
          <input
            type="text"
            value={newIdea}
            onChange={(e) => setNewIdea(e.target.value)}
            placeholder="Drop your extreamly good idea..."
            className="input"
            style={{
              padding: "12px",
              fontSize: "16px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              width: "70%",
              marginRight: "10px",
            }}
          />
          <button
            type="submit"
            className="button"
            style={{
              padding: "12px 20px",
              backgroundColor: "#3498db",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Submit
          </button>
        </form>

        <ul className="list" style={{ listStyle: "none", padding: 0 }}>
          {ideas
            .sort((a, b) => b.votes - a.votes)
            .map((idea) => (
              <li
                key={idea.id}
                className="item"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 16px",
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  marginBottom: "10px",
                }}
              >
                <span style={{ fontSize: "16px", fontWeight: "500" }}>
                  {idea.text} - Votes: {idea.votes}
                </span>
                <button
                  onClick={() => handleVote(idea.id)}
                  className="voteButton"
                  style={{
                    padding: "8px 16px",
                    backgroundColor: "#2ecc71",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Vote
                </button>
              </li>
            ))}
        </ul>

        {isAdmin && ( // Only show the button if the user is an admin
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
              onClick={handleFlush}
              className="button"
              style={{
                padding: "12px 20px",
                backgroundColor: "#e74c3c",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Flush DB
            </button>
          </div>
        )}
      </SignedIn>

      <SignedOut>
        <div
          style={{
            textAlign: "center",
            marginTop: "50px",
            padding: "20px",
            backgroundColor: "#1e1e1e", // Dark background for contrast
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            maxWidth: "400px",
            margin: "50px auto", // Center the container
          }}
        >
          <h1 style={{ fontSize: "2rem", marginBottom: "10px", color: "#ffffff" }}>
            Welcome to Streamlify
          </h1>
          <p style={{ fontSize: "1rem", color: "#b0b0b0", marginBottom: "20px" }}>
            Please sign in to access the app.
          </p>
          <SignInButton
            mode="modal"
            style={{
              padding: "10px 20px",
              backgroundColor: "#3498db",
              color: "#ffffff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            Sign In
          </SignInButton>
        </div>
      </SignedOut>
    </main>
  );
}