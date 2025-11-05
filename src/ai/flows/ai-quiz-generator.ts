
/**
 * @fileOverview AI-powered quiz and assignment generator logic for teachers.
 */
import { z } from 'zod';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuthenticatedUser } from '@/firebase/auth/get-authenticated-user';
import { AiQuizGeneratorOutputSchema } from './schemas';
import { ai } from '@/ai/genkit';

export const QuizGeneratorInputSchema = z.object({
  subject: z.string().describe('The subject for the quiz.'),
  topic: z.string().describe('The specific topic within the subject.'),
  numberOfQuestions: z.number().int().min(1).max(20).describe('The number of multiple-choice questions to generate.'),
  gradeLevel: z.string().describe('The grade level of the students (e.g., Form 2, Standard 8).'),
});
export type QuizGeneratorInput = z.infer<typeof QuizGeneratorInputSchema>;

const aiQuizGeneratorPrompt = ai.definePrompt({
    name: 'aiQuizGeneratorPrompt',
    input: {schema: QuizGeneratorInputSchema},
    output: {schema: AiQuizGeneratorOutputSchema},
    prompt: `You are an AI assistant for teachers in Malawi. Generate a multiple-choice quiz with a specified number of questions on a given topic and for a specific grade level. Each question should have 4 options, a correct answer, and a brief explanation.

    Subject: {{{subject}}}
    Topic: {{{topic}}}
    Number of Questions: {{{numberOfQuestions}}}
    Grade Level: {{{gradeLevel}}}`,
});

const quizGeneratorFlow = ai.defineFlow({ 
    name: 'aiQuizGeneratorFlow', 
    inputSchema: QuizGeneratorInputSchema, 
    outputSchema: AiQuizGeneratorOutputSchema 
}, async (input) => {
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
    
    const { output } = await aiQuizGeneratorPrompt(input);
    return output!;
});


export async function generateQuiz(input: QuizGeneratorInput): Promise<AiQuizGeneratorOutput> {
    return await quizGeneratorFlow(input);
}
