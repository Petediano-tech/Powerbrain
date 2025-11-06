// This file now contains initial seed data for Firestore.
// You can run a script to add this data to your database.
// After seeding, this file is not directly used by the application at runtime.

export type Question = {
  id?: string; // id is optional for seeding
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};

export type Quiz = {
  id?: string; // id is optional for seeding
  title: string;
  subject: string;
  difficulty: "Easy" | "Medium" | "Hard";
  questions: Question[];
  timeLimit: number;
};

export const quizzesToSeed: Quiz[] = [
  {
    id: "english-prepositions-1",
    title: "English Prepositions - Level 1",
    subject: "English",
    difficulty: "Easy",
    timeLimit: 10,
    questions: [
      {
        question: "The book is ___ the table.",
        options: ["on", "at", "in", "with"],
        answer: "on",
        explanation: "'On' is used to indicate that something is physically in contact with and supported by a surface."
      },
      {
        question: "I will meet you ___ the bus stop.",
        options: ["on", "in", "at", "by"],
        answer: "at",
        explanation: "'At' is used to specify a particular point or location."
      },
      {
        question: "She was born ___ April.",
        options: ["at", "on", "in", "from"],
        answer: "in",
        explanation: "'In' is used for months, years, and seasons (e.g., in April, in 1990, in summer)."
      },
      {
        question: "The cat is hiding ___ the bed.",
        options: ["on", "under", "over", "through"],
        answer: "under",
        explanation: "'Under' means to be at a lower level than something else, often covered by it."
      },
      {
        question: "He walked ___ the bridge.",
        options: ["under", "across", "through", "in"],
        answer: "across",
        explanation: "'Across' is used to indicate movement from one side of something to the other."
      },
      {
        question: "The meeting is scheduled ___ 3 PM.",
        options: ["in", "on", "at", "for"],
        answer: "at",
        explanation: "'At' is used to specify a precise time."
      },
      {
        question: "We live ___ Malawi.",
        options: ["at", "on", "in", "from"],
        answer: "in",
        explanation: "'In' is used for countries, cities, and other large areas."
      },
      {
        question: "Please put the milk ___ the fridge.",
        options: ["on", "at", "in", "into"],
        answer: "in",
        explanation: "'In' is used to show something is located inside of an enclosed space. 'Into' would also be acceptable but implies motion."
      },
      {
        question: "My birthday is ___ the 25th of December.",
        options: ["at", "on", "in", "by"],
        answer: "on",
        explanation: "'On' is used for specific dates and days of the week (e.g., on Monday, on Christmas Day)."
      },
      {
        question: "I received a letter ___ my friend.",
        options: ["by", "with", "from", "of"],
        answer: "from",
        explanation: "'From' is used to indicate the origin or source of something."
      }
    ]
  }
];

// NOTE: The `quizzesData` export is kept for any legacy components, but it is empty.
// New quiz logic should fetch from Firestore.
export const quizzesData: Quiz[] = [];
