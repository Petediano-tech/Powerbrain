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
  { name: 'English', chapters: 12 },
  { name: 'Chichewa', chapters: 10 },
  { name: 'Mathematics', chapters: 15 },
  { name: 'Biology', chapters: 18 },
  { name: 'Chemistry', chapters: 14 },
  { name: 'Physics', chapters: 16 },
  { name: 'Geography', chapters: 11 },
  { name: 'Agriculture', chapters: 9 },
  { name: 'History', chapters: 13 },
  { name: 'Computer Studies', chapters: 8 },
  { name: 'Life Skills', chapters: 7 },
  { name: 'Social Studies', chapters: 10 },
];

export default function SubjectsPage() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {subjects.map((subject) => (
        <Card key={subject.name} className="hover:border-primary hover:shadow-primary/20 transition-all cursor-pointer">
          <CardHeader className="flex flex-col items-center justify-center text-center gap-4">
            <div className="p-4 rounded-full bg-primary/10 text-primary">
              {subjectIcons[subject.name] || <Book className="h-6 w-6" />}
            </div>
            <CardTitle className="text-lg">{subject.name}</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-sm text-muted-foreground -mt-4 pb-4">
            <p>{subject.chapters} Chapters</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
