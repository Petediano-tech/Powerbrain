'use client'

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, RefreshCw, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const flashcardData = {
  mathematics: [
    { term: "Variable", definition: "A symbol (usually a letter) that represents a value that can change." },
    { term: "Equation", definition: "A statement that two expressions are equal, indicated by the '=' sign." },
    { term: "Coefficient", definition: "A numerical or constant quantity placed before and multiplying the variable in an algebraic expression (e.g., the '4' in 4x)." },
    { term: "Pythagorean Theorem", definition: "In a right-angled triangle, the square of the hypotenuse side is equal to the sum of squares of the other two sides (a² + b² = c²)." },
    { term: "Integer", definition: "A whole number; a number that is not a fraction." },
  ],
  biology: [
    { term: "Photosynthesis", definition: "The process by which green plants use sunlight to synthesize foods from carbon dioxide and water." },
    { term: "Mitochondrion", definition: "An organelle found in large numbers in most cells, in which the biochemical processes of respiration and energy production occur. It's often called the 'powerhouse of the cell'." },
    { term: "Cell Membrane", definition: "The semipermeable membrane surrounding the cytoplasm of a cell, controlling which substances can enter or leave." },
    { term: "DNA", definition: "Deoxyribonucleic acid, a self-replicating material present in nearly all living organisms as the main constituent of chromosomes. It is the carrier of genetic information." },
    { term: "Ecosystem", definition: "A biological community of interacting organisms and their physical environment." },
  ],
  english: [
      { term: "Metaphor", definition: "A figure of speech in which a word or phrase is applied to an object or action to which it is not literally applicable (e.g., 'the world is a stage')." },
      { term: "Simile", definition: "A figure of speech involving the comparison of one thing with another thing of a different kind, used to make a description more emphatic or vivid (e.g., 'as brave as a lion')." },
      { term: "Onomatopoeia", definition: "The formation of a word from a sound associated with what is named (e.g., 'cuckoo', 'sizzle')." },
      { term: "Alliteration", definition: "The occurrence of the same letter or sound at the beginning of adjacent or closely connected words (e.g., 'sweet birds sang')." },
      { term: "Hyperbole", definition: "Exaggerated statements or claims not meant to be taken literally (e.g., 'I'm so hungry I could eat a horse')." },
  ],
  history: [
    { term: "The Iron Age", definition: "The period following the Bronze Age; characterized by the rapid spread of iron tools and weapons." },
    { term: "The Renaissance", definition: "A period in European history, from the 14th to the 17th century, regarded as the cultural bridge between the Middle Ages and modern history." },
    { term: "The Industrial Revolution", definition: "A period of major industrialization that took place during the late 1700s and early 1800s, beginning in Great Britain." },
  ]
};

type Subject = keyof typeof flashcardData;

export default function FlashcardsPage() {
  const [subject, setSubject] = useState<Subject>("mathematics");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const cards = flashcardData[subject];
  const currentCard = cards[currentIndex];

  const handleSubjectChange = (newSubject: Subject) => {
    setSubject(newSubject);
    setCurrentIndex(0);
    setIsFlipped(false);
  }

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
    }, 150);
  };

  const handleShuffle = () => {
      setIsFlipped(false);
      const newIndex = Math.floor(Math.random() * cards.length);
      setCurrentIndex(newIndex);
  }
  
  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window !== 'undefined' && window.speechSynthesis) {
        const textToSpeak = isFlipped ? currentCard.definition : currentCard.term;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        window.speechSynthesis.speak(utterance);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
       <div className="w-full max-w-lg space-y-2">
            <h1 className="text-2xl font-bold text-center">Flashcards</h1>
            <p className="text-muted-foreground text-center">Select a subject to start practicing.</p>
            <Select onValueChange={handleSubjectChange} defaultValue={subject}>
              <SelectTrigger className="w-full md:w-[280px] mx-auto">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mathematics">Mathematics</SelectItem>
                <SelectItem value="biology">Biology</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="history">History</SelectItem>
              </SelectContent>
            </Select>
      </div>

      <div className="relative w-full max-w-lg h-64" style={{ perspective: '1000px' }}>
        <div
          className={cn(
            "absolute w-full h-full transition-transform duration-500",
            isFlipped ? 'rotate-y-180' : ''
          )}
          style={{ transformStyle: 'preserve-3d' }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front of the card */}
          <Card className="absolute w-full h-full flex items-center justify-center cursor-pointer" style={{ backfaceVisibility: 'hidden' }}>
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold">{currentCard.term}</p>
            </CardContent>
             <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={handleSpeak}>
                <Volume2 className="h-5 w-5" />
             </Button>
          </Card>

          {/* Back of the card */}
          <Card
            className="absolute w-full h-full flex items-center justify-center cursor-pointer bg-muted"
            style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
          >
            <CardContent className="p-6 text-center">
              <p className="text-lg">{currentCard.definition}</p>
            </CardContent>
            <Button size="icon" variant="ghost" className="absolute top-2 right-2" onClick={handleSpeak}>
                <Volume2 className="h-5 w-5" />
             </Button>
          </Card>
        </div>
      </div>
        <p className="text-sm text-muted-foreground">Click card to flip</p>

      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={handlePrev}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <span className="font-medium text-muted-foreground">{currentIndex + 1} / {cards.length}</span>
        <Button variant="outline" size="icon" onClick={handleNext}>
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
      
       <Button variant="secondary" onClick={handleShuffle}>
            <RefreshCw className="mr-2 h-4 w-4" /> Shuffle Deck
        </Button>
    </div>
  );
}
