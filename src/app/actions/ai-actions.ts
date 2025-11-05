
'use server';

import {
    careerGuidanceFlow,
    gradeQuizzesFlow,
    quizGeneratorFlow,
    smartTutorFlow,
    studyInsightsFlow,
    studyPlannerFlow,
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


export async function getCareerGuidance(input: PerformanceData): Promise<AiCareerGuidanceOutput> {
    return await careerGuidanceFlow(input);
}

export async function gradeQuiz(input: AiGradeQuizzesInput): Promise<AiGradeQuizzesOutput> {
    return await gradeQuizzesFlow(input);
}

export async function generateQuiz(input: QuizGeneratorInput): Promise<AiQuizGeneratorOutput> {
    return await quizGeneratorFlow(input);
}

export async function getTutorResponse(input: AiSmartTutorInput): Promise<AiSmartTutorOutput> {
    return await smartTutorFlow(input);
}

export async function getStudyPlan(input: PlannerInput): Promise<AiStudyPlannerOutput> {
    return await studyPlannerFlow(input);
}

export async function generateStudyInsights(input: StudyInsightsInput): Promise<StudyInsightsOutput> {
    return await studyInsightsFlow(input);
}
