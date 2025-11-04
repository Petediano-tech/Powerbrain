
'use server';
/**
 * @fileOverview AI-powered quiz grading flow.
 *
 * - aiGradeQuizzes - A function that grades quizzes using AI.
 * - AiGradeQuizzesInput - The input type for the aiGradeQuizzes function.
 * - AiGradeQuizzesOutput - The return type for the aiGradeQuizzes function.
 */

import { runFlow } from 'genkit/flow';
import { z } from 'zod';
import { ai } from '@/ai/genkit';

export const AiGradeQuizzesInputSchema = z.object({
  quizContent: z.string().describe('The content of the quiz, including questions and possible answers.'),
  studentAnswers: z.string().describe('The student answers to the quiz questions.'),
  teacherInstructions: z.string().optional().describe('Any specific instructions from the teacher regarding grading.'),
});
export type AiGradeQuizzesInput = z.infer<typeof AiGradeQuizzesInputSchema>;

export const AiGradeQuizzesOutputSchema = z.object({
  grade: z.string().describe('The overall grade for the quiz (e.g., A, B, C).'),
  feedback: z.string().describe('Detailed feedback on the student answers, including corrections and explanations.'),
});
export type AiGradeQuizzesOutput = z.infer<typeof AiGradeQuizzesOutputSchema>;

export async function aiGradeQuizzes(input: AiGradeQuizzesInput): Promise<AiGradeQuizzesOutput> {
  // The 'aiGradeQuizzesFlow' is defined in src/ai/dev.ts
  return await runFlow('aiGradeQuizzesFlow', input);
}
