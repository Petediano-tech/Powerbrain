
'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  CheckCircle,
  XCircle,
  ChevronLeft,
  Award,
} from 'lucide-react';
import Link from 'next/link';
import Confetti from 'react-confetti';
import { cn } from '@/lib/utils';
import {
  useFirestore,
  useUser,
  useDoc,
  useCollection,
  useMemoFirebase,
  WithId,
} from '@/firebase';
import { doc, runTransaction, increment, collection } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useParams } from 'next/navigation';
import { useUserStore } from '@/hooks/use-user-store';
import { Skeleton } from '@/components/ui/skeleton';

type Question = {
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
};

type Quiz = {
  id: string;
  title: string;
  subject: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questions: number;
  timeLimit: number;
};

export default function QuizPage() {
  const params = useParams();
  const quizId = params.quizId as string;
  const { profileId } = useUserStore();
  const firestore = useFirestore();
  const { toast } = useToast();
  const { user } = useUser();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial size
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const quizDocRef = useMemoFirebase(
    () => (quizId ? doc(firestore, 'quizzes', quizId) : null),
    [firestore, quizId]
  );
  const questionsCollectionRef = useMemoFirebase(
    () => (quizId ? collection(firestore, `quizzes/${quizId}/questions`) : null),
    [firestore, quizId]
  );

  const { data: quiz, isLoading: isLoadingQuiz } = useDoc<Quiz>(quizDocRef);
  const { data: questions, isLoading: isLoadingQuestions } = useCollection<Question>(questionsCollectionRef);
  
  const score = useMemo(() => {
    if (!questions) return 0;
    return questions.reduce((correctAnswers, question, index) => {
      return selectedAnswers[index] === question.answer
        ? correctAnswers + 1
        : correctAnswers;
    }, 0);
  }, [questions, selectedAnswers]);

  const scorePercentage = useMemo(() =>
      questions && questions.length > 0 ? (score / questions.length) * 100 : 0,
    [score, questions]
  );

  const isLoading = isLoadingQuiz || isLoadingQuestions;

  const handleFinishQuiz = async () => {
    if (!profileId || isSaving || !quiz || !questions || !user) {
      setShowResults(true);
      return;
    }
    setIsSaving(true);
    const finalScorePercentage = (score / questions.length) * 100;
    
    const userProfileRef = doc(firestore, 'userProfiles', profileId);
    const quizAttemptRef = doc(
      collection(firestore, `userProfiles/${profileId}/quizAttempts`)
    );

    try {
      await runTransaction(firestore, async (transaction) => {
        const userProfileDoc = await transaction.get(userProfileRef);
        if (!userProfileDoc.exists()) {
          throw new Error('User profile not found!');
        }

        const oldQuizzesCompleted = userProfileDoc.data().quizzesCompleted || 0;
        const oldAverageScore = userProfileDoc.data().averageScore || 0;

        const newQuizzesCompleted = oldQuizzesCompleted + 1;
        const newAverageScore =
          (oldAverageScore * oldQuizzesCompleted + finalScorePercentage) / newQuizzesCompleted;

        transaction.update(userProfileRef, {
          quizzesCompleted: increment(1),
          averageScore: newAverageScore,
          totalTimeStudied: increment(questions.length * 30), // Add 30s per question
          topicsMastered: finalScorePercentage > 80 ? increment(1) : userProfileDoc.data().topicsMastered || 0,
        });

        transaction.set(quizAttemptRef, {
          quizId: quizId,
          quizTitle: quiz.title,
          score: finalScorePercentage,
          correct: score,
          total: questions.length,
          completedAt: new Date().toISOString(),
        });
      });

      setShowResults(true);
    } catch (e) {
      console.error('Quiz save transaction failed: ', e);
      setShowResults(true);
      toast({
        variant: 'destructive',
        title: 'Oh no!',
        description:
          'There was an error saving your quiz results. Your score is still recorded for this session.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-2 w-full mt-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <Skeleton className="h-6 w-full" />
          <div className="space-y-3">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
    );
  }

  if (!quiz || !questions || questions.length === 0) {
    return (
      <Card className="m-auto max-w-lg text-center p-8">
        <CardTitle>Quiz Not Found</CardTitle>
        <CardDescription>
          This quiz does not exist or has no questions yet.
        </CardDescription>
        <Button asChild className="mt-4">
          <Link href="/quizzes">
            <ChevronLeft className="mr-2" /> Back to Quizzes
          </Link>
        </Button>
      </Card>
    );
  }

  const { title } = quiz;
  const currentQuestion = questions[currentQuestionIndex];
  const progress = showResults
    ? 100
    : (currentQuestionIndex / questions.length) * 100;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentQuestionIndex]: answer }));
    setIsChecking(true); // Automatically check answer on selection
  };

  const handleNext = () => {
    setIsChecking(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleFinishQuiz();
    }
  };
  
  if (showResults) {
    return (
      <>
        {scorePercentage >= 80 && windowSize.width > 0 && (
          <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={300} />
        )}
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center items-center">
            <div className="p-3 bg-muted rounded-full mb-2">
              <Award className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-3xl">Quiz Complete!</CardTitle>
            <CardDescription>You finished the {title} quiz.</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-5xl font-bold text-primary">
              {score}/{questions.length}
            </p>
            <p className="text-2xl font-semibold">
              {scorePercentage.toFixed(0)}%
            </p>
            <Progress value={scorePercentage} className="h-3" />
          </CardContent>
          <CardContent className="space-y-4">
            <h3 className="font-bold text-lg">Review Your Answers:</h3>
            {questions.map((q, index) => (
              <div key={q.id} className="p-4 rounded-lg border bg-muted/50">
                <p className="font-semibold">
                  {index + 1}. {q.question}
                </p>
                <p
                  className={cn(
                    'flex items-center gap-2 text-sm mt-2',
                    selectedAnswers[index] === q.answer
                      ? 'text-green-600'
                      : 'text-destructive'
                  )}
                >
                  {selectedAnswers[index] === q.answer ? (
                    <CheckCircle size={16} />
                  ) : (
                    <XCircle size={16} />
                  )}
                  Your answer: {selectedAnswers[index] || 'Not answered'}
                </p>
                {selectedAnswers[index] !== q.answer && (
                  <p className="text-sm text-foreground mt-1">
                    Correct answer: {q.answer}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-2 pt-2 border-t">
                  <span className="font-bold">Explanation:</span> {q.explanation}
                </p>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex-col gap-2 pt-4">
            <Button
              onClick={() => {
                setShowResults(false);
                setCurrentQuestionIndex(0);
                setSelectedAnswers({});
                setIsChecking(false);
              }}
              className="w-full"
            >
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
        <CardDescription>
          Question {currentQuestionIndex + 1} of {questions.length}
        </CardDescription>
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
          {currentQuestion.options.map((option: string) => {
            const isSelected = selectedAnswer === option;
            let labelClass = '';
            if (isChecking && isSelected) {
              labelClass = isCorrect ? 'border-green-500 bg-green-500/10' : 'border-destructive bg-destructive/10';
            } else if (isChecking && currentQuestion.answer === option) {
              labelClass = 'border-green-500 bg-green-500/10';
            }

            return (
              <Label
                key={option}
                htmlFor={option}
                className={cn(
                  `flex items-center space-x-3 border-2 rounded-md p-3 transition-all
                  ${!isChecking ? 'cursor-pointer hover:border-primary' : 'cursor-default'}
                  ${isSelected && !isChecking ? 'border-primary' : ''}
                `,
                  labelClass
                )}
              >
                <RadioGroupItem value={option} id={option} className="h-5 w-5" />
                <span className="flex-1">{option}</span>
                {isChecking && isCorrect && isSelected && (
                  <CheckCircle className="text-green-500" />
                )}
                {isChecking && !isCorrect && isSelected && (
                  <XCircle className="text-destructive" />
                )}
                {isChecking &&
                  currentQuestion.answer === option &&
                  !isSelected && <CheckCircle className="text-green-500" />}
              </Label>
            );
          })}
        </RadioGroup>

        {isChecking && (
          <div
            className={cn(
              'p-4 rounded-md text-sm',
              isCorrect ? 'bg-green-500/10 text-green-700 dark:text-green-300' : 'bg-destructive/10 text-destructive dark:text-destructive-foreground'
            )}
          >
            <h4 className="font-bold mb-1">
              {isCorrect ? 'Correct!' : 'Not quite...'}
            </h4>
            <p>
              <span className="font-bold">Explanation: </span>{currentQuestion.explanation}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleNext} className="w-full" disabled={!isChecking || isSaving}>
            {isSaving
              ? 'Saving Results...'
              : currentQuestionIndex < questions.length - 1
              ? 'Next Question'
              : 'Finish Quiz'}
        </Button>
      </CardFooter>
    </Card>
  );
}
