
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
    AiCareerGuidanceOutput, 
    AiGradeQuizzesOutput, 
    AiQuizGeneratorOutput, 
    AiSmartTutorOutput, 
    AiStudyPlannerOutput, 
    StudyInsightsOutput 
} from '@/ai/flows';

export async function getCareerGuidanceAction(input: PerformanceData, idToken: string): Promise<AiCareerGuidanceOutput> {
    return await getCareerGuidance(input, idToken);
}

export async function gradeQuizAction(input: AiGradeQuizzesInput): Promise<AiGradeQuizzesOutput> {
    return await gradeQuiz(input);
}

export async function generateQuizAction(input: QuizGeneratorInput, idToken: string): Promise<AiQuizGeneratorOutput> {
    return await generateQuiz(input, idToken);
}

export async function getTutorResponseAction(input: AiSmartTutorInput, idToken: string): Promise<AiSmartTutorOutput> {
    return await getTutorResponse(input, idToken);
}

export async function getStudyPlanAction(input: PlannerInput, idToken: string): Promise<AiStudyPlannerOutput> {
    return await getStudyPlan(input, idToken);
}

export async function generateStudyInsightsAction(input: StudyInsightsInput): Promise<StudyInsightsOutput> {
    return await generateStudyInsights(input);
}
