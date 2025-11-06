
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
      },
      {
        question: "What is the value of 5z - 3 when z = 2?",
        options: ["7", "10", "4", "13"],
        answer: "7",
        explanation: "Substitute z with 2: 5 * 2 - 3 = 10 - 3 = 7."
      },
      {
        question: "Simplify: 7x - 2x + 3x",
        options: ["8x", "12x", "2x", "5x"],
        answer: "8x",
        explanation: "Combine the coefficients of the like terms: 7 - 2 + 3 = 8. So the answer is 8x."
      },
      {
        question: "Solve for c: c / 3 = 6",
        options: ["2", "3", "9", "18"],
        answer: "18",
        explanation: "To solve for c, multiply both sides by 3: 6 * 3 = 18."
      },
      {
        question: "Which of the following is an equation?",
        options: ["5x + 2", "10 - 3", "2y = 8", "7 + 4"],
        answer: "2y = 8",
        explanation: "An equation is a statement that asserts the equality of two expressions, indicated by an equals sign (=)."
      },
      {
        question: "Solve for d: d - 9 = 2",
        options: ["7", "11", "-7", "18"],
        answer: "11",
        explanation: "To solve for d, add 9 to both sides of the equation: 2 + 9 = 11."
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
      },
      {
        question: "What part of the cell controls what enters and leaves?",
        options: ["Nucleus", "Cell Wall", "Cell Membrane", "Vacuole"],
        answer: "Cell Membrane",
        explanation: "The cell membrane (or plasma membrane) is selectively permeable, regulating the passage of substances into and out of the cell."
      },
      {
        question: "Which small organelles are responsible for making proteins?",
        options: ["Ribosomes", "Lysosomes", "Golgi apparatus", "Mitochondria"],
        answer: "Ribosomes",
        explanation: "Ribosomes are the sites of protein synthesis in the cell. They can be found floating in the cytoplasm or attached to the endoplasmic reticulum."
      },
      {
        question: "What is the primary function of the large central vacuole in a plant cell?",
        options: ["To store water and maintain turgor pressure", "To produce sugar", "To package proteins", "To break down waste"],
        answer: "To store water and maintain turgor pressure",
        explanation: "The large central vacuole stores water, nutrients, and waste products, and helps maintain the rigidity of the plant cell."
      },
      {
        question: "Prokaryotic cells, like bacteria, lack which of the following?",
        options: ["A cell membrane", "A nucleus", "Ribosomes", "DNA"],
        answer: "A nucleus",
        explanation: "The key difference between prokaryotic and eukaryotic cells is that prokaryotes do not have a membrane-bound nucleus or other membrane-bound organelles."
      },
      {
        question: "The 'control center' of the eukaryotic cell is the:",
        options: ["Mitochondrion", "Cell Membrane", "Nucleus", "Cytoplasm"],
        answer: "Nucleus",
        explanation: "The nucleus directs all cell activities and contains the genetic material (DNA), making it the control center."
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
      },
      {
        question: "The Iron Age in Malawi is associated with the arrival of which people?",
        options: ["The San (Bushmen)", "Bantu-speaking peoples", "European traders", "Arab merchants"],
        answer: "Bantu-speaking peoples",
        explanation: "The arrival of Bantu-speaking peoples around the 4th century CE marked the beginning of the Iron Age in the region, as they brought iron-working skills."
      },
      {
        question: "What major lake is central to Malawi's geography and history?",
        options: ["Lake Victoria", "Lake Tanganyika", "Lake Malawi", "Lake Albert"],
        answer: "Lake Malawi",
        explanation: "Lake Malawi, also known as Lake Nyasa, is the third-largest lake in Africa and has been a focal point for settlement, trade, and conflict throughout Malawi's history."
      },
      {
        question: "Which famous missionary and explorer is closely associated with Malawi?",
        options: ["Henry Morton Stanley", "David Livingstone", "Cecil Rhodes", "Richard Burton"],
        answer: "David Livingstone",
        explanation: "David Livingstone was a Scottish missionary who explored much of Central Africa, including the area around Lake Malawi, in the mid-19th century."
      },
      {
        question: "The term 'Maravi' from the Maravi Empire is believed to mean...",
        options: ["Reflected Rays of Light", "Great Kingdom", "People of the Lake", "Land of Fire"],
        answer: "Reflected Rays of Light",
        explanation: "The name 'Maravi' is thought to mean 'Reflected Rays of Light' or 'Flames', possibly referring to the reflection of the sun on Lake Malawi."
      },
      {
        question: "Which political party led Malawi to independence?",
        options: ["United Democratic Front (UDF)", "Malawi Congress Party (MCP)", "Democratic Progressive Party (DPP)", "Aford"],
        answer: "Malawi Congress Party (MCP)",
        explanation: "The Malawi Congress Party (MCP), under the leadership of Dr. Hastings Kamuzu Banda, was the party that negotiated and led the country to independence in 1964."
      },
      {
        question: "The Ngoni migration into Malawi in the 19th century was a result of what major event in Southern Africa?",
        options: ["The Boer War", "The Mfecane", "The Scramble for Africa", "The discovery of diamonds"],
        answer: "The Mfecane",
        explanation: "The Mfecane was a period of widespread chaos and warfare among indigenous ethnic communities in southern Africa during the 1820s and 1830s, leading to migrations like that of the Ngoni."
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
      },
      {
        question: "Tanthauzo la mwambi 'Mwana wamasiye adziyankhira yekha' ndi lotani?",
        options: ["An orphan must fend for themselves", "A guest is always welcome", "Blood is thicker than water", "A chief is a chief because of his people"],
        answer: "An orphan must fend for themselves",
        explanation: "This proverb means an orphan must learn to speak for or defend themselves, highlighting the need for self-reliance when one lacks support."
      },
      {
        question: "Complete the proverb: 'Chitsiru chidakhoma...'",
        options: ["nyumba", "chitseko", "njuchi", "ng'anjo"],
        answer: "ng'anjo",
        explanation: "The full proverb is 'Chitsiru chidakhoma ng'anjo, nzeru idadza chita psa' (A fool built the kiln, wisdom came after it got burnt). It means one often learns from their mistakes."
      },
      {
        question: "What does the proverb 'Ukaipa dziwa nyumba' mean?",
        options: ["A friend in need is a friend indeed", "When you are in trouble, remember home", "Charity begins at home", "East or West, home is best"],
        answer: "When you are in trouble, remember home",
        explanation: "Literally 'When you are in a bad situation, know the house'. It advises that family and home are a refuge in times of trouble."
      },
      {
        question: "The proverb 'Mlendo ndiye mame, sangachedwe kusungunuka' refers to a...",
        options: ["King", "Guest", "Child", "Thief"],
        answer: "Guest",
        explanation: "It means 'A visitor is like dew, they don't delay in disappearing'. It advises hosts to treat guests well as their stay is temporary."
      },
      {
        question: "'Gowero ndi amene akupatsa' means:",
        options: ["A gift is from the one who gives it to you", "Do not look a gift horse in the mouth", "Beggars can't be choosers", "All of the above"],
        answer: "All of the above",
        explanation: "This proverb implies that when you receive something as a gift or favor, you should accept it gratefully without being critical of its quality or size."
      },
      {
        question: "Kodi mwambi 'Mlandu sagona' umatanthauza chiyani?",
        options: ["A case never sleeps (justice will eventually be served)", "The law is blind", "Speak the truth and shame the devil", "Two heads are better than one"],
        answer: "A case never sleeps (justice will eventually be served)",
        explanation: "This means that a wrongdoing or an unresolved issue will not be forgotten and will eventually be addressed. Justice may be delayed but not denied."
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
      },
      {
        question: "What is the main function of an Operating System (OS)?",
        options: ["To play video games", "To browse the internet", "To manage computer hardware and software resources", "To create documents"],
        answer: "To manage computer hardware and software resources",
        explanation: "The OS (like Windows, macOS, or Linux) is the primary software that manages all hardware and software, providing common services for computer programs."
      },
      {
        question: "A file with a .jpg extension is most likely what type of file?",
        options: ["A text document", "A spreadsheet", "An image file", "An audio file"],
        answer: "An image file",
        explanation: ".jpg or .jpeg is a common file format for digital images."
      },
      {
        question: "What is a computer virus?",
        options: ["A type of computer hardware", "A program that helps the computer run faster", "A malicious program that can replicate itself and spread to other computers", "A physical cleaning tool for computers"],
        answer: "A malicious program that can replicate itself and spread to other computers",
        explanation: "A computer virus is a type of malware designed to cause damage to a computer, steal data, or perform other harmful actions."
      },
      {
        question: "Which of the following is a type of permanent storage?",
        options: ["RAM", "Cache", "Hard Disk Drive (HDD)", "CPU Registers"],
        answer: "Hard Disk Drive (HDD)",
        explanation: "A Hard Disk Drive is non-volatile storage, meaning it retains stored data even when not powered. RAM is volatile and loses its data when power is turned off."
      },
      {
        question: "What is the World Wide Web?",
        options: ["The same as the Internet", "A system of interconnected computer networks", "A system of interlinked hypertext documents accessed via the Internet", "A type of computer"],
        answer: "A system of interlinked hypertext documents accessed via the Internet",
        explanation: "The World Wide Web (WWW) is a service that operates over the Internet. It's a collection of websites or web pages stored in web servers and connected to local computers through the internet."
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
      },
      {
        question: "What is the pH of pure water?",
        options: ["0", "5", "7", "14"],
        answer: "7",
        explanation: "Pure water is neutral, meaning it is neither acidic nor basic, and has a pH of 7."
      },
      {
        question: "Which of the following is a strong acid?",
        options: ["Vinegar (Acetic Acid)", "Lemon Juice (Citric Acid)", "Stomach Acid (Hydrochloric Acid)", "Carbonic Acid (in soda)"],
        answer: "Stomach Acid (Hydrochloric Acid)",
        explanation: "Hydrochloric acid (HCl) is a strong acid because it completely ionizes in water. The others are weak acids."
      },
      {
        question: "Bases are substances that...",
        options: ["Taste sour", "Feel slippery to the touch", "Turn blue litmus paper red", "React with metals to produce hydrogen gas"],
        answer: "Feel slippery to the touch",
        explanation: "Bases often feel slippery or soapy. They taste bitter and turn red litmus paper blue."
      },
      {
        question: "An example of a common household base is:",
        options: ["Orange juice", "Baking soda", "Vinegar", "Coffee"],
        answer: "Baking soda",
        explanation: "Baking soda (Sodium Bicarbonate) is a weak base. The others are acidic."
      },
      {
        question: "What is the chemical formula for table salt?",
        options: ["KCl", "CaCl2", "NaCl", "MgSO4"],
        answer: "NaCl",
        explanation: "Table salt is Sodium Chloride, which has the chemical formula NaCl. It is formed from the reaction of Hydrochloric acid (HCl) and Sodium Hydroxide (NaOH)."
      },
      {
        question: "A solution with a pH of 2 is how many times more acidic than a solution with a pH of 4?",
        options: ["2 times", "10 times", "20 times", "100 times"],
        answer: "100 times",
        explanation: "The pH scale is logarithmic. A change of 1 pH unit represents a tenfold change in acidity. Therefore, a change of 2 pH units (from 4 to 2) is a 10 x 10 = 100 times change."
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
      },
      {
        question: "The process of a liquid changing into a solid is called...",
        options: ["Freezing", "Melting", "Boiling", "Condensation"],
        answer: "Freezing",
        explanation: "Freezing or solidification is the phase change in which a liquid turns into a solid when its temperature is lowered below its freezing point."
      },
      {
        question: "In which state of matter are the particles most spread out and moving the fastest?",
        options: ["Solid", "Liquid", "Gas", "All are the same"],
        answer: "Gas",
        explanation: "Gas particles have the most kinetic energy. They are far apart and move randomly and rapidly in all directions."
      },
      {
        question: "The temperature at which a liquid turns into a gas is called its...",
        options: ["Melting point", "Freezing point", "Boiling point", "Triple point"],
        answer: "Boiling point",
        explanation: "The boiling point is the temperature at which a liquid's vapor pressure equals the pressure surrounding the liquid and the liquid changes into a vapor."
      },
      {
        question: "What is the process of a gas changing into a liquid called?",
        options: ["Evaporation", "Sublimation", "Condensation", "Deposition"],
        answer: "Condensation",
        explanation: "Condensation is the change of the physical state of matter from the gas phase into the liquid phase, and is the reverse of vaporization."
      },
      {
        question: "Which state of matter is characterized by particles that are tightly packed in a fixed structure?",
        options: ["Solid", "Liquid", "Gas", "Plasma"],
        answer: "Solid",
        explanation: "In a solid, particles are held firmly in place in a lattice structure, allowing them only to vibrate."
      },
      {
        question: "The amount of space an object occupies is its...",
        options: ["Mass", "Weight", "Density", "Volume"],
        answer: "Volume",
        explanation: "Volume is the measure of the three-dimensional space occupied by a substance."
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
      },
      {
        question: "What are contour lines on a topographic map used to show?",
        options: ["Rivers and lakes", "Roads and railways", "Elevation and shape of the land", "Political boundaries"],
        answer: "Elevation and shape of the land",
        explanation: "Contour lines connect points of equal elevation. The closer the lines are together, the steeper the terrain."
      },
      {
        question: "What is the 0-degree line of longitude called?",
        options: ["The Equator", "The Tropic of Cancer", "The Prime Meridian", "The International Date Line"],
        answer: "The Prime Meridian",
        explanation: "The Prime Meridian, which passes through Greenwich, England, is the line of 0° longitude from which all other longitudes are measured."
      },
      {
        question: "On a map, what does a compass rose show?",
        options: ["The date the map was made", "The scale of the map", "The direction of North, South, East, and West", "The elevation of mountains"],
        answer: "The direction of North, South, East, and West",
        explanation: "A compass rose is a figure on a map used to display the orientation of the cardinal directions."
      },
      {
        question: "If the scale of a map is 1cm = 2km, how far is a real distance of 10km represented on the map?",
        options: ["2 cm", "5 cm", "10 cm", "20 cm"],
        answer: "5 cm",
        explanation: "If 1 cm represents 2 km, then to find the map distance for 10 km, you divide 10 km by 2 km/cm, which equals 5 cm."
      },
      {
        question: "The top of a map usually points to which direction?",
        options: ["South", "East", "West", "North"],
        answer: "North",
        explanation: "By convention, North is almost always oriented to be at the top of a map, unless otherwise specified by a compass rose."
      },
      {
        question: "What do blue lines on a map typically represent?",
        options: ["Roads", "Mountains", "Deserts", "Water features like rivers or lakes"],
        answer: "Water features like rivers or lakes",
        explanation: "Blue is the standard color used on maps to represent all forms of water, including oceans, lakes, rivers, and streams."
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
      },
      {
        question: "Which soil particle is the largest and feels gritty?",
        options: ["Sand", "Silt", "Clay", "Humus"],
        answer: "Sand",
        explanation: "Sand particles are the largest of the three main soil particles. They create large pores in the soil, which allows for excellent drainage but poor water retention."
      },
      {
        question: "What does soil pH measure?",
        options: ["The temperature of the soil", "The amount of water in the soil", "The acidity or alkalinity of the soil", "The color of the soil"],
        answer: "The acidity or alkalinity of the soil",
        explanation: "Soil pH is a measure of the acidity or basicity (alkalinity) of a soil. It is an important factor in determining which plants will grow well."
      },
      {
        question: "Which of these is a way to prevent soil erosion?",
        options: ["Deforestation", "Overgrazing", "Contour ploughing", "Ploughing up and down a hill"],
        answer: "Contour ploughing",
        explanation: "Contour ploughing involves ploughing along the contours of the land. This creates ridges that slow down water flow and prevent soil from being washed away."
      },
      {
        question: "The vertical section of the soil from the surface to the parent rock is called a:",
        options: ["Soil Horizon", "Soil Profile", "Soil Texture", "Soil Structure"],
        answer: "Soil Profile",
        explanation: "A soil profile is a vertical cross-section of the soil, showing its different layers or horizons (O, A, B, C)."
      },
      {
        question: "Which nutrients are considered primary macronutrients for plants?",
        options: ["Iron, Zinc, Copper", "Nitrogen, Phosphorus, Potassium", "Calcium, Magnesium, Sulfur", "Oxygen, Carbon, Hydrogen"],
        answer: "Nitrogen, Phosphorus, Potassium",
        explanation: "Nitrogen (N), Phosphorus (P), and Potassium (K) are the three main nutrients required by plants in large amounts and are the primary components of most fertilizers."
      },
      {
        question: "Which soil type is heavy, gets sticky when wet, and cracks when dry?",
        options: ["Sandy Soil", "Clay Soil", "Silt Soil", "Loam Soil"],
        answer: "Clay Soil",
        explanation: "Clay soil is made of very fine particles. It holds a lot of water and nutrients but can become waterlogged and is hard to work with."
      }
    ]
  }
];

// NOTE: The `quizzesData` export is kept for any legacy components, but it is empty.
// New quiz logic should fetch from Firestore.
export const quizzesData: Quiz[] = [];
