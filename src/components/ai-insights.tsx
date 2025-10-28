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
import { getStudyInsights, StudyInsightsOutput } from "@/ai/flows/ai-study-insights";
import { Skeleton } from "./ui/skeleton";

// Mock student data to be sent to the AI
const mockStudentAnalysisData = {
  studyStreaks: 5,
  totalTimeStudied: 1240,
  quizzesCompleted: 23,
  topicsMastered: 15,
  performanceInMath: 88,
  performanceInEnglish: 92,
  performanceInScience: 75,
  performanceInHistory: 81,
  performanceInChichewa: 85,
  recentMathScores: [85, 90, 88],
  recentEnglishScores: [92, 95, 90],
  favouriteSubject: "Mathematics",
};

export function AIInsights() {
  const [insights, setInsights] = useState<StudyInsightsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetInsights = async () => {
    setIsLoading(true);
    setInsights(null); // Clear previous insights
    try {
      const result = await getStudyInsights(mockStudentAnalysisData);
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
              <InsightSection icon={<Target className="h-4 w-4"/>} title="Strengths" content={insights.strengths} colorClass="text-green-400"/>
              <InsightSection icon={<ShieldAlert className="h-4 w-4"/>} title="Weaknesses" content={insights.weaknesses} colorClass="text-yellow-400"/>
              <InsightSection icon={<Lightbulb className="h-4 w-4"/>} title="Recommendations" content={insights.recommendations} colorClass="text-sky-blue"/>
            </div>
        ) : (
          <div className="text-center text-muted-foreground py-8 flex flex-col items-center justify-center h-full">
            <Lightbulb className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p>Click the button below to generate insights about your study habits and performance.</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleGetInsights} disabled={isLoading} className="w-full bg-sky-blue hover:bg-sky-blue/90 text-background">
          {isLoading ? "Generating..." : "Generate My Insights"}
        </Button>
      </CardFooter>
    </Card>
  );
}
