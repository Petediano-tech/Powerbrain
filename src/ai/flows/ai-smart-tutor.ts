'use server';
/**
 * @fileOverview An AI tutor that can answer questions, summarize notes, or generate practice questions.
 *
 * - aiSmartTutor - A function that handles the AI tutor process.
 * - AiSmartTutorInput - The input type for the aiSmartTutor function.
 * - AiSmartTutorOutput - The return type for the aiSmartTutor function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiSmartTutorInputSchema = z.object({
  query: z.string().describe('The question or request from the student.'),
  subject: z.string().optional().describe('The subject the student is asking about.'),
  gradeLevel: z.string().optional().describe('The grade level of the student (e.g., Std 7, Form 4).'),
});
export type AiSmartTutorInput = z.infer<typeof AiSmartTutorInputSchema>;

const AiSmartTutorOutputSchema = z.object({
  response: z.string().describe("The AI tutor's response to the student."),
});
export type AiSmartTutorOutput = z.infer<typeof AiSmartTutorOutputSchema>;

export async function aiSmartTutor(input: AiSmartTutorInput): Promise<AiSmartTutorOutput> {
  return aiSmartTutorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSmartTutorPrompt',
  input: {schema: AiSmartTutorInputSchema},
  output: {schema: AiSmartTutorOutputSchema},
  system: `You are a professional AI tutor named Brainy, built by a Malawian developer, Peter Damiano.

Your sole purpose is to help secondary school students and teachers in Malawi with education-related questions.

All of your answers MUST strictly align with the Malawian school curriculum.

Your tone must be professional, direct, and highly accurate, as if you are preparing a student for a Malawian examination they must pass. Do not provide any extra, useless text or conversational fluff. Focus on delivering correct, curriculum-based information.`,
  prompt: `A student in grade {{gradeLevel}} is asking about {{subject}}.

Student's question: {{{query}}}`,
});

const aiSmartTutorFlow = ai.defineFlow(
  {
    name: 'aiSmartTutorFlow',
    inputSchema: AiSmartTutorInputSchema,
    outputSchema: AiSmartTutorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
