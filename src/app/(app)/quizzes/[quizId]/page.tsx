'use client';

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { capitalize } from "@/lib/utils";

type Question = {
  question: string;
  options: string[];
  answer: string;
};

const quizData: { [key: string]: { title: string; questions: Question[] } } = {
  "algebra-basics": {
    title: "Algebra Basics",
    questions: [
      {
        question: "What is the value of 'x' in the equation x + 5 = 12?",
        options: ["5", "7", "10", "12"],
        answer: "7",
      },
      {
        question: "Which of the following is a variable?",
        options: ["y", "14", "+", "="],
        answer: "y",
      },
      {
        question: "Simplify the expression: 3a + 2a",
        options: ["5a", "6a", "3a2", "5a^2"],
        answer: "5a",
      },
    ],
  },
  "algebra-fundamentals": {
    title: "Algebra Fundamentals",
    questions: [
      {
        question: "What is the value of 'x' in the equation 2x = 10?",
        options: ["2", "5", "8", "10"],
        answer: "5",
      },
       {
        question: "Which expression is equivalent to 4(x + 2)?",
        options: ["4x + 2", "4x + 8", "x + 8", "4x + 6"],
        answer: "4x + 8",
      },
    ],
  },
  "cellular-biology": {
      title: "Cellular Biology",
      questions: [
          {
              question: "What is the powerhouse of the cell?",
              options: ["Nucleus", "Ribosome", "Mitochondrion", "Chloroplast"],
              answer: "Mitochondrion"
          }
      ]
  },
   "tenses-and-grammar": {
      title: "Tenses and Grammar",
      questions: [
          {
              question: "Which sentence is in the past tense?",
              options: ["I will go to the market.", "I am going to the market.", "I went to the market.", "I go to the market."],
              answer: "I went to the market."
          }
      ]
  },
   "advanced-calculus": {
      title: "Advanced Calculus",
      questions: [
          {
              question: "What is the derivative of x^2?",
              options: ["2x", "x", "x^2/2", "2"],
              answer: "2x"
          }
      ]
  }
};

export default function QuizPage({ params }: { params: { quizId: string } }) {
  const quiz = quizData[params.quizId];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  if (!quiz) {
    return (
        <Card className="m-auto max-w-lg text-center p-8">
            <CardTitle>Quiz Not Found</CardTitle>
            <CardDescription>This quiz is not available yet. Please check back later.</CardDescription>
            <Button asChild className="mt-4">
                <Link href="/quizzes"><ChevronLeft className="mr-2"/> Back to Quizzes</Link>
            </Button>
        </Card>
    )
  }

  const { title, questions } = quiz;
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(newAnswers);
  };
  
  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return answer === questions[index].answer ? score + 1 : score;
    }, 0);
  }

  const score = calculateScore();

  if (showResults) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">Quiz Results</CardTitle>
          <CardDescription>You completed the {title} quiz!</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
            <p className="text-5xl font-bold text-primary">{score}/{questions.length}</p>
            <p className="text-2xl font-semibold">
                {((score / questions.length) * 100).toFixed(0)}%
            </p>
            <Progress value={(score / questions.length) * 100} className="h-3" />
        </CardContent>
        <CardContent className="space-y-4">
            <h3 className="font-bold text-lg">Review Your Answers:</h3>
            {questions.map((q, index) => (
                <div key={index} className="p-3 rounded-lg border">
                    <p className="font-semibold">{q.question}</p>
                    <p className={`flex items-center gap-2 text-sm ${selectedAnswers[index] === q.answer ? 'text-green-500' : 'text-red-500'}`}>
                        {selectedAnswers[index] === q.answer ? <CheckCircle size={16} /> : <XCircle size={16} />}
                        Your answer: {selectedAnswers[index]}
                    </p>
                    {selectedAnswers[index] !== q.answer && (
                        <p className="text-sm text-green-600">Correct answer: {q.answer}</p>
                    )}
                </div>
            ))}
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={() => { setShowResults(false); setCurrentQuestionIndex(0); setSelectedAnswers([]); }} className="w-full">
            Try Again
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/quizzes">Choose Another Quiz</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>Question {currentQuestionIndex + 1} of {questions.length}</CardDescription>
        <Progress value={progress} className="h-2 mt-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-lg font-semibold">{currentQuestion.question}</p>
        <RadioGroup
          value={selectedAnswers[currentQuestionIndex]}
          onValueChange={handleAnswerSelect}
          className="space-y-3"
        >
          {currentQuestion.options.map((option) => (
            <div key={option} className="flex items-center space-x-3 border rounded-md p-3 has-[:checked]:border-primary has-[:checked]:bg-primary/5">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option} className="flex-1 cursor-pointer">{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleNext}
          disabled={!selectedAnswers[currentQuestionIndex]}
          className="w-full bg-sky-blue hover:bg-sky-blue/90 text-background"
        >
          {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
        </Button>
      </CardFooter>
    </Card>
  );
}
