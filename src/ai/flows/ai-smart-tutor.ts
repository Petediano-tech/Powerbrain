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
  response: z.string().describe('The AI tutor\'s response to the student.'),
});
export type AiSmartTutorOutput = z.infer<typeof AiSmartTutorOutputSchema>;

export async function aiSmartTutor(input: AiSmartTutorInput): Promise<AiSmartTutorOutput> {
  return aiSmartTutorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSmartTutorPrompt',
  input: {schema: AiSmartTutorInputSchema},
  output: {schema: AiSmartTutorOutputSchema},
  prompt: `You are a helpful AI tutor for students in Malawi.

You can answer questions about various subjects, summarize notes, or generate practice questions.

Adjust your tone and language based on the student's grade level. For example, use simpler language for Std 7 students and more advanced language for Form 4 students.

Respond in English unless otherwise specified.

{% if subject %}The student is asking about {{subject}}.{% endif %}
{% if gradeLevel %}The student is in grade {{gradeLevel}}.{% endif %}

Student's Question: {{{query}}}`,
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
