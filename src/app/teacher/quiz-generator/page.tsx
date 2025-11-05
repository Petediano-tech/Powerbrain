
'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { subjectsData } from '@/lib/subjects-data';
import { quizzesData, Question } from '@/lib/quizzes-data';
import { useToast } from '@/hooks/use-toast';
import { FileQuestion, CheckCircle, RefreshCw, Save } from 'lucide-react';

const formSchema = z.object({
  subject: z.string().min(1, 'Please select a subject.'),
  topic: z.string().optional(),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
  numQuestions: z.coerce.number().int().min(1, 'At least one question is required.').max(50, 'Maximum of 50 questions allowed.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function QuizGeneratorPage() {
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  const [isGenerated, setIsGenerated] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: '',
      topic: '',
      difficulty: 'Easy',
      numQuestions: 10,
    },
  });

  function onSubmit(values: FormValues) {
    setIsGenerated(false);
    setGeneratedQuestions([]);
    
    // Filter questions from the mock data based on form values
    const availableQuestions = quizzesData
        .filter(quiz => quiz.subject === values.subject && quiz.difficulty === values.difficulty)
        .flatMap(quiz => quiz.questions);
    
    if(availableQuestions.length === 0) {
        toast({
            variant: "destructive",
            title: "No Questions Found",
            description: `We couldn't find any questions matching your criteria for ${values.subject} at ${values.difficulty} difficulty.`,
        });
        return;
    }

    // Shuffle and pick the requested number of questions
    const shuffled = [...availableQuestions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(values.numQuestions, shuffled.length));

    setGeneratedQuestions(selected);
    setIsGenerated(true);

    toast({
      title: "Quiz Generated!",
      description: `${selected.length} questions have been prepared for your review.`,
    });
  }
  
  const handleSaveQuiz = () => {
    toast({
        title: "Feature Coming Soon!",
        description: "Saving generated quizzes to your account is under development."
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Quiz Creator</CardTitle>
            <CardDescription>Generate a custom quiz based on your selections.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {subjectsData.map(subject => (
                            <SelectItem key={subject.id} value={subject.name}>{subject.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                     <FormItem>
                      <FormLabel>Difficulty</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Easy">Easy</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                    control={form.control}
                    name="numQuestions"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Number of Questions</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Generate Quiz
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <Card className="min-h-full">
          <CardHeader>
            <div className="flex justify-between items-center">
                <div>
                    <CardTitle>Generated Questions</CardTitle>
                    <CardDescription>Review the questions below before saving the quiz.</CardDescription>
                </div>
                {isGenerated && generatedQuestions.length > 0 && (
                    <Button onClick={handleSaveQuiz}><Save className="mr-2 h-4 w-4"/> Save Quiz</Button>
                )}
            </div>
          </CardHeader>
          <CardContent>
            {!isGenerated ? (
              <div className="flex flex-col items-center justify-center text-center p-10 h-96 border-2 border-dashed rounded-lg">
                <FileQuestion className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold">Your Quiz Awaits</h3>
                <p className="text-muted-foreground">Fill out the form on the left to generate a new quiz.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {generatedQuestions.map((q, index) => (
                  <div key={q.id} className="p-4 border rounded-lg bg-muted/50">
                    <p className="font-semibold mb-2">{index + 1}. {q.question}</p>
                    <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                      {q.options.map(opt => (
                        <li key={opt} className={opt === q.answer ? 'text-green-600 font-medium' : ''}>
                          {opt}
                          {opt === q.answer && <CheckCircle className="inline ml-2 h-4 w-4" />}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}