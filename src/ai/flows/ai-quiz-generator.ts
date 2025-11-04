/**
 * @fileOverview AI-powered quiz and assignment generator logic for teachers.
 */
import { z } from 'zod';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuthenticatedUser } from '@/firebase/auth/get-authenticated-user';
import type { GenkitPrompt } from 'genkit';
import { AiQuizGeneratorOutputSchema } from './schemas';

export const QuizGeneratorInputSchema = z.object({
  subject: z.string().describe('The subject for the quiz.'),
  topic: z.string().describe('The specific topic within the subject.'),
  numberOfQuestions: z.number().int().min(1).max(20).describe('The number of multiple-choice questions to generate.'),
  gradeLevel: z.string().describe('The grade level of the students (e.g., Form 2, Standard 8).'),
});
export type QuizGeneratorInput = z.infer<typeof QuizGeneratorInputSchema>;

export async function quizGeneratorLogic(input: QuizGeneratorInput, prompt: GenkitPrompt<typeof QuizGeneratorInputSchema, typeof AiQuizGeneratorOutputSchema>) {
  const user = await getAuthenticatedUser();
  if (!user) {
    throw new Error('Authentication required. You must be a teacher to use this feature.');
  }

  const firestore = getFirestore();
  const profileRef = firestore.collection('userProfiles').doc(user.uid);
  const profileSnap = await profileRef.get();

  if (!profileSnap.exists()) {
      throw new Error("User profile not found.");
  }
  
  const userProfile = profileSnap.data();

  if (userProfile?.role !== 'teacher') {
    throw new Error('Access denied. This feature is for teachers only.');
  }
  
  const { output } = await prompt(input);
  return output!;
}
