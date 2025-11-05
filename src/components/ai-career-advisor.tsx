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
import { Briefcase, Lightbulb, Sparkles, University } from 'lucide-react';
import {
  type AiCareerGuidanceOutput,
} from '@/ai/flows/schemas';
import { Skeleton } from './ui/skeleton';
import { useDoc, useMemoFirebase, useUser } from '@/firebase';
import { doc, getFirestore } from 'firebase/firestore';
import { useUserStore } from '@/hooks/use-user-store';
import { getCareerGuidanceAction } from '@/app/actions/ai-actions';

export function AICareerAdvisor() {
  const [report, setReport] = useState<AiCareerGuidanceOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const firestore = getFirestore();
  const { profileId } = useUserStore();
  const { user } = useUser();

  const userProfileRef = useMemoFirebase(() => {
    if (!profileId) return null;
    return doc(firestore, 'userProfiles', profileId);
  }, [firestore, profileId]);

  const { data: userProfile, isLoading: isProfileLoading } =
    useDoc(userProfileRef);

  const handleGetReport = async () => {
    if (!userProfile) return;

    setIsLoading(true);
    setReport(null);

    const performanceData = {
      strongestSubjects: userProfile.strongestSubjects || ['Mathematics', 'Physics'],
      averageScore: userProfile.averageScore || 75,
      interests: userProfile.interests || ['problem-solving', 'technology'],
    };

    try {
      const result = await getCareerGuidanceAction(performanceData);
      setReport(result);
    } catch (error) {
      console.error('Failed to get AI career report:', error);
      // Handle error state if needed
    } finally {
      setIsLoading(false);
    }
  };

  const renderLoading = () => (
    <div className="space-y-6 pt-2">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-11/12" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );

  const ReportSection = ({
    icon,
    title,
    children,
    colorClass,
  }: {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
    colorClass: string;
  }) => (
    <div>
      <h3 className={`font-semibold flex items-center gap-2 mb-2 ${colorClass}`}>
        {icon}
        {title}
      </h3>
      <div className="text-sm text-muted-foreground prose prose-sm dark:prose-invert max-w-none">
        {children}
      </div>
    </div>
  );

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Briefcase />
          AI Career Advisor
        </CardTitle>
        <CardDescription>
          Discover career paths and university courses in Malawi that match your
          strengths and interests.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 flex-1">
        {isLoading ? (
          renderLoading()
        ) : report ? (
          <div className="space-y-6">
            <ReportSection
              icon={<Sparkles className="h-4 w-4" />}
              title="Career Recommendations"
              colorClass="text-primary"
            >
              <ul>
                {report.careerRecommendations.map((career) => (
                  <li key={career.name}>
                    <strong>{career.name}:</strong> {career.description}
                  </li>
                ))}
              </ul>
            </ReportSection>
            <ReportSection
              icon={<University className="h-4 w-4" />}
              title="Suggested University Courses"
              colorClass="text-green-500"
            >
               <ul>
                {report.universitySuggestions.map((suggestion) => (
                  <li key={suggestion.course}>
                    <strong>{suggestion.course}</strong> at {suggestion.university}: {suggestion.reason}
                  </li>
                ))}
              </ul>
            </ReportSection>
            <ReportSection
              icon={<Lightbulb className="h-4 w-4" />}
              title="Actionable Next Steps"
              colorClass="text-sky-500"
            >
              <p>{report.nextSteps}</p>
            </ReportSection>
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-8 flex flex-col items-center justify-center h-full">
            <Briefcase className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p>
              Click the button below to generate a personalized report on potential careers and university courses.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleGetReport}
          disabled={isLoading || isProfileLoading}
          className="w-full"
        >
          {isLoading ? 'Generating Report...' : 'Generate My Career Report'}
        </Button>
      </CardFooter>
    </Card>
  );
}
