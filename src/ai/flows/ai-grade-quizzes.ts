'use server';
/**
 * @fileOverview AI-powered quiz grading flow.
 *
 * - aiGradeQuizzes - A function that grades quizzes using AI.
 * - AiGradeQuizzesInput - The input type for the aiGradeQuizzes function.
 * - AiGradeQuizzesOutput - The return type for the aiGradeQuizzes function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const AiGradeQuizzesInputSchema = z.object({
  quizContent: z.string().describe('The content of the quiz, including questions and possible answers.'),
  studentAnswers: z.string().describe('The student answers to the quiz questions.'),
  teacherInstructions: z.string().optional().describe('Any specific instructions from the teacher regarding grading.'),
});
export type AiGradeQuizzesInput = z.infer<typeof AiGradeQuizzesInputSchema>;

const AiGradeQuizzesOutputSchema = z.object({
  grade: z.string().describe('The overall grade for the quiz (e.g., A, B, C).'),
  feedback: z.string().describe('Detailed feedback on the student answers, including corrections and explanations.'),
});
export type AiGradeQuizzesOutput = z.infer<typeof AiGradeQuizzesOutputSchema>;

const aiGradeQuizzesFlow = ai.defineFlow(
  {
    name: 'aiGradeQuizzesFlow',
    inputSchema: AiGradeQuizzesInputSchema,
    outputSchema: AiGradeQuizzesOutputSchema,
  },
  async input => {
    const prompt = ai.definePrompt({
        name: 'aiGradeQuizzesPrompt',
        input: {schema: AiGradeQuizzesInputSchema},
        output: {schema: AiGradeQuizzesOutputSchema},
        prompt: `You are an AI grading assistant that automatically grades quizzes based on the provided content and student answers.

        Quiz Content:
        {{quizContent}}

        Student Answers:
        {{studentAnswers}}

        Teacher Instructions (if any):
        {{teacherInstructions}}

        Provide an overall grade and detailed feedback on the student's answers. The feedback should include specific corrections and explanations.

        Ensure that the grade and feedback are aligned with the quiz content and any teacher instructions provided.  Give the grade in the format A,B,C,D,E or F.
        Grade:
        Feedback: `,
    });

    const {output} = await prompt(input);
    return output!;
  }
);


export async function aiGradeQuizzes(input: AiGradeQuizzesInput): Promise<AiGradeQuizzesOutput> {
  return aiGradeQuizzesFlow(input);
}
