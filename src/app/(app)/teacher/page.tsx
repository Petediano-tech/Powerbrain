
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart2 } from "lucide-react";

export default function TeacherPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Teacher's Corner</h2>
        <p className="text-muted-foreground">Manage your digital classroom and track student progress.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BarChart2 /> View Student Performance</CardTitle>
            <CardDescription>Access analytics and performance charts.</CardDescription>
          </CardHeader>
          <CardContent className="text-center py-10 flex flex-col items-center justify-center">
            <BarChart2 className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">Performance dashboards are coming soon.</p>
            <p className="text-xs text-muted-foreground">This feature is under active development.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled>Go to Analytics</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">AI Grading Assistant</CardTitle>
            <CardDescription>Auto-mark quizzes and get feedback suggestions.</CardDescription>
          </CardHeader>
          <CardContent className="text-center py-10 flex flex-col items-center justify-center">
             <BarChart2 className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">The AI Grading Assistant is coming soon.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" disabled>Start Grading</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
