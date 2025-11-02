
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

export const quizzesData: Quiz[] = [
  {
    id: "algebra-basics",
    title: "Algebra Basics",
    subject: "Mathematics",
    difficulty: "Easy",
    timeLimit: 10,
    questions: [
      {
        id: "q1",
        question: "What is the value of x in the equation x + 5 = 12?",
        options: ["5", "7", "10", "17"],
        answer: "7",
        explanation: "To find x, you subtract 5 from both sides of the equation: 12 - 5 = 7.",
      },
      {
        id: "q2",
        question: "Simplify the expression: 3y + 2y - y",
        options: ["4y", "5y", "6y", "3y"],
        answer: "4y",
        explanation: "Combine the like terms: 3y + 2y is 5y, and then 5y - y is 4y.",
      },
      {
        id: "q3",
        question: "If a = 3 and b = 4, what is the value of a * b?",
        options: ["7", "1", "12", "0"],
        answer: "12",
        explanation: "Multiplication of a and b means 3 times 4, which equals 12.",
      },
    ],
  },
  {
    id: "biology-the-cell",
    title: "Biology: The Cell",
    subject: "Biology",
    difficulty: "Medium",
    timeLimit: 15,
    questions: [
      {
        id: "q1",
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Ribosome", "Mitochondrion", "Cell Wall"],
        answer: "Mitochondrion",
        explanation: "The mitochondrion is responsible for generating most of the cell's supply of adenosine triphosphate (ATP), used as a source of chemical energy.",
      },
      {
        id: "q2",
        question: "Which organelle contains the cell's genetic material?",
        options: ["Golgi apparatus", "Nucleus", "Endoplasmic reticulum", "Lysosome"],
        answer: "Nucleus",
        explanation: "The nucleus is a membrane-bound organelle that contains the cell's chromosomes, which are made of DNA.",
      },
      {
        id: "q3",
        question: "Photosynthesis occurs in which organelle?",
        options: ["Chloroplast", "Vacuole", "Mitochondrion", "Ribosome"],
        answer: "Chloroplast",
        explanation: "Chloroplasts are the sites of photosynthesis in plant cells, converting light energy into chemical energy.",
      },
       {
        id: "q4",
        question: "What is the main function of ribosomes?",
        options: ["Energy production", "Waste breakdown", "Protein synthesis", "Lipid storage"],
        answer: "Protein synthesis",
        explanation: "Ribosomes are responsible for translating messenger RNA (mRNA) into polypeptide chains, which fold into functional proteins.",
      },
    ],
  },
   {
    id: "world-war-2-basics",
    title: "World War II Basics",
    subject: "History",
    difficulty: "Easy",
    timeLimit: 10,
    questions: [
      {
        id: "q1",
        question: "In which year did World War II begin?",
        options: ["1914", "1939", "1941", "1945"],
        answer: "1939",
        explanation: "World War II began on September 1, 1939, when Germany invaded Poland, leading Great Britain and France to declare war.",
      },
      {
        id: "q2",
        question: "Who was the Prime Minister of the United Kingdom for most of World War II?",
        options: ["Neville Chamberlain", "Clement Attlee", "Winston Churchill", "Margaret Thatcher"],
        answer: "Winston Churchill",
        explanation: "Winston Churchill served as Prime Minister from 1940 to 1945, leading Britain through its darkest hours and to victory.",
      },
      {
        id: "q3",
        question: "The D-Day landings took place in which country?",
        options: ["Germany", "Italy", "France", "Russia"],
        answer: "France",
        explanation: "The D-Day landings occurred on June 6, 1944, in Normandy, France, marking the beginning of the end for Nazi Germany in Western Europe.",
      },
    ],
  },
];
