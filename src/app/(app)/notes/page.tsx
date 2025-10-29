'use client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, BookOpen, Sigma, Dna, Languages, Leaf, Globe, Landmark, Laptop, HeartHandshake, Users, FlaskConical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";
import { useCollection, useMemoFirebase } from "@/firebase";
import { collection, getFirestore, orderBy, query } from "firebase/firestore";

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
  const firestore = getFirestore();
  const notesQuery = useMemoFirebase(() => {
    return query(collection(firestore, 'notes'), orderBy('createdAt', 'desc'));
  }, [firestore]);

  const { data: notes, isLoading } = useCollection(notesQuery);

  if (isLoading) {
      return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                  <Card key={i} className="flex flex-col overflow-hidden">
                      <div className="relative h-40 w-full bg-muted animate-pulse"></div>
                      <CardHeader>
                          <div className="h-6 w-3/4 bg-muted animate-pulse rounded"></div>
                          <div className="h-4 w-1/2 bg-muted animate-pulse rounded mt-2"></div>
                      </CardHeader>
                      <CardContent className="flex-1">
                          <div className="h-6 w-1/4 bg-muted animate-pulse rounded"></div>
                      </CardContent>
                      <CardFooter className="bg-muted/50 p-4 flex gap-2">
                         <div className="h-10 w-full bg-muted animate-pulse rounded"></div>
                         <div className="h-10 w-full bg-muted animate-pulse rounded"></div>
                      </CardFooter>
                  </Card>
              ))}
          </div>
      );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes?.map((note) => (
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
       {notes?.length === 0 && !isLoading && (
         <p className="text-muted-foreground col-span-full text-center">No notes are available at the moment. Teachers can upload notes in the Teacher's Corner.</p>
       )}
    </div>
  );
}
