'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import { notesData } from "@/lib/notes-data";
import { notFound } from "next/navigation";

export default function NoteDisplayPage({ params }: { params: { noteId: string } }) {
  const note = notesData.find(n => n.id === params.noteId);

  if (!note) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" asChild>
            <Link href="/notes">
                <ChevronLeft className="mr-2" />
                Back to Notes
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
