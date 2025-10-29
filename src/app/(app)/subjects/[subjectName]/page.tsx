import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookMarked, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { capitalize } from "@/lib/utils";

const chaptersData: { [key: string]: { id: string; title: string; description: string }[] } = {
  mathematics: [
    { id: "algebra-basics", title: "Chapter 1: Algebra Basics", description: "Introduction to variables, equations, and expressions." },
    { id: "geometry-intro", title: "Chapter 2: Introduction to Geometry", description: "Learn about shapes, lines, and angles." },
    { id: "fractions-and-decimals", title: "Chapter 3: Fractions and Decimals", description: "Master the art of working with parts of whole numbers." },
    { id: "statistics-basics", title: "Chapter 4: Basic Statistics", description: "Understand data with mean, median, and mode." },
  ],
  english: [
    { id: "grammar-tenses", title: "Chapter 1: Tenses and Grammar", description: "Master past, present, and future tenses." },
    { id: "comprehension-skills", title: "Chapter 2: Comprehension Skills", description: "Improve your reading and understanding." },
  ],
  // Add other subjects here
};


export default function SubjectChaptersPage({ params }: { params: { subjectName: string } }) {
  const chapters = chaptersData[params.subjectName.toLowerCase()] || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
            <Link href="/subjects">
                <ChevronLeft />
            </Link>
        </Button>
        <h1 className="text-3xl font-bold">Chapters in {capitalize(params.subjectName)}</h1>
      </div>

      {chapters.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chapters.map((chapter) => (
            <Card key={chapter.id} className="flex flex-col hover:border-sky-blue transition-colors">
               <CardHeader>
                <CardTitle>{chapter.title}</CardTitle>
                <CardDescription>{chapter.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1"></CardContent>
              <CardContent>
                <Button className="w-full bg-sky-blue hover:bg-sky-blue/90 text-background" asChild>
                  <Link href={`/subjects/${params.subjectName}/${chapter.id}`}>
                    <BookMarked className="mr-2 h-4 w-4" />
                    Start Reading
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="text-center p-10">
          <CardTitle>Coming Soon!</CardTitle>
          <CardDescription>The chapters for {capitalize(params.subjectName)} are being prepared. Please check back later.</CardDescription>
        </Card>
      )}
    </div>
  );
}
