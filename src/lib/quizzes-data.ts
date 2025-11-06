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
  },
  {
    id: "chemistry-acids-bases-1",
    title: "Acids, Bases, and Salts",
    subject: "Chemistry",
    difficulty: "Easy",
    timeLimit: 10,
    questions: [
      {
        question: "What does an acid produce in an aqueous solution?",
        options: ["Hydroxide ions (OH-)", "Hydrogen ions (H+)", "Salt", "Water"],
        answer: "Hydrogen ions (H+)",
        explanation: "Acids are substances that increase the concentration of hydrogen ions (H+) when dissolved in water."
      },
      {
        question: "A substance with a pH of 10 is considered...",
        options: ["Acidic", "Neutral", "Basic (Alkaline)", "A salt"],
        answer: "Basic (Alkaline)",
        explanation: "The pH scale ranges from 0 to 14. A pH less than 7 is acidic, a pH of 7 is neutral, and a pH greater than 7 is basic or alkaline."
      },
      {
        question: "What is the product of a neutralization reaction between an acid and a base?",
        options: ["A stronger acid", "A stronger base", "Salt and water", "Only salt"],
        answer: "Salt and water",
        explanation: "When an acid and a base react, they neutralize each other, producing a salt and water. For example, HCl (acid) + NaOH (base) -> NaCl (salt) + H2O (water)."
      },
      {
        question: "Which indicator turns red in an acidic solution and blue in a basic solution?",
        options: ["Phenolphthalein", "Methyl Orange", "Litmus paper", "Universal Indicator"],
        answer: "Litmus paper",
        explanation: "Litmus paper is a common indicator used to test for acidity. Blue litmus paper turns red in acids, and red litmus paper turns blue in bases."
      }
    ]
  },
  {
    id: "physics-matter-1",
    title: "States of Matter",
    subject: "Physics",
    difficulty: "Easy",
    timeLimit: 10,
    questions: [
      {
        question: "Which state of matter has a definite volume but no definite shape?",
        options: ["Solid", "Liquid", "Gas", "Plasma"],
        answer: "Liquid",
        explanation: "A liquid takes the shape of its container but has a fixed volume. Solids have a definite shape and volume, while gases have neither."
      },
      {
        question: "The process of a solid changing directly into a gas is called...",
        options: ["Melting", "Evaporation", "Condensation", "Sublimation"],
        answer: "Sublimation",
        explanation: "Sublimation is the phase transition of a substance directly from the solid to the gas state, without passing through the liquid state."
      },
      {
        question: "What happens to the particles of a substance when it is heated?",
        options: ["They move slower and closer together", "They stop moving", "They move faster and further apart", "They get smaller"],
        answer: "They move faster and further apart",
        explanation: "Heating a substance increases its internal energy, causing its particles (atoms or molecules) to vibrate and move more rapidly and spread out."
      },
      {
        question: "Which of the following is NOT a physical property of matter?",
        options: ["Density", "Boiling Point", "Flammability", "Color"],
        answer: "Flammability",
        explanation: "Flammability is a chemical property because it describes the ability of a substance to undergo a chemical change (combustion). The others are physical properties that can be observed without changing the substance's chemical identity."
      }
    ]
  },
  {
    id: "geography-maps-1",
    title: "Map Reading Skills",
    subject: "Geography",
    difficulty: "Easy",
    timeLimit: 10,
    questions: [
      {
        question: "What does a map scale of 1:50,000 mean?",
        options: ["1 cm on the map is 50,000 km in reality", "1 km on the map is 50,000 cm in reality", "1 unit on the map represents 50,000 of the same unit in reality", "The map is 50,000 times larger than reality"],
        answer: "1 unit on the map represents 50,000 of the same unit in reality",
        explanation: "A map scale is a ratio. 1:50,000 means that one unit of measurement on the map (like a centimeter) is equal to 50,000 of those same units on the ground."
      },
      {
        question: "Which part of a map explains the meaning of the symbols used?",
        options: ["Title", "Compass Rose", "Scale", "Key (or Legend)"],
        answer: "Key (or Legend)",
        explanation: "The map key, or legend, is a visual explanation of the symbols used on the map."
      },
      {
        question: "What are the imaginary lines that run from east to west on a globe called?",
        options: ["Lines of Longitude", "Lines of Latitude", "Meridians", "Equators"],
        answer: "Lines of Latitude",
        explanation: "Lines of Latitude (also called parallels) run east-west around the globe and measure distance north or south of the Equator."
      },
      {
        question: "The four cardinal directions are:",
        options: ["Up, Down, Left, Right", "North, South, East, West", "Northeast, Northwest, Southeast, Southwest", "Here, There, Everywhere, Nowhere"],
        answer: "North, South, East, West",
        explanation: "The four main points of a compass are North, South, East, and West."
      }
    ]
  },
  {
    id: "agriculture-soil-1",
    title: "Soil Science Basics",
    subject: "Agriculture",
    difficulty: "Easy",
    timeLimit: 10,
    questions: [
      {
        question: "Which soil type feels smooth and silky when wet and has good water retention but poor drainage?",
        options: ["Sandy Soil", "Clay Soil", "Silt Soil", "Loam Soil"],
        answer: "Silt Soil",
        explanation: "Silt particles are smaller than sand but larger than clay, giving them a smooth, flour-like feel. They hold water well but can be prone to compaction."
      },
      {
        question: "What is the ideal soil type for most agricultural purposes, as it contains a balanced mixture of sand, silt, and clay?",
        options: ["Sandy Soil", "Clay Soil", "Silt Soil", "Loam Soil"],
        answer: "Loam Soil",
        explanation: "Loam is considered the ideal soil for gardening and agriculture because it retains moisture but also drains well, and is rich in nutrients."
      },
      {
        question: "The decayed organic matter in soil, which is rich in nutrients, is called:",
        options: ["Bedrock", "Humus", "Subsoil", "Gravel"],
        answer: "Humus",
        explanation: "Humus is the dark, organic material in soil, formed from the decomposition of leaves and other plant and animal material. It is crucial for soil fertility."
      },
      {
        question: "What is soil erosion?",
        options: ["The process of adding fertilizers to soil", "The formation of new soil", "The washing or blowing away of the top layer of soil", "The process of plants growing in soil"],
        answer: "The washing or blowing away of the top layer of soil",
        explanation: "Soil erosion is a natural process that is accelerated by human activities like deforestation and poor farming practices, leading to the loss of fertile topsoil."
      }
    ]
  }
];

// NOTE: The `quizzesData` export is kept for any legacy components, but it is empty.
// New quiz logic should fetch from Firestore.
export const quizzesData: Quiz[] = [];
