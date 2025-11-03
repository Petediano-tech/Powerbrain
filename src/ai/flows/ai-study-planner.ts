'use server';
/**
 * @fileOverview AI-powered study plan generator.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PlannerInputSchema = z.object({
  weakestSubjects: z.array(z.string()).describe("The student's weakest subjects, which need more focus."),
  upcomingExams: z.array(z.object({ subject: z.string(), date: z.string() })).describe("A list of upcoming exams and their dates."),
});

const DailyPlanSchema = z.object({
    day: z.string().describe("The day of the week (e.g., Monday, Tuesday)."),
    plan: z.string().describe("The detailed study plan for that day, including subjects and specific topics to cover."),
    tip: z.string().optional().describe("An optional short, actionable study tip for the day."),
});

export const AiStudyPlannerOutputSchema = z.object({
  weeklySchedule: z.array(DailyPlanSchema).describe('A 7-day study schedule.'),
});
export type AiStudyPlannerOutput = z.infer<typeof AiStudyPlannerOutputSchema>;

export async function aiStudyPlanner(input: z.infer<typeof PlannerInputSchema>): Promise<AiStudyPlannerOutput> {
  const prompt = ai.definePrompt({
    name: 'aiStudyPlannerPrompt',
    input: { schema: PlannerInputSchema },
    output: { schema: AiStudyPlannerOutputSchema },
    system: `You are an expert academic advisor for Malawian secondary school students. Your goal is to create a realistic and effective weekly study plan.

    The plan should:
    - Prioritize the student's weakest subjects.
    - Incorporate preparation for upcoming exams.
    - Be balanced, with a mix of subjects each day and recommendations for breaks.
    - Include one unique, actionable study tip for each day.
    - The tone should be encouraging and motivational.`,
    prompt: `A student needs a study plan. Here is their information:
    - Weakest Subjects to focus on: {{weakestSubjects}}
    - Upcoming Exams: {{#each upcomingExams}}{{subject}} ({{date}}){{/each}}

    Please generate a balanced 7-day study schedule starting from Monday. For each day, provide a clear plan and a helpful study tip.`,
  });

  const { output } = await prompt(input);
  return output!;
}
