
'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Book, Dna, Globe, Sigma } from "lucide-react";
import Link from "next/link";
import { ReactElement } from "react";

const subjectIcons: { [key: string]: ReactElement } = {
  Mathematics: <Sigma className="h-6 w-6 text-white" />,
  Biology: <Dna className="h-6 w-6 text-white" />,
  Geography: <Globe className="h-6 w-6 text-white" />,
};

const courseData = [
    { name: 'Mathematics', progress: 80, iconColor: 'bg-red-500' },
    { name: 'Biology', progress: 55, iconColor: 'bg-green-500' },
    { name: 'Geography', progress: 70, iconColor: 'bg-yellow-500' },
]

export function MyCourses() {
  return (
    <div>
        <h2 className="text-xl font-bold mb-4">My Courses</h2>
        <div className="space-y-4">
            {courseData.map((course) => (
                <Card key={course.name}>
                     <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-lg ${course.iconColor}`}>
                                {subjectIcons[course.name] || <Book className="h-6 w-6 text-white" />}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="font-semibold">{course.name}</h3>
                                    <span className="text-sm text-muted-foreground">{course.progress}% complete</span>
                                </div>
                                <Progress value={course.progress} className="h-2" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
  );
}
