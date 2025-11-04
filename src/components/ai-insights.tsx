'use client';
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BrainCircuit, Lightbulb, ShieldAlert, Sparkles, Target } from "lucide-react";
import { type StudyInsightsOutput } from "@/ai/flows/ai-study-insights";
import { Skeleton } from "./ui/skeleton";
import { useDoc, useMemoFirebase } from "@/firebase";
import { doc, getFirestore } from "firebase/firestore";
import { useUserStore } from "@/hooks/use-user-store";
import { getStudyInsights } from "@/ai/flows/ai-study-insights";

export function AIInsights() {
  const [insights, setInsights] = useState<StudyInsightsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const firestore = getFirestore();
  const { profileId } = useUserStore();

  const userProfileRef = useMemoFirebase(() => {
    if (!profileId) return null;
    return doc(firestore, 'userProfiles', profileId);
  }, [firestore, profileId]);

  const { data: userProfile } = useDoc(userProfileRef);

  const handleGetInsights = async () => {
    if (!userProfile) return;

    setIsLoading(true);
    setInsights(null); 
    
    const insightData = {
        studyStreaks: userProfile.studyStreaks || 0,
        totalTimeStudied: userProfile.totalTimeStudied || 0,
        quizzesCompleted: userProfile.quizzesCompleted || 0,
        topicsMastered: userProfile.topicsMastered || 0,
        performanceInMath: userProfile.performanceInMath || 70, // Default if not present
        performanceInEnglish: userProfile.performanceInEnglish || 70,
        performanceInScience: userProfile.performanceInScience || 70,
        performanceInHistory: userProfile.performanceInHistory || 70,
        performanceInChichewa: userProfile.performanceInChichewa || 70,
        recentMathScores: userProfile.recentMathScores || [],
        recentEnglishScores: userProfile.recentEnglishScores || [],
        favouriteSubject: userProfile.favouriteSubject || "Not specified",
    };

    try {
      const result = await getStudyInsights(insightData);
      setInsights(result);
    } catch (error) {
      console.error("Failed to get AI insights:", error);
      setInsights({
        overallPerformance: "Could not generate insights.",
        strengths: "There was an error.",
        weaknesses: "Please try again later.",
        recommendations: "If the problem persists, contact support."
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const renderLoading = () => (
    <div className="space-y-3 pt-2">
      <Skeleton className="h-4 w-11/12" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );

  const InsightSection = ({ icon, title, content, colorClass }: { icon: React.ReactNode, title: string, content: string, colorClass: string }) => (
    <div>
      <h3 className={`font-semibold flex items-center gap-2 mb-2 ${colorClass}`}>
        {icon}
        {title}
      </h3>
      <p className="text-sm text-muted-foreground">{content}</p>
    </div>
  )

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BrainCircuit />
          AI-Generated Insights
        </CardTitle>
        <CardDescription>
          Get personalized feedback on your learning journey.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 flex-1">
        {isLoading ? (
          renderLoading()
        ) : insights ? (
            <div className="space-y-4">
              <InsightSection icon={<Sparkles className="h-4 w-4"/>} title="Overall Performance" content={insights.overallPerformance} colorClass="text-primary"/>
              <InsightSection icon={<Target className="h-4 w-4"/>} title="Strengths" content={insights.strengths} colorClass="text-green-500"/>
              <InsightSection icon={<ShieldAlert className="h-4 w-4"/>} title="Weaknesses" content={insights.weaknesses} colorClass="text-yellow-500"/>
              <InsightSection icon={<Lightbulb className="h-4 w-4"/>} title="Recommendations" content={insights.recommendations} colorClass="text-sky-500"/>
            </div>
        ) : (
          <div className="text-center text-muted-foreground py-8 flex flex-col items-center justify-center h-full">
            <Lightbulb className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p>Click the button below to generate insights about your study habits and performance.</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleGetInsights} disabled={isLoading || !userProfile} className="w-full bg-[hsl(var(--sky-blue))] hover:bg-[hsl(var(--sky-blue))]/90 text-white">
          {isLoading ? "Generating..." : "Generate My Insights"}
        </Button>
      </CardFooter>
    </Card>
  );
}
