import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, BarChart2, Bot, Send } from "lucide-react";

export default function TeacherPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Teacher's Corner</h2>
        <p className="text-muted-foreground">Manage your digital classroom, upload resources, and track student progress.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Upload /> Upload Lessons &amp; Quizzes</CardTitle>
            <CardDescription>Share your materials with your students.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input type="text" placeholder="Lesson or Quiz Title" />
            <Textarea placeholder="Description..." />
            <Input type="file" />
          </CardContent>
          <CardFooter>
            <Button>Upload Resource</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BarChart2 /> View Student Performance</CardTitle>
            <CardDescription>Access analytics and performance charts.</CardDescription>
          </CardHeader>
          <CardContent className="text-center py-10">
            <p className="text-muted-foreground">Performance dashboards are coming soon.</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Go to Analytics</Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Bot /> AI Grading Assistant</CardTitle>
          <CardDescription>Auto-mark quizzes and get feedback suggestions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea placeholder="Paste student's short-answer response here..." rows={5} />
          <Textarea placeholder="Provide the correct answer or grading rubric..." rows={3} />
        </CardContent>
        <CardFooter>
          <Button className="bg-sky-blue hover:bg-sky-blue/90 text-background">
            <Send className="mr-2 h-4 w-4" />
            Grade with AI
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
