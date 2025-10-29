import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { capitalize } from "@/lib/utils";

const lessonData: { [key: string]: { [key: string]: { title: string; content: string[] } } } = {
  mathematics: {
    "algebra-basics": {
      title: "Algebra Basics",
      content: [
        "Algebra is a branch of mathematics that uses letters and other symbols to represent numbers and quantities in formulae and equations. It's like a puzzle where you have to find the missing pieces.",
        "A variable is a symbol (usually a letter) that represents a value that can change. For example, in the expression 'x + 5', 'x' is a variable.",
        "A constant is a value that does not change. In 'x + 5', '5' is a constant.",
        "An expression is a combination of variables, constants, and operations. 'x + 5' is an expression.",
        "An equation is a statement that two expressions are equal, indicated by the '=' sign. For example, 'x + 5 = 10' is an equation. The goal is often to solve for the variable, which in this case would be x = 5.",
      ],
    },
  },
};


export default function LessonPage({ params }: { params: { subjectName: string; chapterId: string } }) {
  const lesson = lessonData[params.subjectName]?.[params.chapterId];

  if (!lesson) {
    return <p>Lesson not found.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" asChild>
            <Link href={`/subjects/${params.subjectName}`}>
                <ChevronLeft className="mr-2" />
                Back to Chapters
            </Link>
        </Button>
        <h1 className="text-2xl font-bold">{capitalize(params.subjectName)}</h1>
        <Button variant="outline" disabled>
            Next Lesson
            <ChevronRight className="ml-2" />
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
             <BookOpen className="h-8 w-8 text-primary" />
             <div>
                <CardTitle className="text-3xl">{lesson.title}</CardTitle>
                <CardDescription>Read through the material below to understand the topic.</CardDescription>
             </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 text-lg leading-relaxed">
          {lesson.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="secondary">Mark as Completed</Button>
        <Button className="bg-sky-blue hover:bg-sky-blue/90 text-background" asChild>
            <Link href={`/quizzes/${params.chapterId}`}>Take The Quiz</Link>
        </Button>
      </div>
    </div>
  );
}
