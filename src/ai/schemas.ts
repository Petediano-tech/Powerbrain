import { z } from 'zod';

const DailyPlanSchema = z.object({
    day: z.string().describe("The day of the week (e.g., Monday, Tuesday)."),
    plan: z.string().describe("The detailed study plan for that day, including subjects and specific topics to cover."),
    tip: z.string().optional().describe("An optional short, actionable study tip for the day."),
});

export const AiStudyPlannerOutputSchema = z.object({
  weeklySchedule: z.array(DailyPlanSchema).describe('A 7-day study schedule.'),
});
export type AiStudyPlannerOutput = z.infer<typeof AiStudyPlannerOutputSchema>;


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
