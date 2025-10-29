'use client';

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, ChevronLeft, Award } from "lucide-react";
import Link from "next/link";
import Confetti from 'react-confetti';
import { cn } from "@/lib/utils";
import { useUser, useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc, runTransaction, serverTimestamp, increment } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

type Question = {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};

const quizData: { [key: string]: { title: string; questions: Question[] } } = {
  "algebra-basics": {
    title: "Algebra Basics",
    questions: [
      {
        question: "What is the value of 'x' in the equation x + 5 = 12?",
        options: ["5", "7", "10", "12"],
        answer: "7",
        explanation: "To find x, you subtract 5 from both sides of the equation: 12 - 5 = 7.",
      },
      {
        question: "Which of the following is a variable?",
        options: ["y", "14", "+", "="],
        answer: "y",
        explanation: "A variable is a symbol, typically a letter, that represents an unknown value. 'y' is used here as a variable.",
      },
      {
        question: "Simplify the expression: 3a + 2a",
        options: ["5a", "6a", "3a2", "5a^2"],
        answer: "5a",
        explanation: "Since both terms have the same variable 'a', you can add their coefficients: 3 + 2 = 5. So, 3a + 2a = 5a.",
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
        explanation: "To find x, you divide both sides of the equation by 2: 10 / 2 = 5.",
      },
       {
        question: "Which expression is equivalent to 4(x + 2)?",
        options: ["4x + 2", "4x + 8", "x + 8", "4x + 6"],
        answer: "4x + 8",
        explanation: "Using the distributive property, you multiply 4 by each term inside the parentheses: 4 * x and 4 * 2, which gives 4x + 8.",
      },
    ],
  },
  "cellular-biology": {
      title: "Cellular Biology",
      questions: [
          {
              question: "What is the powerhouse of the cell?",
              options: ["Nucleus", "Ribosome", "Mitochondrion", "Chloroplast"],
              answer: "Mitochondrion",
              explanation: "Mitochondria are responsible for generating most of the cell's supply of adenosine triphosphate (ATP), used as a source of chemical energy.",
          }
      ]
  },
   "tenses-and-grammar": {
      title: "Tenses and Grammar",
      questions: [
          {
              question: "Which sentence is in the past tense?",
              options: ["I will go to the market.", "I am going to the market.", "I went to the market.", "I go to the market."],
              answer: "I went to the market.",
              explanation: "The verb 'went' is the past tense form of 'go', indicating the action has already happened.",
          }
      ]
  },
   "advanced-calculus": {
      title: "Advanced Calculus",
      questions: [
          {
              question: "What is the derivative of x^2?",
              options: ["2x", "x", "x^2/2", "2"],
              answer: "2x",
              explanation: "Using the power rule for differentiation, the derivative of x^n is n*x^(n-1). For x^2, this is 2*x^(2-1) = 2x.",
          }
      ]
  }
};

