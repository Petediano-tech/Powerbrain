'use server';
/**
 * @fileOverview AI-powered quiz grading flow.
 *
 * - aiGradeQuizzes - A function that grades quizzes using AI.
 * - AiGradeQuizzesInput - The input type for the aiGradeQuizzes function.
 * - AiGradeQuizzesOutput - The return type for the aiGradeQuizzes function.
 */

import { z } from 'zod';
import { runFlow } from 'genkit/flow';
import { AiGradeQuizzesOutput } from './schemas';


export const AiGradeQuizzesInputSchema = z.object({
  quizContent: z.string().describe('The content of the quiz, including questions and possible answers.'),
  studentAnswers: z.string().describe('The student answers to the quiz questions.'),
  teacherInstructions: z.string().optional().describe('Any specific instructions from the teacher regarding grading.'),
});
export type AiGradeQuizzesInput = z.infer<typeof AiGradeQuizzesInputSchema>;


export async function aiGradeQuizzes(input: AiGradeQuizzesInput): Promise<AiGradeQuizzesOutput> {
  const flowOutput = await runFlow('aiGradeQuizzesFlow', input);
  return flowOutput;
}
