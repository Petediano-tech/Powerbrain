
'use client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, BookOpen, Sigma, Dna, Languages, Leaf, Globe, Landmark, Laptop, HeartHandshake, Users, FlaskConical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";
import { notesData, Note } from '@/lib/notes-data';

const subjectIcons: { [key: string]: ReactElement } = {
  English: <Languages />,
  Chichewa: <Languages />,
  Mathematics: <Sigma />,
  Biology: <Dna />,
  Chemistry: <FlaskConical />,
  Physics: <Sigma />, 
  Geography: <Globe />,
  Agriculture: <Leaf />,
  History: <Landmark />,
  "Computer Studies": <Laptop />,
  "Life Skills": <HeartHandshake />,
  "Social Studies": <Users />,
};

const getSubjectIcon = (subject: string) => {
    return subjectIcons[subject] || <BookOpen />;
}


export default function NotesPage() {
  const notes: Note[] = notesData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => (
        <Card key={note.id} className="flex flex-col overflow-hidden">
          <div className="relative h-40 w-full bg-muted">
            <Image 
              src={note.imageUrl}
              alt={note.title}
              fill
              style={{ objectFit: 'cover' }}
              data-ai-hint={note.imageHint || 'textbook cover'}
            />
          </div>
          <CardHeader>
            <CardTitle>{note.title}</CardTitle>
            <CardDescription>By {note.author}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
             <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {getSubjectIcon(note.subject)} {note.subject}
             </div>
          </CardContent>
          <CardFooter className="bg-muted/50 p-4 flex gap-2">
            <Button className="w-full" asChild>
                <Link href={note.pdfUrl} target="_blank">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Read
                </Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <a href={note.pdfUrl} download={`${note.title.replace(/\s/g, '_')}.pdf`}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </a>
            </Button>
          </CardFooter>
        </Card>
      ))}
       {notes?.length === 0 && (
         <p className="text-muted-foreground col-span-full text-center">No notes are available at the moment. Please check back later.</p>
       )}
    </div>
  );
}
