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
import { Calendar, Lightbulb } from 'lucide-react';
import {
  type AiStudyPlannerOutput,
} from '@/ai/flows/schemas';
import { Skeleton } from './ui/skeleton';
import { useDoc, useMemoFirebase } from '@/firebase';
import { doc, getFirestore } from 'firebase/firestore';
import { useUserStore } from '@/hooks/use-user-store';
import { getStudyPlanAction } from '@/app/actions/ai-actions';

export function AIStudyPlanner() {
  const [plan, setPlan] = useState<AiStudyPlannerOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const firestore = getFirestore();
  const { profileId } = useUserStore();

  const userProfileRef = useMemoFirebase(() => {
    if (!profileId) return null;
    return doc(firestore, 'userProfiles', profileId);
  }, [firestore, profileId]);

  const { data: userProfile, isLoading: isProfileLoading } =
    useDoc(userProfileRef);

  const handleGeneratePlan = async () => {
    if (!userProfile) return;

    setIsLoading(true);
    setPlan(null);

    const plannerInput = {
      weakestSubjects: userProfile.weakestSubjects || ['History', 'Geography'], // Mock data if not present
      upcomingExams: userProfile.upcomingExams || [{subject: 'Final Exams', date: 'in 3 weeks'}],
    };

    try {
      const result = await getStudyPlanAction(plannerInput);
      setPlan(result);
    } catch (error) {
      console.error('Failed to get AI study plan:', error);
      // Handle error state if needed
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderLoading = () => (
    <div className="space-y-4 pt-2">
       <Skeleton className="h-6 w-1/4" />
       <Skeleton className="h-4 w-full" />
       <Skeleton className="h-4 w-11/12" />
       <Skeleton className="h-6 w-1/3 mt-4" />
       <Skeleton className="h-4 w-full" />
       <Skeleton className="h-4 w-5/6" />
    </div>
  );

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar />
          AI Study Planner
        </CardTitle>
        <CardDescription>
          Your personalized, AI-generated weekly schedule to help you ace your exams.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 flex-1">
        {isLoading ? (
          renderLoading()
        ) : plan ? (
            <div className="space-y-4">
                {plan.weeklySchedule.map(day => (
                    <div key={day.day}>
                        <h3 className="font-bold text-lg mb-2">{day.day}</h3>
                        <div className="border-l-2 border-primary pl-4 space-y-2">
                           <p className="text-sm text-muted-foreground">{day.plan}</p>
                           {day.tip && <p className="text-xs italic text-primary/80 flex gap-2"><Lightbulb size={14}/> {day.tip}</p>}
                        </div>
                    </div>
                ))}
            </div>
        ) : (
          <div className="text-center text-muted-foreground py-8 flex flex-col items-center justify-center h-full">
            <Calendar className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p>
              Ready to get organized? Let our AI create a personalized study plan for you based on your weakest subjects and upcoming exams.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleGeneratePlan}
          disabled={isLoading || isProfileLoading}
          className="w-full"
        >
          {isLoading ? 'Generating Your Plan...' : 'Generate My Study Plan'}
        </Button>
      </CardFooter>
    </Card>
  );
}
