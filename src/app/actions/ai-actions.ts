'use server';

import { getCareerGuidance, type PerformanceData, type AiCareerGuidanceOutput } from '@/ai/flows/ai-career-guidance';
import { gradeQuiz, type AiGradeQuizzesInput, type AiGradeQuizzesOutput } from '@/ai/flows/ai-grade-quizzes';
import { generateQuiz, type QuizGeneratorInput, type AiQuizGeneratorOutput } from '@/ai/flows/ai-quiz-generator';
import { generateStudyInsights, type StudyInsightsInput, type StudyInsightsOutput } from '@/ai/flows/ai-study-insights';
import { getStudyPlan, type PlannerInput, type AiStudyPlannerOutput } from '@/ai/flows/ai-study-planner';


export async function getCareerGuidanceAction(input: PerformanceData): Promise<AiCareerGuidanceOutput> {
    return await getCareerGuidance(input);
}

export async function gradeQuizAction(input: AiGradeQuizzesInput): Promise<AiGradeQuizzesOutput> {
    return await gradeQuiz(input);
}

export async function generateQuizAction(input: QuizGeneratorInput): Promise<AiQuizGeneratorOutput> {
    return await generateQuiz(input);
}

export async function getStudyPlanAction(input: PlannerInput): Promise<AiStudyPlannerOutput> {
    return await getStudyPlan(input);
}

export async function generateStudyInsightsAction(input: StudyInsightsInput): Promise<StudyInsightsOutput> {
    return await generateStudyInsights(input);
}
