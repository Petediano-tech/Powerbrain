'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { capitalize } from "@/lib/utils";
import { chaptersData } from "../page";

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
    "geometry-intro": {
      title: "Introduction to Geometry",
      content: [
        "Geometry is the branch of mathematics concerned with properties of space such as the distance, shape, size, and relative position of figures.",
        "A point is a location in space. It has no size, only position.",
        "A line is a straight one-dimensional figure that has no thickness and extends endlessly in both directions.",
        "A plane is a flat, two-dimensional surface that extends infinitely far.",
      ]
    },
    "fractions-and-decimals": {
        title: "Fractions and Decimals",
        content: [
            "Fractions and decimals represent parts of a whole number.",
            "A fraction is written as a/b, where 'a' is the numerator and 'b' is the denominator.",
            "A decimal is a number that uses a decimal point to separate the whole part from the fractional part."
        ]
    }
  },
};


export default function LessonPage({ params }: { params: { subjectName: string; chapterId: string } }) {
  const lesson = lessonData[params.subjectName]?.[params.chapterId];
  const chapters = chaptersData[params.subjectName.toLowerCase()] || [];
  const currentChapterIndex = chapters.findIndex(c => c.id === params.chapterId);
  
  const prevChapter = currentChapterIndex > 0 ? chapters[currentChapterIndex - 1] : null;
  const nextChapter = currentChapterIndex < chapters.length - 1 ? chapters[currentChapterIndex + 1] : null;

  if (!lesson) {
    return (
        <Card className="m-auto max-w-lg text-center p-8">
            <CardTitle>Lesson Not Found</CardTitle>
            <CardDescription>This lesson does not exist or is under construction.</CardDescription>
            <Button asChild className="mt-4">
                <Link href={`/subjects/${params.subjectName}`}><ChevronLeft className="mr-2"/> Back to Chapters</Link>
            </Button>
        </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" asChild>
            <Link href={`/subjects/${params.subjectName}`}>
                <ChevronLeft className="mr-2" />
                Back to {capitalize(params.subjectName)}
            </Link>
        </Button>
         <div className="hidden md:flex items-center gap-2">
            <Button variant="outline" asChild disabled={!prevChapter}>
                <Link href={prevChapter ? `/subjects/${params.subjectName}/${prevChapter.id}` : '#'}>
                    <ChevronLeft className="mr-2" />
                    Previous
                </Link>
            </Button>
            <Button variant="outline" asChild disabled={!nextChapter || nextChapter.isLocked}>
                <Link href={nextChapter ? `/subjects/${params.subjectName}/${nextChapter.id}` : '#'}>
                    Next
                    <ChevronRight className="ml-2" />
                </Link>
            </Button>
        </div>
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

      <div className="flex justify-between items-center gap-4">
        <div className="flex md:hidden items-center gap-2 w-full">
             <Button variant="outline" asChild disabled={!prevChapter} className="w-full">
                <Link href={prevChapter ? `/subjects/${params.subjectName}/${prevChapter.id}` : '#'}>
                    <ChevronLeft className="mr-2" />
                    Previous
                </Link>
            </Button>
            <Button variant="outline" asChild disabled={!nextChapter || nextChapter.isLocked} className="w-full">
                <Link href={nextChapter ? `/subjects/${params.subjectName}/${nextChapter.id}` : '#'}>
                    Next
                    <ChevronRight className="ml-2" />
                </Link>
            </Button>
        </div>
        <div className="flex justify-end gap-4 w-full">
            <Button variant="secondary">Mark as Completed</Button>
            <Button className="bg-sky-blue hover:bg-sky-blue/90 text-background" asChild>
                <Link href={`/quizzes/${params.chapterId}`}>Take The Quiz</Link>
            </Button>
        </div>
      </div>
    </div>
  );
}
