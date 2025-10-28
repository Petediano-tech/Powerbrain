import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sigma, Dna, Languages, Timer } from "lucide-react"

const quizzes = [
  {
    title: "Algebra Fundamentals",
    subject: "Mathematics",
    icon: <Sigma className="h-6 w-6 text-primary" />,
    difficulty: "Easy",
    questions: 15,
    timeLimit: 20,
  },
  {
    title: "Cellular Biology",
    subject: "Biology",
    icon: <Dna className="h-6 w-6 text-green-400" />,
    difficulty: "Moderate",
    questions: 25,
    timeLimit: 30,
  },
  {
    title: "Tenses and Grammar",
    subject: "English",
    icon: <Languages className="h-6 w-6 text-sky-blue" />,
    difficulty: "Easy",
    questions: 20,
    timeLimit: 15,
  },
  {
    title: "Advanced Calculus",
    subject: "Mathematics",
    icon: <Sigma className="h-6 w-6 text-primary" />,
    difficulty: "Advanced",
    questions: 20,
    timeLimit: 45,
  },
];

export default function QuizzesPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quizzes.map((quiz) => (
        <Card key={quiz.title} className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-muted rounded-lg">{quiz.icon}</div>
              <div>
                <CardTitle>{quiz.title}</CardTitle>
                <CardDescription>{quiz.subject}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="flex justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span>{quiz.questions} Questions</span>
              </div>
              <div className="flex items-center gap-1">
                <Timer className="h-4 w-4" />
                <span>{quiz.timeLimit} min</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <Badge variant={
                quiz.difficulty === "Easy" ? "secondary" : quiz.difficulty === "Moderate" ? "outline" : "default"
              }
              className={
                quiz.difficulty === 'Advanced' ? 'bg-accent text-accent-foreground' : ''
              }
            >{quiz.difficulty}</Badge>
            <Button className="bg-sky-blue hover:bg-sky-blue/90 text-background">Start Quiz</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
