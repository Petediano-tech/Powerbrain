'use server';
/**
 * @fileOverview An AI tutor that can answer questions, summarize notes, or generate practice questions.
 */
import { z } from 'zod';
import { getAuthenticatedUser } from '@/firebase/auth/get-authenticated-user';
import { AiSmartTutorOutputSchema } from './schemas';
import { ai } from '../genkit';


export const AiSmartTutorInputSchema = z.object({
  query: z.string().describe('The question or request from the student.'),
  subject: z.string().optional().describe('The subject the student is asking about.'),
  gradeLevel: z.string().optional().describe('The grade level of the student (e.g., Std 7, Form 4).'),
});
export type AiSmartTutorInput = z.infer<typeof AiSmartTutorInputSchema>;

export async function getTutorResponse(input: AiSmartTutorInput, idToken: string): Promise<AiSmartTutorOutput> {
    // The user check can be done here or in the flow.
    // For consistency, let's check auth at the beginning of the flow.
    const user = await getAuthenticatedUser(idToken);
    if (!user) {
        return { response: "I'm sorry, but you must be logged in to chat with me. Please log in and try again." };
    }
    
    // Now, call the main logic.
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
    // Authentication is now checked before calling the flow,
    // but we can leave a redundant check here as a safeguard.
    const user = await getAuthenticatedUser(idToken);
    if (!user) {
        return { response: "Authentication failed. Please ensure you are logged in." };
    }
    
    const { text } = await ai.generate({
        prompt: `You are Brainy, a friendly and expert AI tutor for students in Malawi. Your goal is to help students understand concepts, practice problems, and learn effectively. Use simple, clear language. Grade Level: {{gradeLevel}}. Subject: {{subject}}. Student's question: "{{query}}"`,
        input: input,
    });

    return { response: text };
});
