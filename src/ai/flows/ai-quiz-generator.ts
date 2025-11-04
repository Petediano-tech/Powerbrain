'use server';
/**
 * @fileOverview AI-powered quiz and assignment generator for teachers.
 */

import { ai } from 'genkit/ai';
import { z } from 'genkit/zod';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuthenticatedUser } from '@/firebase/auth/get-authenticated-user';

const QuizGeneratorInputSchema = z.object({
  subject: z.string().describe('The subject for the quiz.'),
  topic: z.string().describe('The specific topic within the subject.'),
  numberOfQuestions: z.number().int().min(1).max(20).describe('The number of multiple-choice questions to generate.'),
  gradeLevel: z.string().describe('The grade level of the students (e.g., Form 2, Standard 8).'),
});

const QuestionSchema = z.object({
    question: z.string().describe("The text of the question."),
    options: z.array(z.string()).length(4).describe("An array of 4 possible answers."),
    answer: z.string().describe("The correct answer from the options."),
    explanation: z.string().describe("A brief explanation of why the answer is correct."),
});

export const AiQuizGeneratorOutputSchema = z.object({
  questions: z.array(QuestionSchema),
});
export type AiQuizGeneratorOutput = z.infer<typeof AiQuizGeneratorOutputSchema>;

export async function aiQuizGenerator(input: z.infer<typeof QuizGeneratorInputSchema>): Promise<AiQuizGeneratorOutput> {
  const user = await getAuthenticatedUser();
  if (!user) {
    throw new Error('Authentication required. You must be a teacher to use this feature.');
  }

  const firestore = getFirestore();
  const profileRef = firestore.collection('userProfiles').doc(user.uid);
  const profileSnap = await profileRef.get();

  if (!profileSnap.exists) {
      throw new Error("User profile not found.");
  }
  
  const userProfile = profileSnap.data();

  if (userProfile?.role !== 'teacher') {
    throw new Error('Access denied. This feature is for teachers only.');
  }
  
  const prompt = ai.definePrompt({
    name: 'aiQuizGeneratorPrompt',
    input: { schema: QuizGeneratorInputSchema },
    output: { schema: AiQuizGeneratorOutputSchema },
    system: `You are an expert curriculum designer for the Malawian education system. Your task is to create high-quality multiple-choice quizzes for teachers.

    All questions must:
    - Be directly relevant to the specified subject and topic.
    - Be appropriate for the specified grade level in Malawi.
    - Have exactly 4 plausible options.
    - Include a clear correct answer and a concise explanation.`,
    prompt: `Generate a quiz with {{numberOfQuestions}} multiple-choice questions for a {{gradeLevel}} class.

    Subject: {{subject}}
    Topic: {{topic}}
    
    For each question, provide the question text, 4 options, the correct answer, and an explanation.`,
  });

  const { output } = await prompt(input);
  return output!;
}
