import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, BookOpen, Sigma, Dna } from "lucide-react";
import Image from "next/image";

const notes = [
  {
    title: "Mathematics Form 3 Textbook",
    type: "Official Textbook",
    subject: "Mathematics",
    icon: <Sigma />,
    author: "Ministry of Education",
    imageUrl: "https://picsum.photos/seed/math-book/400/200",
    imageHint: "textbook cover"
  },
  {
    title: "Biology Photosynthesis Summary",
    type: "Student Created",
    subject: "Biology",
    icon: <Dna />,
    author: "Jane Doe, Form 4",
    imageUrl: "https://picsum.photos/seed/bio-notes/400/200",
    imageHint: "science diagram"
  },
  {
    title: "Algebra Practice Questions",
    type: "Teacher Notes",
    subject: "Mathematics",
    icon: <Sigma />,
    author: "Mr. Banda",
    imageUrl: "https://picsum.photos/seed/algebra-q/400/200",
    imageHint: "math equations"
  }
];

export default function NotesPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => (
        <Card key={note.title} className="flex flex-col overflow-hidden">
          <div className="relative h-40 w-full">
            <Image 
              src={note.imageUrl}
              alt={note.title}
              fill
              style={{ objectFit: 'cover' }}
              data-ai-hint={note.imageHint}
            />
          </div>
          <CardHeader>
            <Badge className="w-fit mb-2" variant={note.type === "Official Textbook" ? "default" : "secondary"}>
              {note.type}
            </Badge>
            <CardTitle>{note.title}</CardTitle>
            <CardDescription>By {note.author}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
             <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {note.icon} {note.subject}
             </div>
          </CardContent>
          <CardFooter className="bg-muted/50 p-4 flex gap-2">
            <Button className="w-full">
              <BookOpen className="mr-2 h-4 w-4" />
              Read
            </Button>
            <Button variant="outline" className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
