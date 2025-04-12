export interface Idea {
  id: number;
  text: string;
  votes: number;
}

import * as fs from "fs";
import * as path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "ideas.json");

const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

const readIdeasFromFile = (): Idea[] => {
  ensureDataDirectory();

  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
    return [];
  }

  const fileContent = fs.readFileSync(DATA_FILE, "utf8");
  try {
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error parsing ideas file:", error);
    return [];
  }
};

const writeIdeasToFile = (ideas: Idea[]): void => {
  ensureDataDirectory();
  fs.writeFileSync(DATA_FILE, JSON.stringify(ideas, null, 2));
};

export const getIdeas = (): Idea[] => {
  return readIdeasFromFile();
};

export const addIdea = (text: string): Idea[] => {
  const ideas = readIdeasFromFile();
  const newIdea = {
    id: Date.now(),
    text,
    votes: 0,
  };
  ideas.push(newIdea);
  writeIdeasToFile(ideas);
  return ideas;
};

export const voteIdea = (id: number): Idea[] => {
  const ideas = readIdeasFromFile();
  const idea = ideas.find((i) => i.id === id);

  if (idea) {
    idea.votes += 1;
    writeIdeasToFile(ideas);
  }

  return ideas;
};

export const flushIdeas = (): Idea[] => {
  writeIdeasToFile([]);
  return [];
};
