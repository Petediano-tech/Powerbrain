
'use client';
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BarChart2, Bot, Send, Sparkles, AlertTriangle, Construction } from "lucide-react";
import { aiGradeQuizzes, AiGradeQuizzesOutput } from "@/ai/flows/ai-grade-quizzes";
import { Skeleton } from "@/components/ui/skeleton";

export default function TeacherPage() {
  // Grading state
  const [studentAnswer, setStudentAnswer] = useState('');
  const [gradingRubric, setGradingRubric] = useState('');
  const [isGrading, setIsGrading] = useState(false);
  const [gradingResult, setGradingResult] = useState<AiGradeQuizzesOutput | null>(null);
  const [gradingError, setGradingError] = useState<string | null>(null);

  const handleGradeWithAI = async () => {
    if (!studentAnswer || !gradingRubric) {
      setGradingError("Please provide both the student's answer and the grading rubric.");
      return;
    }
    setGradingError(null);
    setIsGrading(true);
    setGradingResult(null);

    try {
      const result = await aiGradeQuizzes({
        quizContent: "Short-answer question based on provided rubric.",
        studentAnswers: studentAnswer,
        teacherInstructions: gradingRubric,
      });
      setGradingResult(result);
    } catch (e) {
      console.error(e);
      setGradingError("The AI assistant failed to provide a grade. Please try again.");
    } finally {
      setIsGrading(false);
    }
  };


  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Teacher's Corner</h2>
        <p className="text-muted-foreground">Manage your digital classroom, upload resources, and track student progress.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Construction /> Upload Notes</CardTitle>
            <CardDescription>This feature is currently under construction.</CardDescription>
          </CardHeader>
          <CardContent className="text-center py-10 flex flex-col items-center justify-center">
            <Construction className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">The PDF upload feature is being improved. Please check back later.</p>
          </CardContent>
          <CardFooter>
             <Button disabled className="w-full">Upload Note</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BarChart2 /> View Student Performance</CardTitle>
            <CardDescription>Access analytics and performance charts.</CardDescription>
          </CardHeader>
          <CardContent className="text-center py-10 flex flex-col items-center justify-center">
            <BarChart2 className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">Performance dashboards are coming soon.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled>Go to Analytics</Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bot /> AI Grading Assistant</CardTitle>
          <CardDescription>Auto-mark quizzes and get feedback suggestions for short-answer questions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea placeholder="Paste student's short-answer response here..." rows={5} value={studentAnswer} onChange={e => setStudentAnswer(e.target.value)} />
          <Textarea placeholder="Provide the correct answer or grading rubric..." rows={3} value={gradingRubric} onChange={e => setGradingRubric(e.target.value)}/>
           {gradingError && (
            <div className="flex items-center gap-2 text-sm text-destructive">
              <AlertTriangle className="h-4 w-4" />
              <p>{gradingError}</p>
            </div>
           )}
        </CardContent>
        <CardFooter className="flex-col items-start gap-4">
          <Button className="bg-sky-blue hover:bg-sky-blue/90 text-background" onClick={handleGradeWithAI} disabled={isGrading}>
            {isGrading ? (
              <>
                <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                Grading...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Grade with AI
              </>
            )}
          </Button>
          {isGrading && <Skeleton className="h-24 w-full" />}
          {gradingResult && (
            <div className="space-y-4 p-4 border rounded-lg bg-muted/50 w-full">
              <div>
                <h4 className="font-semibold">Suggested Grade: <span className="text-primary font-bold text-lg">{gradingResult.grade}</span></h4>
              </div>
              <div>
                 <h4 className="font-semibold">Feedback:</h4>
                 <p className="text-sm text-muted-foreground">{gradingResult.feedback}</p>
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
