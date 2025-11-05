
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

export const AiStudyInsightsOutputSchema = z.object({
  overallPerformance: z.string().describe('An overall assessment of the student\u0027s performance.'),
  strengths: z.string().describe('Specific strengths of the student based on the data.'),
  weaknesses: z.string().describe('Specific weaknesses of the student based on the data.'),
  recommendations: z.string().describe('Personalized recommendations for the student to improve.'),
});
export type StudyInsightsOutput = z.infer<typeof AiStudyInsightsOutputSchema>;

export const AiGradeQuizzesOutputSchema = z.object({
  grade: z.string().describe('The overall grade for the quiz (e.g., A, B, C).'),
  feedback: z.string().describe('Detailed feedback on the student answers, including corrections and explanations.'),
});
export type AiGradeQuizzesOutput = z.infer<typeof AiGradeQuizzesOutputSchema>;


const QuestionSchema = z.object({
    question: z.string().describe("The text of the question."),
    options: z.array(z.string()).length(4).describe("An array of 4 possible answers."),
    answer: z.string().describe("The correct answer from the options."),
    explanation: z.string().describe("A brief explanation of why the answer is correct."),
});

export const AiQuizGeneratorOutputSchema = z.object({
  questions: z.array(QuestionSchema),
});
export type AiQuizGeneratorOutput = z.infer<typeof AiQuizGeneratorOutputSchema>;
