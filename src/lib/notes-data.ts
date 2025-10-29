
export type Note = {
  id: string;
  title: string;
  subject: string;
  author: string;
  pdfUrl: string; // Changed from content to pdfUrl
  createdAt: string;
};

export const notesData: Note[] = [
  {
    id: "how-to-use-prepositions",
    title: "How to Use Prepositions",
    subject: "English",
    author: "Your Teacher",
    pdfUrl: "https://github.com/Petediano-tech/PowerBrainNotes-/raw/refs/heads/main/__English_prepositions_(1)_(1).pdf",
    createdAt: new Date().toISOString(),
  },
  {
    id: "introduction-to-algebra",
    title: "Introduction to Algebra",
    subject: "Mathematics",
    author: "Your Teacher",
    pdfUrl: "#", // Placeholder, user can replace
    createdAt: new Date().toISOString(),
  },
  {
    id: "the-cell",
    title: "The Cell: Basic Unit of Life",
    subject: "Biology",
    author: "Your Teacher",
    pdfUrl: "#", // Placeholder, user can replace
    createdAt: new Date().toISOString(),
  },
];
