import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import { notesData } from "@/lib/notes-data";
import { notFound } from "next/navigation";
import { capitalize } from "@/lib/utils";

export default function NoteDisplayPage({ params, searchParams }: { params: { noteId: string }, searchParams: { [key: string]: string | string[] | undefined } }) {
  const note = notesData.find(n => n.id === params.noteId);
  const subject = searchParams?.subject;

  if (!note) {
    notFound();
  }

  const backLink = subject ? `/subjects/${subject}` : '/subjects';
  const backText = subject ? `Back to ${capitalize(subject as string)}` : 'Back to Subjects';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" asChild>
            <Link href={backLink}>
                <ChevronLeft className="mr-2" />
                {backText}
            </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
             <BookOpen className="h-8 w-8 text-primary" />
             <div>
                <CardTitle className="text-3xl">{note.title}</CardTitle>
                <CardDescription>Subject: {note.subject} | By: {note.author}</CardDescription>
             </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 text-lg leading-relaxed whitespace-pre-wrap">
          {note.content}
        </CardContent>
      </Card>
    </div>
  );
}
