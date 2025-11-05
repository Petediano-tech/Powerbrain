'use server';

import { getCareerGuidance, type PerformanceData, type AiCareerGuidanceOutput } from '@/ai/flows/ai-career-guidance';
import { gradeQuiz, type AiGradeQuizzesInput, type AiGradeQuizzesOutput } from '@/ai/flows/ai-grade-quizzes';
import { generateQuiz, type QuizGeneratorInput, type AiQuizGeneratorOutput } from '@/ai/flows/ai-quiz-generator';
import { getTutorResponse, type AiSmartTutorInput, type AiSmartTutorOutput } from '@/ai/flows/ai-smart-tutor';
import { generateStudyInsights, type StudyInsightsInput, type StudyInsightsOutput } from '@/ai/flows/ai-study-insights';
import { getStudyPlan, type PlannerInput, type AiStudyPlannerOutput } from '@/ai/flows/ai-study-planner';


export async function getCareerGuidanceAction(input: PerformanceData, idToken: string): Promise<AiCareerGuidanceOutput> {
    return await getCareerGuidance(input, { auth: { idToken, uid: '' } });
}

export async function gradeQuizAction(input: AiGradeQuizzesInput): Promise<AiGradeQuizzesOutput> {
    return await gradeQuiz(input);
}

export async function generateQuizAction(input: QuizGeneratorInput, idToken: string): Promise<AiQuizGeneratorOutput> {
    return await generateQuiz(input, { auth: { idToken, uid: '' } });
}

export async function getTutorResponseAction(input: AiSmartTutorInput, idToken: string): Promise<AiSmartTutorOutput> {
    return await getTutorResponse(input, { auth: { idToken, uid: '' } });
}

export async function getStudyPlanAction(input: PlannerInput, idToken: string): Promise<AiStudyPlannerOutput> {
    return await getStudyPlan(input, { auth: { idToken, uid: '' } });
}

export async function generateStudyInsightsAction(input: StudyInsightsInput): Promise<StudyInsightsOutput> {
    return await generateStudyInsights(input);
}