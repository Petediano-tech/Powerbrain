'use server';

import {
  aiCareerGuidanceFlow,
  aiGradeQuizzesFlow,
  aiQuizGeneratorFlow,
  aiSmartTutorFlow,
  aiStudyPlannerFlow,
  studyInsightsFlow
} from '@/ai/dev';
import type { 
    PerformanceData,
    AiGradeQuizzesInput,
    QuizGeneratorInput,
    AiSmartTutorInput,
    PlannerInput,
    StudyInsightsInput,
} from '@/ai/flows';
import type { AiCareerGuidanceOutput, AiGradeQuizzesOutput, AiQuizGeneratorOutput, AiSmartTutorOutput, AiStudyPlannerOutput, StudyInsightsOutput } from '@/ai/flows/schemas';

export async function getCareerGuidance(input: PerformanceData): Promise<AiCareerGuidanceOutput> {
    return await aiCareerGuidanceFlow(input);
}

export async function gradeQuiz(input: AiGradeQuizzesInput): Promise<AiGradeQuizzesOutput> {
    return await aiGradeQuizzesFlow(input);
}

export async function generateQuiz(input: QuizGeneratorInput): Promise<AiQuizGeneratorOutput> {
    return await aiQuizGeneratorFlow(input);
}

export async function getTutorResponse(input: AiSmartTutorInput): Promise<AiSmartTutorOutput> {
    return await aiSmartTutorFlow(input);
}

export async function getStudyPlan(input: PlannerInput): Promise<AiStudyPlannerOutput> {
    return await aiStudyPlannerFlow(input);
}

export async function generateStudyInsights(input: StudyInsightsInput): Promise<StudyInsightsOutput> {
    return await studyInsightsFlow(input);
}
