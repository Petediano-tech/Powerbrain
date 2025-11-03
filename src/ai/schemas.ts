import { z } from 'genkit';

const DailyPlanSchema = z.object({
    day: z.string().describe("The day of the week (e.g., Monday, Tuesday)."),
    plan: z.string().describe("The detailed study plan for that day, including subjects and specific topics to cover."),
    tip: z.string().optional().describe("An optional short, actionable study tip for the day."),
});

export const AiStudyPlannerOutputSchema = z.object({
  weeklySchedule: z.array(DailyPlanSchema).describe('A 7-day study schedule.'),
});
export type AiStudyPlannerOutput = z.infer<typeof AiStudyPlannerOutputSchema>;