export default function QuizPage({ params }: { params: { quizId: string } }) {
  const quiz = quizData[params.quizId];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: string}>({});
  const [showResults, setShowResults] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const handleFinishQuiz = async (calculatedScore: number) => {
    if (!user || isSaving) return;
    setIsSaving(true);
    
    const userProfileRef = doc(firestore, 'userProfiles', user.uid);
    const quizAttemptRef = doc(firestore, `userProfiles/${user.uid}/quizAttempts`, `${params.quizId}_${Date.now()}`);

    try {
      await runTransaction(firestore, async (transaction) => {
        const userProfileDoc = await transaction.get(userProfileRef);
        if (!userProfileDoc.exists()) {
          throw new Error("User profile not found!");
        }

        const oldQuizzesCompleted = userProfileDoc.data().quizzesCompleted || 0;
        const oldAverageScore = userProfileDoc.data().averageScore || 0;
        const totalTimeStudied = userProfileDoc.data().totalTimeStudied || 0;

        const newQuizzesCompleted = oldQuizzesCompleted + 1;
        const newAverageScore = ((oldAverageScore * oldQuizzesCompleted) + calculatedScore) / newQuizzesCompleted;
        const newTotalTimeStudied = totalTimeStudied + (quiz.questions.length * 0.5); // Add 30s per question

        transaction.update(userProfileRef, {
          quizzesCompleted: newQuizzesCompleted,
          averageScore: newAverageScore,
          totalTimeStudied: increment(30 * quiz.questions.length),
        });

        transaction.set(quizAttemptRef, {
          quizId: params.quizId,
          quizTitle: quiz.title,
          score: calculatedScore,
          completedAt: new Date().toISOString(),
        });
      });

      setShowResults(true);

    } catch (e) {
      console.error("Quiz save transaction failed: ", e);
      toast({
        variant: "destructive",
        title: "Oh no!",
        description: "There was an error saving your quiz results. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  if (!quiz) {
    return (
        <Card className="m-auto max-w-lg text-center p-8">
            <CardTitle>Quiz Not Found</CardTitle>
            <CardDescription>This quiz does not exist or is under construction.</CardDescription>
            <Button asChild className="mt-4">
                <Link href="/quizzes"><ChevronLeft className="mr-2"/> Back to Quizzes</Link>
            </Button>
        </Card>
    )
  }

  const { title, questions } = quiz;
  const currentQuestion = questions[currentQuestionIndex];
  const progress = showResults ? 100 : ((currentQuestionIndex) / questions.length) * 100;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers(prev => ({...prev, [currentQuestionIndex]: answer}));
  };

  const handleNext = () => {
    setIsChecking(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const finalScore = (score / questions.length) * 100;
      handleFinishQuiz(finalScore);
    }
  };

  const handleCheckAnswer = () => {
    setIsChecking(true);
  };
  
  const score = useMemo(() => {
    return questions.reduce((correctAnswers, question, index) => {
      return selectedAnswers[index] === question.answer ? correctAnswers + 1 : correctAnswers;
    }, 0);
  }, [questions, selectedAnswers]);

  const scorePercentage = useMemo(() => (score / questions.length) * 100, [score, questions.length]);

  if (showResults) {
    return (
      <>
        {scorePercentage === 100 && <Confetti recycle={false} numberOfPieces={200} />}
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center items-center">
            <div className="p-3 bg-muted rounded-full mb-2">
                <Award className="h-10 w-10 text-primary"/>
            </div>
            <CardTitle className="text-3xl">Quiz Complete!</CardTitle>
            <CardDescription>You finished the {title} quiz.</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
              <p className="text-5xl font-bold text-primary">{score}/{questions.length}</p>
              <p className="text-2xl font-semibold">
                  {scorePercentage.toFixed(0)}%
              </p>
              <Progress value={scorePercentage} className="h-3" />
          </CardContent>
          <CardContent className="space-y-4">
              <h3 className="font-bold text-lg">Review Your Answers:</h3>
              {questions.map((q, index) => (
                  <div key={index} className="p-4 rounded-lg border bg-muted/50">
                      <p className="font-semibold">{q.question}</p>
                      <p className={cn("flex items-center gap-2 text-sm mt-2", selectedAnswers[index] === q.answer ? 'text-foreground' : 'text-destructive')}>
                          {selectedAnswers[index] === q.answer ? <CheckCircle size={16} /> : <XCircle size={16} />}
                          Your answer: {selectedAnswers[index] || "Not answered"}
                      </p>
                      {selectedAnswers[index] !== q.answer && (
                          <p className="text-sm text-foreground mt-1">Correct answer: {q.answer}</p>
                      )}
                       <p className="text-xs text-muted-foreground mt-2 pt-2 border-t">{q.explanation}</p>
                  </div>
              ))}
          </CardContent>
          <CardFooter className="flex-col gap-2 pt-4">
            <Button onClick={() => { setShowResults(false); setCurrentQuestionIndex(0); setSelectedAnswers({}); setIsChecking(false); }} className="w-full">
              Try Again
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/quizzes">Choose Another Quiz</Link>
            </Button>
          </CardFooter>
        </Card>
      </>
    );
  }

  const selectedAnswer = selectedAnswers[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.answer;

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
          value={selectedAnswer}
          onValueChange={handleAnswerSelect}
          className="space-y-3"
          disabled={isChecking}
        >
          {currentQuestion.options.map((option) => {
            const isSelected = selectedAnswer === option;
            let labelClass = "";
            if(isChecking && isSelected) {
                labelClass = isCorrect ? 'border-foreground' : 'border-destructive';
            } else if (isChecking && currentQuestion.answer === option) {
                labelClass = "border-foreground";
            }

            return (
              <div key={option}>
                <RadioGroupItem value={option} id={option} className="sr-only" />
                <Label 
                  htmlFor={option} 
                  className={cn(`flex items-center space-x-3 border rounded-md p-3 transition-all cursor-pointer
                    hover:border-primary
                    ${isSelected ? 'border-primary' : ''}
                  `, labelClass)}
                >
                  <div className="h-4 w-4 rounded-full border border-primary flex items-center justify-center">
                    {isSelected && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
                  </div>
                  <span className="flex-1">{option}</span>
                  {isChecking && isCorrect && isSelected && <CheckCircle />}
                  {isChecking && !isCorrect && isSelected && <XCircle className="text-destructive" />}
                  {isChecking && currentQuestion.answer === option && !isSelected && <CheckCircle />}
                </Label>
              </div>
            )}
          )}
        </RadioGroup>
        
        {isChecking && (
            <div className={cn('p-4 rounded-md text-sm', isCorrect ? 'bg-muted' : 'bg-destructive/10')}>
                <h4 className="font-bold mb-1">{isCorrect ? "Correct!" : "Not quite..."}</h4>
                <p>{currentQuestion.explanation}</p>
            </div>
        )}

      </CardContent>
      <CardFooter>
        {isChecking ? (
            <Button onClick={handleNext} className="w-full" disabled={isSaving}>
                {isSaving 
                    ? "Saving Results..." 
                    : currentQuestionIndex < questions.length - 1 
                        ? "Next Question" 
                        : "Finish Quiz"
                }
            </Button>
        ) : (
            <Button
                onClick={handleCheckAnswer}
                disabled={!selectedAnswer}
                className="w-full"
            >
                Check Answer
            </Button>
        )}
      </CardFooter>
    </Card>
  );
}
