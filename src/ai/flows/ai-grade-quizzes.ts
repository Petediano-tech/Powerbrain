/**
 * @fileOverview AI-powered quiz grading flow logic.
 */
'use server';
import { z } from 'zod';
import type { GenkitPrompt } from 'genkit';
import { AiGradeQuizzesOutputSchema } from './schemas';

export const AiGradeQuizzesInputSchema = z.object({
  quizContent: z.string().describe('The content of the quiz, including questions and possible answers.'),
  studentAnswers: z.string().describe('The student answers to the quiz questions.'),
  teacherInstructions: z.string().optional().describe('Any specific instructions from the teacher regarding grading.'),
});
export type AiGradeQuizzesInput = z.infer<typeof AiGradeQuizzesInputSchema>;

export async function gradeQuizzesLogic(input: AiGradeQuizzesInput, prompt: GenkitPrompt<typeof AiGradeQuizzesInputSchema, typeof AiGradeQuizzesOutputSchema>) {
  const { output } = await prompt(input);
  return output!;
}
