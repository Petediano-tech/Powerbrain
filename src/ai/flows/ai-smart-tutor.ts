'use server';

/**
 * @fileOverview An AI tutor that can answer questions, summarize notes, or generate practice questions.
 */
import { z } from 'zod';
import { getAuthenticatedUser } from '@/firebase/auth/get-authenticated-user';
import { AiSmartTutorOutputSchema, type AiSmartTutorOutput } from './schemas';
import { ai } from '../genkit';
import { getFirestore } from 'firebase-admin/firestore';

export const AiSmartTutorInputSchema = z.object({
  query: z.string().describe('The question or request from the student.'),
  subject: z.string().optional().describe('The subject the student is asking about.'),
  gradeLevel: z.string().optional().describe('The grade level of the student (e.g., Std 7, Form 4).'),
});
export type AiSmartTutorInput = z.infer<typeof AiSmartTutorInputSchema>;

export async function getTutorResponse(input: AiSmartTutorInput, idToken: string): Promise<AiSmartTutorOutput> {
    return await smartTutorFlow({input, idToken});
}

const smartTutorFlow = ai.defineFlow({
    name: 'smartTutorFlow',
    inputSchema: z.object({
      input: AiSmartTutorInputSchema,
      idToken: z.string(),
    }),
    outputSchema: AiSmartTutorOutputSchema,
}, async ({ input, idToken }) => {
    const user = await getAuthenticatedUser(idToken);
    if (!user) {
        return { response: "I'm sorry, but you must be logged in to chat with me. Please log in and try again." };
    }
    
    // This feature is now free for all users.
    // The authentication check above is sufficient.

    const { text } = await ai.generate({
        model: 'googleai/gemini-1.5-flash-preview',
        prompt: `You are Brainy, a friendly and expert AI tutor for students in Malawi. Your goal is to help students understand concepts, practice problems, and learn effectively. Use simple, clear language. Grade Level: {{gradeLevel}}. Subject: {{subject}}. Student's question: "{{query}}"`,
        input: input,
    });

    return { response: text };
});