'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Languages,
  Timer,
  Sigma,
  Dna,
  FlaskConical,
  Globe,
  Leaf,
  Landmark,
  Laptop,
  HeartHandshake,
  Users,
  Book,
} from 'lucide-react';
import Link from 'next/link';
import { ReactElement } from 'react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

type Quiz = {
  id: string;
  title: string;
  subject: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questions: number; // Assuming this is the number of questions
  timeLimit: number;
};

const subjectIcons: { [key: string]: ReactElement } = {
  English: <Languages className="h-6 w-6 text-primary" />,
  Chichewa: <Languages className="h-6 w-6 text-primary" />,
  Mathematics: <Sigma className="h-6 w-6 text-primary" />,
  Biology: <Dna className="h-6 w-6 text-primary" />,
  Chemistry: <FlaskConical className="h-6 w-6 text-primary" />,
  Physics: <Sigma className="h-6 w-6 text-primary" />,
  Geography: <Globe className="h-6 w-6 text-primary" />,
  Agriculture: <Leaf className="h-6 w-6 text-primary" />,
  History: <Landmark className="h-6 w-6 text-primary" />,
  'Computer Studies': <Laptop className="h-6 w-6 text-primary" />,
  'Life Skills': <HeartHandshake className="h-6 w-6 text-primary" />,
  'Social Studies': <Users className="h-6 w-6 text-primary" />,
};

export default function QuizzesPage() {
  const firestore = useFirestore();
  const quizzesCollectionRef = useMemoFirebase(
    () => collection(firestore, 'quizzes'),
    [firestore]
  );
  const { data: quizzes, isLoading } = useCollection<Quiz>(quizzesCollectionRef);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-10 w-24" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {(quizzes || []).map((quiz) => (
        <Card
          key={quiz.id}
          className="flex flex-col hover:shadow-lg transition-shadow"
        >
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-muted rounded-lg">
                {subjectIcons[quiz.subject] || (
                  <Book className="h-6 w-6 text-primary" />
                )}
              </div>
              <div>
                <CardTitle>{quiz.title}</CardTitle>
                <CardDescription>{quiz.subject}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="flex justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span>{quiz.questions} Questions</span>
              </div>
              {quiz.timeLimit > 0 && (
                <div className="flex items-center gap-1">
                  <Timer className="h-4 w-4" />
                  <span>{quiz.timeLimit} min</span>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <Badge variant="outline">{quiz.difficulty}</Badge>
            <Button asChild>
              <Link href={`/quizzes/${quiz.id}`}>Start Quiz</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
