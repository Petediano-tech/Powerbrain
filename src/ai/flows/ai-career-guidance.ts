'use server';
/**
 * @fileOverview AI-powered career guidance flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PerformanceDataSchema = z.object({
  strongestSubjects: z.array(z.string()).describe("The student's strongest subjects in school."),
  averageScore: z.number().describe('The student\'s average score across all subjects (0-100).'),
  interests: z.array(z.string()).describe("A list of the student's personal interests and hobbies."),
});

const CareerRecommendationSchema = z.object({
    name: z.string().describe('The name of the recommended career path.'),
    description: z.string().describe('A brief description of why this career is a good fit for the student.'),
});

const UniversitySuggestionSchema = z.object({
    course: z.string().describe('The specific degree or diploma program.'),
    university: z.string().describe('The name of the Malawian university or college offering the course (e.g., University of Malawi, MUBAS, KUHeS, Mzuni).'),
    reason: z.string().describe('Why this specific course is recommended based on the career path.'),
});

export const AiCareerGuidanceOutputSchema = z.object({
  careerRecommendations: z.array(CareerRecommendationSchema).describe('A list of 2-3 tailored career recommendations.'),
  universitySuggestions: z.array(UniversitySuggestionSchema).describe('A list of specific courses at Malawian universities that align with the recommended careers.'),
  nextSteps: z.string().describe('A paragraph of actionable advice for the student to explore these career paths further.'),
});
export type AiCareerGuidanceOutput = z.infer<typeof AiCareerGuidanceOutputSchema>;


export async function aiCareerGuidance(input: z.infer<typeof PerformanceDataSchema>): Promise<AiCareerGuidanceOutput> {
  const prompt = ai.definePrompt({
    name: 'aiCareerGuidancePrompt',
    input: { schema: PerformanceDataSchema },
    output: { schema: AiCareerGuidanceOutputSchema },
    system: `You are an expert career guidance counselor for Malawian secondary school students. Your sole purpose is to provide realistic, encouraging, and actionable advice based on the student's academic performance and interests.

    Your recommendations MUST be tailored to the Malawian context. This means:
    - Recommending careers that are viable and in demand in Malawi.
    - Suggesting courses at real, well-known Malawian universities and colleges (e.g., University of Malawi (UNIMA), Malawi University of Business and Applied Sciences (MUBAS), Kamuzu University of Health Sciences (KUHeS), Mzuzu University (Mzuni), Lilongwe University of Agriculture and Natural Resources (LUANAR)).
    - The next steps should be practical for a student in Malawi.`,
    prompt: `A student has provided the following information:
    - Strongest Subjects: {{strongestSubjects}}
    - Average Score: {{averageScore}}%
    - Personal Interests: {{interests}}

    Based on this, please generate a report with career recommendations, specific university course suggestions available in Malawi, and actionable next steps.`,
  });

  const { output } = await prompt(input);
  return output!;
}
