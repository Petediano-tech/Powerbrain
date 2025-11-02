
'use client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
  Book,
  FlaskConical,
  Languages,
  Leaf,
  Globe,
  Sigma,
  Dna,
  Landmark,
  Laptop,
  HeartHandshake,
  Users,
  Palette,
  Music,
  Dumbbell
} from "lucide-react";
import { ReactElement } from "react";
import Link from "next/link";
import { subjectsData } from "@/lib/subjects-data";

const subjectIcons: { [key: string]: ReactElement } = {
  English: <Languages className="h-6 w-6" />,
  Chichewa: <Languages className="h-6 w-6" />,
  Mathematics: <Sigma className="h-6 w-6" />,
  Biology: <Dna className="h-6 w-6" />,
  Chemistry: <FlaskConical className="h-6 w-6" />,
  Physics: <Sigma className="h-6 w-6" />,
  Geography: <Globe className="h-6 w-6" />,
  Agriculture: <Leaf className="h-6 w-6" />,
  History: <Landmark className="h-6 w-6" />,
  "Computer Studies": <Laptop className="h-6 w-6" />,
  "Life Skills": <HeartHandshake className="h-6 w-6" />,
  "Social Studies": <Users className="h-6 w-6" />,
  "Creative Arts": <Palette className="h-6 w-6" />,
  "Performing Arts": <Music className="h-6 w-6" />,
  "Physical Education": <Dumbbell className="h-6 w-6" />,
  "Religious Education": <Book className="h-6 w-6" />,
};

export default function SubjectsPage() {

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {subjectsData.map((subject) => (
        <Link key={subject.id} href={`/subjects/${subject.id}`} passHref>
          <Card className="h-full hover:border-primary hover:shadow-primary/20 transition-all cursor-pointer flex flex-col">
            <CardHeader className="flex flex-col items-center justify-center text-center gap-4">
              <div className="p-4 rounded-full bg-primary/10 text-primary">
                {subjectIcons[subject.name] || <Book className="h-6 w-6" />}
              </div>
              <CardTitle className="text-lg">{subject.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground -mt-4 pb-4 flex-1">
              <p>{subject.chapters} Chapters</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
