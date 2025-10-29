export type Note = {
  id: string;
  title: string;
  subject: string;
  author: string;
  content: string;
  imageUrl: string;
  imageHint: string;
  createdAt: string;
};

export const notesData: Note[] = [
  {
    id: "how-to-use-prepositions",
    title: "How to Use Prepositions",
    subject: "English",
    author: "Your Teacher",
    content: `Help your child master PREPOSITIONS ATTACHED TO CERTAIN WORDS.

1. abide..............by
2. absorbed....... in
3. abstain ......from
4. Accomplice......with
5. accused...... (Sb)of(sth)
6. accustomed..... to
7. addicted........ to
8. adhere........ to
9. admit........to/into`,
    imageUrl: "https://picsum.photos/seed/prepositions/400/200",
    imageHint: "book grammar",
    createdAt: new Date().toISOString(),
  },
  {
    id: "introduction-to-algebra",
    title: "Introduction to Algebra",
    subject: "Mathematics",
    author: "Your Teacher",
    content: "Algebra is a branch of mathematics that deals with symbols and the rules for manipulating those symbols. It is a unifying thread of almost all of mathematics. This note covers the basic concepts of variables, constants, and expressions.",
    imageUrl: "https://picsum.photos/seed/algebra/400/200",
    imageHint: "blackboard math",
    createdAt: new Date().toISOString(),
  },
  {
    id: "the-cell",
    title: "The Cell: The Basic Unit of Life",
    subject: "Biology",
    author: "Your Teacher",
    content: "All living organisms are made up of cells. The cell is the basic structural and functional unit of life. This note explores the different types of cells and the organelles within them, such as the nucleus, mitochondria, and cell membrane.",
    imageUrl: "https://picsum.photos/seed/biology-cell/400/200",
    imageHint: "microscope cells",
    createdAt: new Date().toISOString(),
  },
];
