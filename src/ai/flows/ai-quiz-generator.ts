
import { z } from 'zod';
import { AiQuizGeneratorOutputSchema, type AiQuizGeneratorOutput } from './schemas';
import { ai } from '@/ai/genkit';

export const QuizGeneratorInputSchema = z.object({
  subject: z.string().describe('The subject for the quiz.'),
  topic: z.string().describe('The specific topic within the subject.'),
  numberOfQuestions: z.number().int().min(1).max(20).describe('The number of multiple-choice questions to generate.'),
  gradeLevel: z.string().describe('The grade level of the students (e.g., Form 2, Standard 8).'),
});
export type QuizGeneratorInput = z.infer<typeof QuizGeneratorInputSchema>;

const quizGeneratorFlow = ai.defineFlow(
  {
    name: 'aiQuizGeneratorFlow',
    inputSchema: QuizGeneratorInputSchema,
    outputSchema: AiQuizGeneratorOutputSchema,
  },
  async (input) => {
    const { output } = await ai.generate({
        model: 'googleai/gemini-1.5-flash-latest',
        prompt: `You are an AI assistant for teachers in Malawi. Generate a multiple-choice quiz with a specified number of questions on a given topic and for a specific grade level. Each question should have 4 options, a correct answer, and a brief explanation.

        Subject: {{subject}}
        Topic: {{topic}}
        Number of Questions: {{numberOfQuestions}}
        Grade Level: {{gradeLevel}}`,
        output: { schema: AiQuizGeneratorOutputSchema },
    });
    return output!;
  }
);


export async function generateQuiz(
  input: QuizGeneratorInput
): Promise<AiQuizGeneratorOutput> {
  return quizGeneratorFlow(input);
}
