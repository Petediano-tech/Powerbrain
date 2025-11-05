
import { z } from 'zod';
import { AiSmartTutorOutputSchema, type AiSmartTutorOutput } from './schemas';
import { ai } from '../genkit';

export const AiSmartTutorInputSchema = z.object({
  query: z.string().describe('The question or request from the student.'),
  subject: z.string().optional().describe('The subject the student is asking about.'),
  gradeLevel: z.string().optional().describe('The grade level of the student (e.g., Std 7, Form 4).'),
});
export type AiSmartTutorInput = z.infer<typeof AiSmartTutorInputSchema>;

const smartTutorFlow = ai.defineFlow({
    name: 'smartTutorFlow',
    inputSchema: AiSmartTutorInputSchema,
    outputSchema: AiSmartTutorOutputSchema,
}, async (input) => {
    const { text } = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest',
        prompt: `You are Brainy, a friendly and expert AI tutor for students in Malawi. Your goal is to help students understand concepts, practice problems, and learn effectively. Use simple, clear language. Grade Level: {{gradeLevel}}. Subject: {{subject}}. Student's question: "{{query}}"`,
    });

    return { response: text };
});

export async function getTutorResponse(input: AiSmartTutorInput): Promise<AiSmartTutorOutput> {
    return smartTutorFlow(input);
}
