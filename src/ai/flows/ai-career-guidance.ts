import { z } from 'zod';
import { ai } from '@/ai/genkit';
import { AiCareerGuidanceOutputSchema, type AiCareerGuidanceOutput } from './schemas';

export const PerformanceDataSchema = z.object({
  strongestSubjects: z.array(z.string()).describe("The student's strongest subjects in school."),
  averageScore: z.number().describe('The student\'s average score across all subjects (0-100).'),
  interests: z.array(z.string()).describe("A list of the student's personal interests and hobbies."),
});
export type PerformanceData = z.infer<typeof PerformanceDataSchema>;

const careerGuidanceFlow = ai.defineFlow(
  {
    name: 'careerGuidanceFlow',
    inputSchema: PerformanceDataSchema,
    outputSchema: AiCareerGuidanceOutputSchema,
  },
  async (input) => {
    const { output } = await ai.generate({
        model: 'googleai/gemini-pro',
        prompt: `You are an AI career advisor for Malawian students. Based on the student's performance and interests, provide 2-3 tailored career recommendations, suggest specific degree/diploma programs at Malawian universities (e.g., University of Malawi, MUBAS, KUHeS, Mzuni), and give actionable next steps.

        Student's Strongest Subjects: {{#each strongestSubjects}}{{.}}, {{/each}}
        Student's Average Score: {{averageScore}}%
        Student's Interests: {{#each interests}}{{.}}, {{/each}}`,
        output: { schema: AiCareerGuidanceOutputSchema },
    });
    return output!;
  }
);

export async function getCareerGuidance(input: PerformanceData): Promise<AiCareerGuidanceOutput> {
  return careerGuidanceFlow(input);
}
