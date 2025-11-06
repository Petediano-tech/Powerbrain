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
        id: "q1",
        question: "The book is ___ the table.",
        options: ["on", "at", "in", "with"],
        answer: "on",
        explanation: "'On' is used to indicate that something is physically in contact with and supported by a surface."
      },
      {
        id: "q2",
        question: "I will meet you ___ the bus stop.",
        options: ["on", "in", "at", "by"],
        answer: "at",
        explanation: "'At' is used to specify a particular point or location."
      },
      {
        id: "q3",
        question: "She was born ___ April.",
        options: ["at", "on", "in", "from"],
        answer: "in",
        explanation: "'In' is used for months, years, and seasons (e.g., in April, in 1990, in summer)."
      },
      {
        id: "q4",
        question: "The cat is hiding ___ the bed.",
        options: ["on", "under", "over", "through"],
        answer: "under",
        explanation: "'Under' means to be at a lower level than something else, often covered by it."
      },
      {
        id: "q5",
        question: "He walked ___ the bridge.",
        options: ["under", "across", "through", "in"],
        answer: "across",
        explanation: "'Across' is used to indicate movement from one side of something to the other."
      },
      {
        id: "q6",
        question: "The meeting is scheduled ___ 3 PM.",
        options: ["in", "on", "at", "for"],
        answer: "at",
        explanation: "'At' is used to specify a precise time."
      },
      {
        id: "q7",
        question: "We live ___ Malawi.",
        options: ["at", "on", "in", "from"],
        answer: "in",
        explanation: "'In' is used for countries, cities, and other large areas."
      },
      {
        id: "q8",
        question: "Please put the milk ___ the fridge.",
        options: ["on", "at", "in", "into"],
        answer: "in",
        explanation: "'In' is used to show something is located inside of an enclosed space. 'Into' would also be acceptable but implies motion."
      },
      {
        id: "q9",
        question: "My birthday is ___ the 25th of December.",
        options: ["at", "on", "in", "by"],
        answer: "on",
        explanation: "'On' is used for specific dates and days of the week (e.g., on Monday, on Christmas Day)."
      },
      {
        id: "q10",
        question: "I received a letter ___ my friend.",
        options: ["by", "with", "from", "of"],
        answer: "from",
        explanation: "'From' is used to indicate the origin or source of something."
      }
    ]
  },
  {
    id: "math-algebra-1",
    title: "Basic Algebra",
    subject: "Mathematics",
    difficulty: "Easy",
    timeLimit: 15,
    questions: [
      {
        question: "Solve for x: x + 5 = 12",
        options: ["5", "7", "17", "60"],
        answer: "7",
        explanation: "To solve for x, subtract 5 from both sides of the equation: 12 - 5 = 7."
      },
      {
        question: "What is the value of 3y if y = 4?",
        options: ["7", "1", "12", "34"],
        answer: "12",
        explanation: "Substitute y with 4 in the expression 3y, which means 3 * 4 = 12."
      },
      {
        question: "Simplify the expression: 2a + 3a",
        options: ["5a", "6a", "5a^2", "6"],
        answer: "5a",
        explanation: "Since both terms have the same variable 'a', you can add their coefficients: 2 + 3 = 5."
      },
      {
        question: "Solve for b: 4b = 20",
        options: ["5", "16", "24", "80"],
        answer: "5",
        explanation: "To solve for b, divide both sides by 4: 20 / 4 = 5."
      },
      {
        question: "If x = 2 and y = 3, what is x + y?",
        options: ["23", "6", "5", "1"],
        answer: "5",
        explanation: "Simply add the values of x and y: 2 + 3 = 5."
      }
    ]
  },
  {
    id: "biology-cell-1",
    title: "Introduction to The Cell",
    subject: "Biology",
    difficulty: "Easy",
    timeLimit: 10,
    questions: [
      {
        question: "Which organelle is known as the 'powerhouse' of the cell?",
        options: ["Nucleus", "Ribosome", "Mitochondrion", "Cell Membrane"],
        answer: "Mitochondrion",
        explanation: "The mitochondrion is responsible for generating most of the cell's supply of adenosine triphosphate (ATP), used as a source of chemical energy."
      },
      {
        question: "What is the main function of the cell nucleus?",
        options: ["To produce energy", "To control cell activities and store genetic material", "To make proteins", "To control what enters and leaves the cell"],
        answer: "To control cell activities and store genetic material",
        explanation: "The nucleus contains the cell's hereditary material (DNA) and coordinates the cell's activities like growth and reproduction."
      },
      {
        question: "Which of these is found in a plant cell but not in an animal cell?",
        options: ["Cell Membrane", "Cytoplasm", "Nucleus", "Cell Wall"],
        answer: "Cell Wall",
        explanation: "Plant cells have a rigid cell wall outside the cell membrane that provides structural support. Animal cells do not have a cell wall."
      },
      {
        question: "What is the jelly-like substance that fills the cell?",
        options: ["Chloroplast", "Vacuole", "Cytoplasm", "Nucleolus"],
        answer: "Cytoplasm",
        explanation: "Cytoplasm is the material or protoplasm within a living cell, excluding the nucleus. It comprises cytosol and various organelles."
      },
      {
        question: "Photosynthesis occurs in which organelle?",
        options: ["Mitochondrion", "Chloroplast", "Ribosome", "Endoplasmic Reticulum"],
        answer: "Chloroplast",
        explanation: "Chloroplasts are the food producers of the plant cell. They are only found in plant cells and some protists."
      }
    ]
  },
  {
    id: "history-malawi-1",
    title: "Early Malawian History",
    subject: "History",
    difficulty: "Medium",
    timeLimit: 10,
    questions: [
      {
        question: "Which group of people established the Maravi Empire in the 16th century?",
        options: ["Yao", "Tumbuka", "Chewa", "Ngoni"],
        answer: "Chewa",
        explanation: "The Maravi Empire was a state founded by the Chewa people in the area of Lake Malawi in the 16th century."
      },
      {
        question: "What was the previous name of Malawi during the British colonial period?",
        options: ["Rhodesia", "Tanganyika", "Nyasaland", "Bechuanaland"],
        answer: "Nyasaland",
        explanation: "From 1907 until 1964, the territory was known as the Nyasaland Protectorate under British rule."
      },
      {
        question: "Who was the first President of independent Malawi?",
        options: ["Bakili Muluzi", "Bingu wa Mutharika", "Dr. Hastings Kamuzu Banda", "Peter Mutharika"],
        answer: "Dr. Hastings Kamuzu Banda",
        explanation: "Dr. Hastings Kamuzu Banda was the leader of Malawi from 1961 until 1994, serving as Prime Minister from 1964 to 1966 and then as President."
      },
      {
        question: "In which year did Malawi gain its independence from Britain?",
        options: ["1957", "1960", "1964", "1980"],
        answer: "1964",
        explanation: "Malawi became an independent country on July 6, 1964."
      }
    ]
  },
  {
    id: "chichewa-proverbs-1",
    title: "Miyambi ya Chichewa",
    subject: "Chichewa",
    difficulty: "Medium",
    timeLimit: 10,
    questions: [
      {
        question: "What is the meaning of the proverb 'M'mera mpoyamba'?",
        options: ["You reap what you sow", "Problems should be solved early", "Unity is strength", "Slow and steady wins the race"],
        answer: "Problems should be solved early",
        explanation: "Literally 'A plant is (dealt with) at the beginning'. It means it's best to address issues when they are still small and manageable."
      },
      {
        question: "Complete the proverb: 'Chala chimodzi sichiswa...'",
        options: ["nsabwe", "njoka", "mwala", "moto"],
        answer: "nsabwe",
        explanation: "The full proverb is 'Chala chimodzi sichiswa nsabwe' (One finger cannot kill a louse), meaning unity is strength or some tasks require cooperation."
      },
      {
        question: "What does 'Kali kokha nkanyama' mean?",
        options: ["The lone one is a beast (vulnerable)", "A rolling stone gathers no moss", "Every dog has its day", "Patience is a virtue"],
        answer: "The lone one is a beast (vulnerable)",
        explanation: "This proverb warns against isolation, suggesting that someone who is alone is vulnerable, like an animal singled out by a predator."
      },
      {
        question: "Which of the following best explains 'Chakudza m'manja sichidikidwa'?",
        options: ["Don't count your chickens before they hatch", "A bird in the hand is worth two in the bush", "Don't bite the hand that feeds you", "Look before you leap"],
        answer: "A bird in the hand is worth two in the bush",
        explanation: "Literally 'What has come into the hands is not waited for'. It means you shouldn't forsake a certainty for a possibility."
      }
    ]
  },
  {
    id: "computer-studies-1",
    title: "Fundamentals of Computing",
    subject: "Computer Studies",
    difficulty: "Easy",
    timeLimit: 10,
    questions: [
      {
        question: "What does CPU stand for?",
        options: ["Computer Processing Unit", "Central Processing Unit", "Central Power Unit", "Computer Power Unit"],
        answer: "Central Processing Unit",
        explanation: "The CPU is the primary component of a computer that executes instructions. It is often referred to as the 'brain' of the computer."
      },
      {
        question: "Which of these is an example of an input device?",
        options: ["Monitor", "Printer", "Speakers", "Keyboard"],
        answer: "Keyboard",
        explanation: "An input device sends data to a computer. A keyboard is used to input text and commands."
      },
      {
        question: "What does RAM stand for?",
        options: ["Read-Only Memory", "Random-Access Memory", "Real-time Application Memory", "Remote-Access Memory"],
        answer: "Random-Access Memory",
        explanation: "RAM is a form of computer memory that can be read and changed in any order, typically used to store working data and machine code."
      },
      {
        question: "Which of these is an example of an output device?",
        options: ["Mouse", "Scanner", "Monitor", "Microphone"],
        answer: "Monitor",
        explanation: "An output device receives data from a computer and presents it to the user. A monitor displays visual information."
      },
      {
        question: "Software refers to:",
        options: ["The physical parts of a computer", "The set of instructions that tells the computer what to do", "The computer's screen", "The power supply"],
        answer: "The set of instructions that tells the computer what to do",
        explanation: "Software is a collection of data or computer instructions that tell the computer how to work, in contrast to physical hardware."
      }
    ]
  }
];

// NOTE: The `quizzesData` export is kept for any legacy components, but it is empty.
// New quiz logic should fetch from Firestore.
export const quizzesData: Quiz[] = [];
