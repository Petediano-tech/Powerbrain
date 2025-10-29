
export interface Note {
  id: string;
  title: string;
  subject: string;
  author: string;
  pdfUrl: string;
  imageUrl: string;
  imageHint: string;
}

export const notesData: Note[] = [
  {
    id: '1',
    title: 'Introduction to Biology',
    subject: 'Biology',
    author: 'Dr. Jane Goodall',
    // Using a publicly available sample PDF
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    imageUrl: `https://picsum.photos/seed/biology-textbook/400/200`,
    imageHint: `Biology textbook`,
  },
  {
    id: '2',
    title: 'Algebra Fundamentals',
    subject: 'Mathematics',
    author: 'Mr. Isaac Newton',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    imageUrl: `https://picsum.photos/seed/math-book/400/200`,
    imageHint: `Mathematics book`,
  },
  {
    id: '3',
    title: 'The Works of Shakespeare',
    subject: 'English',
    author: 'William Shakespeare',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    imageUrl: `https://picsum.photos/seed/english-literature/400/200`,
    imageHint: `English literature`,
  },
  {
    id: '4',
    title: 'Malawian History: Pre-Colonial Era',
    subject: 'History',
    author: 'Prof. John Chilembwe',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    imageUrl: `https://picsum.photos/seed/history-scroll/400/200`,
    imageHint: `History scroll`,
  },
];
