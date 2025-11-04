
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookMarked, ChevronLeft, Lock, FileText, BookOpen } from "lucide-react";
import Link from "next/link";
import { capitalize } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { notesData } from "@/lib/notes-data";
import { Separator } from "@/components/ui/separator";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { subjectsData } from "@/lib/subjects-data";

export default function SubjectChaptersPage({ params: { subjectName: subjectId } }: { params: { subjectName: string } }) {
  const firestore = useFirestore();

  const chaptersQuery = useMemoFirebase(
    () => collection(firestore, 'subjects', subjectId, 'chapters'),
    [firestore, subjectId]
  );
  const { data: chapters, isLoading } = useCollection(chaptersQuery);

  const subject = subjectsData.find(s => s.id === subjectId);
  const subjectName = subject ? subject.name : subjectId.replace('-', ' ');

  const subjectNotes = notesData.filter(note => note.subject.toLowerCase() === subjectName.toLowerCase());
  
  // Dummy progress data for UI. In a real app this would be user-specific.
  const progressData: {[key: string]: number} = {
      'algebra-basics': 100,
      'geometry-intro': 45,
      'grammar-tenses': 80,
      'comprehension-skills': 20,
      'cell-biology': 50,
      'genetics-101': 10
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" asChild>
            <Link href="/subjects">
                <ChevronLeft className="mr-2" />
                Back to Subjects
            </Link>
        </Button>
        <h1 className="text-3xl font-bold hidden md:block">{capitalize(subjectName)}</h1>
      </div>

      {isLoading ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full mt-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-2 w-full" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : chapters && chapters.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chapters.map((chapter) => {
            const progress = progressData[chapter.id] || 0;
            return (
              <Card key={chapter.id} className={`flex flex-col transition-colors ${chapter.isLocked ? 'bg-muted/50' : 'hover:border-primary'}`}>
                 <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {chapter.title}
                    {chapter.isLocked && <Lock className="h-5 w-5 text-muted-foreground" />}
                  </CardTitle>
                  <CardDescription>{chapter.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  {!chapter.isLocked && (
                    <div>
                      <Progress value={progress} className="h-2"/>
                      <p className="text-xs text-muted-foreground mt-1">{progress}% completed</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild disabled={chapter.isLocked}>
                    <Link href={`/subjects/${subjectId}/${chapter.id}`}>
                      <BookMarked className="mr-2 h-4 w-4" />
                      {progress > 0 ? 'Continue Lesson' : 'Start Lesson'}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card className="text-center p-10 flex flex-col items-center justify-center">
            <div className="p-4 bg-primary/10 rounded-full mb-4">
                <BookMarked className="h-10 w-10 text-primary" />
            </div>
          <CardTitle>Chapters Coming Soon!</CardTitle>
          <CardDescription>The chapters for {capitalize(subjectName)} are being prepared. Please check back later.</CardDescription>
        </Card>
      )}

      {subjectNotes.length > 0 && (
        <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3">
                <FileText className="text-primary" />
                <h2 className="text-2xl font-bold">Notes for {capitalize(subjectName)}</h2>
            </div>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjectNotes.map((note) => (
                    <Card key={note.id} className="flex flex-col">
                        <CardHeader>
                            <CardTitle>{note.title}</CardTitle>
                            <CardDescription>By {note.author}</CardDescription>
                        </CardHeader>
                        <CardFooter>
                             <Button className="w-full" asChild>
                                <Link href={`/notes/view?pdf=${encodeURIComponent(note.pdfUrl)}&subject=${subjectId}`}>
                                    <BookOpen className="mr-2 h-4 w-4" />
                                    Read Note
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
      )}
    </div>
  );
}

    