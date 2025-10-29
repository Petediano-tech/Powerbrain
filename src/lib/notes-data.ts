
export type Note = {
  id: string;
  title: string;
  subject: string;
  author: string;
  pdfUrl: string; 
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
];
