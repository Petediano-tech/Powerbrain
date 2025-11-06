// This file is now deprecated as quiz data is fetched from Firestore.
// It can be safely deleted.

export type Question = {
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};

export type Quiz = {
  id: string;
  title: string;
  subject: string;
  difficulty: "Easy" | "Medium" | "Hard";
  questions: Question[];
  timeLimit: number;
};

export const quizzesData: Quiz[] = [];
