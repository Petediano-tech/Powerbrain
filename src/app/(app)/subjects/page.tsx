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
  Users
} from "lucide-react";
import { ReactElement } from "react";
import Link from "next/link";

const subjectIcons: { [key: string]: ReactElement } = {
  English: <Languages className="h-6 w-6" />,
  Chichewa: <Languages className="h-6 w-6" />,
  Mathematics: <Sigma className="h-6 w-6" />,
  Biology: <Dna className="h-6 w-6" />,
  Chemistry: <FlaskConical className="h-6 w-6" />,
  Physics: <Sigma className="h-6 w-6" />, // Note: Re-using Sigma icon
  Geography: <Globe className="h-6 w-6" />,
  Agriculture: <Leaf className="h-6 w-6" />,
  History: <Landmark className="h-6 w-6" />,
  "Computer Studies": <Laptop className="h-6 w-6" />,
  "Life Skills": <HeartHandshake className="h-6 w-6" />,
  "Social Studies": <Users className="h-6 w-6" />,
};

const subjects = [
  { name: 'English', id: 'english', chapters: 2 },
  { name: 'Chichewa', id: 'chichewa', chapters: 0 },
  { name: 'Mathematics', id: 'mathematics', chapters: 4 },
  { name: 'Biology', id: 'biology', chapters: 0 },
  { name: 'Chemistry', id: 'chemistry', chapters: 0 },
  { name: 'Physics', id: 'physics', chapters: 0 },
  { name: 'Geography', id: 'geography', chapters: 0 },
  { name: 'Agriculture', id: 'agriculture', chapters: 0 },
  { name: 'History', id: 'history', chapters: 0 },
  { name: 'Computer Studies', id: 'computer-studies', chapters: 0 },
  { name: 'Life Skills', id: 'life-skills', chapters: 0 },
  { name: 'Social Studies', id: 'social-studies', chapters: 0 },
];

export default function SubjectsPage() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {subjects.map((subject) => (
        <Link key={subject.name} href={`/subjects/${subject.id}`} passHref>
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
