
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
  Users
} from "lucide-react";
import { ReactElement } from "react";
import Link from "next/link";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, getDocs } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

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
};

export default function SubjectsPage() {
  const firestore = useFirestore();
  const subjectsQuery = useMemoFirebase(() => query(collection(firestore, 'subjects')), [firestore]);
  const { data: subjects, isLoading } = useCollection(subjectsQuery);
  const [chapterCounts, setChapterCounts] = useState<{[key: string]: number}>({});

  useEffect(() => {
    if (subjects) {
      subjects.forEach(async (subject) => {
        const chaptersRef = collection(firestore, 'subjects', subject.id, 'chapters');
        const snapshot = await getDocs(chaptersRef);
        setChapterCounts(prev => ({...prev, [subject.id]: snapshot.size }));
      });
    }
  }, [subjects, firestore]);

  if (isLoading) {
      return (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {[...Array(10)].map((_, i) => (
                  <Card key={i}>
                      <CardHeader className="flex flex-col items-center justify-center text-center gap-4">
                          <Skeleton className="h-10 w-10 rounded-full" />
                          <Skeleton className="h-6 w-2/3" />
                      </CardHeader>
                      <CardContent className="text-center -mt-4 pb-4">
                          <Skeleton className="h-4 w-1/2 mx-auto" />
                      </CardContent>
                  </Card>
              ))}
          </div>
      )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {(subjects || []).map((subject) => (
        <Link key={subject.id} href={`/subjects/${subject.id}`} passHref>
          <Card className="h-full hover:border-primary hover:shadow-primary/20 transition-all cursor-pointer flex flex-col">
            <CardHeader className="flex flex-col items-center justify-center text-center gap-4">
              <div className="p-4 rounded-full bg-primary/10 text-primary">
                {subjectIcons[subject.name] || <Book className="h-6 w-6" />}
              </div>
              <CardTitle className="text-lg">{subject.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground -mt-4 pb-4 flex-1">
              <p>{chapterCounts[subject.id] || 0} Chapters</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
