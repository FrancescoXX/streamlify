// lib/ideas.ts
export interface Idea {
  id: number;
  text: string;
  votes: number;
}

let ideas: Idea[] = [];

export const getIdeas = (): Idea[] => ideas;

export const addIdea = (text: string): Idea[] => {
  const newIdea = { id: Date.now(), text, votes: 0 };
  ideas.push(newIdea);
  return ideas;
};

export const voteIdea = (id: number): Idea[] => {
  const idea = ideas.find((i) => i.id === id);
  if (idea) {
    idea.votes += 1;
  }
  return ideas;
};

// Add this to clear all ideas
export const flushIdeas = (): Idea[] => {
  ideas = [];
  return ideas;
};