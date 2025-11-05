import { z } from 'zod';
import { ai } from '@/ai/genkit';
import { AiStudyPlannerOutputSchema, type AiStudyPlannerOutput } from './schemas';

export const PlannerInputSchema = z.object({
  weakestSubjects: z.array(z.string()).describe("The student's weakest subjects, which need more focus."),
  upcomingExams: z.array(z.object({ subject: z.string(), date: z.string() })).describe("A list of upcoming exams and their dates."),
});
export type PlannerInput = z.infer<typeof PlannerInputSchema>;

const studyPlannerFlow = ai.defineFlow({ 
    name: 'aiStudyPlannerFlow', 
    inputSchema: PlannerInputSchema,
    outputSchema: AiStudyPlannerOutputSchema 
}, async (input) => {
    const { output } = await ai.generate({
        model: 'googleai/gemini-pro',
        prompt: `You are an AI study planner. Create a personalized 7-day study schedule for a student. The plan should prioritize their weakest subjects and prepare them for upcoming exams. Include a short, actionable study tip for each day.

        Weakest Subjects: {{#each weakestSubjects}}{{.}}, {{/each}}
        Upcoming Exams: {{#each upcomingExams}}{{subject}} on {{date}}{{/each}}`,
        output: { schema: AiStudyPlannerOutputSchema },
    });
    return output!;
});

export async function getStudyPlan(input: PlannerInput): Promise<AiStudyPlannerOutput> {
    return studyPlannerFlow(input);
}
