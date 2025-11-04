'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  PencilRuler,
  Lightbulb,
  Sparkles,
  Crown,
  Check,
  Clipboard,
  ClipboardCheck,
} from 'lucide-react';
import {
  type AiQuizGeneratorOutput,
} from '@/ai/flows/ai-quiz-generator';
import { Skeleton } from './ui/skeleton';
import { useDoc, useMemoFirebase } from '@/firebase';
import { doc, getFirestore } from 'firebase/firestore';
import { useUserStore } from '@/hooks/use-user-store';
import Link from 'next/link';
import { Label } from './ui/label';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { useToast } from '@/hooks/use-toast';
import { subjectsData } from '@/lib/subjects-data';
import { aiQuizGenerator } from '@/ai/flows/ai-quiz-generator';

export function AIQuizGenerator() {
  const [quiz, setQuiz] = useState<AiQuizGeneratorOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);

  const firestore = getFirestore();
  const { profileId } = useUserStore();
  const { toast } = useToast();

  const userProfileRef = useMemoFirebase(() => {
    if (!profileId) return null;
    return doc(firestore, 'userProfiles', profileId);
  }, [firestore, profileId]);

  const { data: userProfile, isLoading: isProfileLoading } =
    useDoc(userProfileRef);

  const isPremiumUser =
    userProfile?.subscriptionTier && userProfile.subscriptionTier !== 'free';

  const handleGenerateQuiz = async () => {
    if (!userProfile) return;

    setIsLoading(true);
    setQuiz(null);

    try {
      const result = await aiQuizGenerator({
        subject,
        topic,
        numberOfQuestions: numQuestions,
        gradeLevel: userProfile.gradeLevel || 'Form 2',
      });
      setQuiz(result);
    } catch (error) {
      console.error('Failed to generate AI quiz:', error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'Could not generate the quiz. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to Clipboard!',
      description: 'You can now paste the quiz content.',
    });
  };

  const formatQuizForCopy = () => {
    if (!quiz) return '';
    return quiz.questions
      .map((q, i) => {
        const options = q.options.map((opt) => `- ${opt}`).join('\n');
        return `${i + 1}. ${q.question}\n${options}\n\nAnswer: ${
          q.answer
        }\nExplanation: ${q.explanation}`;
      })
      .join('\n\n');
  };

  if (isProfileLoading) {
    return <Skeleton className="h-[500px] w-full" />;
  }

  if (!isPremiumUser) {
    return (
      <Card className="flex flex-col items-center justify-center text-center">
        <CardHeader>
          <div className="p-3 bg-yellow-400/20 rounded-full mx-auto">
            <Crown className="h-10 w-10 text-yellow-500" />
          </div>
          <CardTitle className="mt-4 text-2xl">
            Unlock the AI Quiz Generator
          </CardTitle>
          <CardDescription>
            This is a premium feature for teachers. Upgrade to save hours on
            creating assessments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-left text-muted-foreground text-sm">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" /> Instantly generate
              curriculum-aligned quizzes.
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" /> Specify any topic,
              subject, and difficulty.
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" /> Get questions, answers,
              and explanations.
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button asChild size="lg" className="w-full">
            <Link href="/subscribe">Upgrade to VIP</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PencilRuler />
          AI Quiz & Assignment Generator
        </CardTitle>
        <CardDescription>
          Instantly create assessments for any subject and topic for the Malawian curriculum.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Select onValueChange={setSubject} value={subject}>
              <SelectTrigger id="subject">
                <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
                {subjectsData.map((s) => (
                  <SelectItem key={s.id} value={s.name}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="topic">Topic</Label>
            <Input
              id="topic"
              placeholder="e.g., Photosynthesis, The World Wars"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="numQuestions">Number of Questions: {numQuestions}</Label>
          <Input 
            id="numQuestions"
            type="range" 
            min="3" 
            max="15" 
            value={numQuestions}
            onChange={(e) => setNumQuestions(Number(e.target.value))}
            className="p-0"
            />
        </div>
        <Button
          onClick={handleGenerateQuiz}
          disabled={isLoading || isProfileLoading || !topic || !subject}
          className="w-full"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          {isLoading ? 'Generating Quiz...' : 'Generate Quiz'}
        </Button>
      </CardContent>

      {(isLoading || quiz) && (
        <>
            <CardHeader className='border-t pt-6'>
                <CardTitle>Generated Quiz</CardTitle>
            </CardHeader>
            <CardContent>
            {isLoading ? (
                <div className="space-y-4">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
            ) : quiz ? (
                <div className="space-y-6">
                {quiz.questions.map((q, index) => (
                    <div key={index} className="space-y-2 pb-4 border-b last:border-none last:pb-0">
                    <p className="font-semibold">{index + 1}. {q.question}</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        {q.options.map(opt => <li key={opt}>{opt}</li>)}
                    </ul>
                    <p className="text-sm pt-2"><strong>Answer:</strong> {q.answer}</p>
                    <p className="text-xs text-muted-foreground"><strong>Explanation:</strong> {q.explanation}</p>
                    </div>
                ))}
                </div>
            ) : null}
            </CardContent>
            <CardFooter>
                 {quiz && (
                    <Button variant="secondary" className="w-full" onClick={() => copyToClipboard(formatQuizForCopy())}>
                        <Clipboard className="mr-2 h-4 w-4" />
                        Copy Quiz to Clipboard
                    </Button>
                 )}
            </CardFooter>
        </>
      )}
    </Card>
  );
}
