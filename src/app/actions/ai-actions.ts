
'use server';

import {
    getCareerGuidance,
    gradeQuiz,
    generateQuiz,
    getTutorResponse,
    getStudyPlan,
    generateStudyInsights,
} from '@/ai/flows';
import type { 
    PerformanceData,
    AiGradeQuizzesInput,
    QuizGeneratorInput,
    PlannerInput,
    StudyInsightsInput,
    AiSmartTutorInput,
} from '@/ai/flows';
import type { AiCareerGuidanceOutput, AiGradeQuizzesOutput, AiQuizGeneratorOutput, AiSmartTutorOutput, AiStudyPlannerOutput, StudyInsightsOutput } from '@/ai/flows/schemas';


export async function getCareerGuidanceAction(input: PerformanceData): Promise<AiCareerGuidanceOutput> {
    return await getCareerGuidance(input);
}

export async function gradeQuizAction(input: AiGradeQuizzesInput): Promise<AiGradeQuizzesOutput> {
    return await gradeQuiz(input);
}

export async function generateQuizAction(input: QuizGeneratorInput): Promise<AiQuizGeneratorOutput> {
    return await generateQuiz(input);
}

export async function getTutorResponseAction(input: AiSmartTutorInput, idToken: string): Promise<AiSmartTutorOutput> {
    return await getTutorResponse(input, idToken);
}

export async function getStudyPlanAction(input: PlannerInput): Promise<AiStudyPlannerOutput> {
    return await getStudyPlan(input);
}

export async function generateStudyInsightsAction(input: StudyInsightsInput): Promise<StudyInsightsOutput> {
    return await generateStudyInsights(input);
}
