
'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
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
  Timer,
  AlertTriangle,
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
} from '@/firebase';
import { doc, runTransaction, increment, collection } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useParams } from 'next/navigation';
import { useUserStore } from '@/hooks/use-user-store';
import { Skeleton } from '@/components/ui/skeleton';
import { quizzesToSeed, Quiz as LocalQuiz } from '@/lib/quizzes-data';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';


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
  questions: number; // In Firestore, this is a count
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
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showTimeoutAlert, setShowTimeoutAlert] = useState(false);

  // Check for local quiz data first
  const localQuizData: LocalQuiz | undefined = quizzesToSeed.find(q => q.id === quizId);

  const quizDocRef = useMemoFirebase(
    () => (quizId && !localQuizData ? doc(firestore, 'quizzes', quizId) : null),
    [firestore, quizId, localQuizData]
  );
  const questionsCollectionRef = useMemoFirebase(
    () => (quizId && !localQuizData ? collection(firestore, `quizzes/${quizId}/questions`) : null),
    [firestore, quizId, localQuizData]
  );
  
  const { data: quizFromDB, isLoading: isLoadingQuiz } = useDoc<Quiz>(quizDocRef);
  const { data: questionsFromDB, isLoading: isLoadingQuestions } = useCollection<Question>(questionsCollectionRef);

  const quiz = useMemo(() => {
    if (localQuizData) {
      return { ...localQuizData, id: localQuizData.id! };
    }
    return quizFromDB;
  }, [localQuizData, quizFromDB]);

  const questions = useMemo(() => {
    if (localQuizData) {
      return localQuizData.questions.map((q, i) => ({...q, id: q.id || `q${i}`}));
    }
    return questionsFromDB;
  }, [localQuizData, questionsFromDB]);

  useEffect(() => {
    if (quiz) {
      setTimeLeft(quiz.timeLimit * 60);
    }
  }, [quiz]);

  const handleFinishQuiz = useCallback(async () => {
    if (!profileId || isSaving || !quiz || !questions || !user) {
      setShowResults(true);
      return;
    }
    setIsSaving(true);
    const finalScore = questions.reduce((correct, q, i) => selectedAnswers[i] === q.answer ? correct + 1 : correct, 0);
    const finalScorePercentage = (finalScore / questions.length) * 100;
    
    const userProfileRef = doc(firestore, 'userProfiles', profileId);
    const quizAttemptRef = doc(
      collection(firestore, `userProfiles/${profileId}/quizAttempts`)
    );

    try {
      await runTransaction(firestore, async (transaction) => {
        const userProfileDoc = await transaction.get(userProfileRef);
        if (!userProfileDoc.exists()) throw new Error('User profile not found!');
        
        const oldQuizzesCompleted = userProfileDoc.data().quizzesCompleted || 0;
        const oldAverageScore = userProfileDoc.data().averageScore || 0;
        const newAverageScore = (oldAverageScore * oldQuizzesCompleted + finalScorePercentage) / (oldQuizzesCompleted + 1);

        transaction.update(userProfileRef, {
          quizzesCompleted: increment(1),
          averageScore: newAverageScore,
          totalTimeStudied: increment(questions.length * 30),
          topicsMastered: finalScorePercentage > 80 ? increment(1) : userProfileDoc.data().topicsMastered || 0,
        });

        transaction.set(quizAttemptRef, {
          quizId: quizId,
          quizTitle: quiz.title,
          score: finalScorePercentage,
          correct: finalScore,
          total: questions.length,
          completedAt: new Date().toISOString(),
        });
      });
    } catch (e) {
      console.error('Quiz save transaction failed: ', e);
      toast({ variant: 'destructive', title: 'Oh no!', description: 'There was an error saving your quiz results.' });
    } finally {
      setShowResults(true);
      setIsSaving(false);
    }
  }, [profileId, isSaving, quiz, questions, user, selectedAnswers, firestore, toast, quizId]);
  
  useEffect(() => {
    if (!isQuizStarted || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setShowTimeoutAlert(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isQuizStarted, timeLeft]);
  
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
  
  const isLoading = !localQuizData && (isLoadingQuiz || isLoadingQuestions);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    setIsChecking(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleFinishQuiz();
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
        <CardDescription>This quiz does not exist or has no questions yet.</CardDescription>
        <Button asChild className="mt-4">
          <Link href="/quizzes"><ChevronLeft className="mr-2" /> Back to Quizzes</Link>
        </Button>
      </Card>
    );
  }

  if (!isQuizStarted) {
    return (
      <Card className="max-w-2xl mx-auto text-center">
        <CardHeader>
          <CardTitle className="text-3xl">{quiz.title}</CardTitle>
          <CardDescription>{quiz.subject}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">{questions.length} Questions</p>
          <div className="flex items-center justify-center gap-2 text-lg">
            <Timer className="h-6 w-6" />
            <span>{quiz.timeLimit} Minutes</span>
          </div>
          <p className="text-muted-foreground">The timer will start as soon as you begin. Good luck!</p>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={() => setIsQuizStarted(true)} className="w-full">Start Quiz</Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/quizzes">Back to Quizzes</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
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
            <CardDescription>You finished the {quiz.title} quiz.</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-5xl font-bold text-primary">{score}/{questions.length}</p>
            <p className="text-2xl font-semibold">{scorePercentage.toFixed(0)}%</p>
            <Progress value={scorePercentage} className="h-3" />
          </CardContent>
          <CardContent className="space-y-4">
            <h3 className="font-bold text-lg">Review Your Answers:</h3>
            {questions.map((q, index) => (
              <div key={q.id} className="p-4 rounded-lg border bg-muted/50">
                <p className="font-semibold">{index + 1}. {q.question}</p>
                <p className={cn('flex items-center gap-2 text-sm mt-2', selectedAnswers[index] === q.answer ? 'text-green-600' : 'text-destructive')}>
                  {selectedAnswers[index] === q.answer ? <CheckCircle size={16} /> : <XCircle size={16} />}
                  Your answer: {selectedAnswers[index] || 'Not answered'}
                </p>
                {selectedAnswers[index] !== q.answer && (
                  <p className="text-sm text-foreground mt-1">Correct answer: {q.answer}</p>
                )}
                <p className="text-xs text-muted-foreground mt-2 pt-2 border-t"><span className="font-bold">Explanation:</span> {q.explanation}</p>
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex-col gap-2 pt-4">
            <Button onClick={() => { setIsQuizStarted(false); setShowResults(false); setCurrentQuestionIndex(0); setSelectedAnswers({}); setIsChecking(false); }} className="w-full">
              Try Again
            </Button>
            <Button variant="outline" asChild className="w-full"><Link href="/quizzes">Choose Another Quiz</Link></Button>
          </CardFooter>
        </Card>
      </>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = showResults ? 100 : ((currentQuestionIndex + 1) / questions.length) * 100;
  const selectedAnswer = selectedAnswers[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.answer;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [currentQuestionIndex]: answer }));
    setIsChecking(true);
  };
  
  return (
    <>
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
            <div>
                <CardTitle className="text-2xl">{quiz.title}</CardTitle>
                <CardDescription>Question {currentQuestionIndex + 1} of {questions.length}</CardDescription>
            </div>
            <div className={cn("flex items-center gap-2 font-mono text-lg font-bold p-2 rounded-lg", timeLeft < 60 ? "text-destructive" : "text-muted-foreground")}>
                <Timer />
                <span>{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</span>
            </div>
        </div>
        <Progress value={progress} className="h-2 mt-2" />
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-lg font-semibold">{currentQuestion.question}</p>
        <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect} className="space-y-3" disabled={isChecking}>
          {currentQuestion.options.map((option: string) => {
            const isSelected = selectedAnswer === option;
            let labelClass = '';
            if (isChecking && isSelected) labelClass = isCorrect ? 'border-green-500 bg-green-500/10' : 'border-destructive bg-destructive/10';
            else if (isChecking && currentQuestion.answer === option) labelClass = 'border-green-500 bg-green-500/10';

            return (
              <Label key={option} htmlFor={option} className={cn(`flex items-center space-x-3 border-2 rounded-md p-3 transition-all ${!isChecking ? 'cursor-pointer hover:border-primary' : 'cursor-default'} ${isSelected && !isChecking ? 'border-primary' : ''}`, labelClass)}>
                <RadioGroupItem value={option} id={option} className="h-5 w-5" />
                <span className="flex-1">{option}</span>
                {isChecking && isCorrect && isSelected && <CheckCircle className="text-green-500" />}
                {isChecking && !isCorrect && isSelected && <XCircle className="text-destructive" />}
                {isChecking && currentQuestion.answer === option && !isSelected && <CheckCircle className="text-green-500" />}
              </Label>
            );
          })}
        </RadioGroup>

        {isChecking && (
          <div className={cn('p-4 rounded-md text-sm', isCorrect ? 'bg-green-500/10 text-green-700 dark:text-green-300' : 'bg-destructive/10 text-destructive dark:text-destructive-foreground')}>
            <h4 className="font-bold mb-1">{isCorrect ? 'Correct!' : 'Not quite...'}</h4>
            <p><span className="font-bold">Explanation: </span>{currentQuestion.explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleNext} className="w-full" disabled={!isChecking || isSaving}>
            {isSaving ? 'Saving Results...' : currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
        </Button>
      </CardFooter>
    </Card>
    
    <AlertDialog open={showTimeoutAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2"><AlertTriangle className="text-destructive" /> Time's Up!</AlertDialogTitle>
          <AlertDialogDescription>
            The time for this quiz has expired. Your results will be calculated based on the questions you answered.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogAction onClick={() => { setShowTimeoutAlert(false); handleFinishQuiz(); }}>View Results</AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
}
