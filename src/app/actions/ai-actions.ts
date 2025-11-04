
'use server';

import { 
    studyInsightsPrompt,
    aiGradeQuizzesPrompt,
    aiQuizGeneratorPrompt,
    aiStudyPlannerPrompt,
    aiCareerGuidancePrompt,
} from '@/ai/dev';
import { getGenkitAi } from '@/ai/genkit';
import { smartTutorLogic } from '@/ai/flows';
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
    const { output } = await aiCareerGuidancePrompt(input);
    return output!;
}

export async function gradeQuiz(input: AiGradeQuizzesInput): Promise<AiGradeQuizzesOutput> {
    const { output } = await aiGradeQuizzesPrompt(input);
    return output!;
}

export async function generateQuiz(input: QuizGeneratorInput): Promise<AiQuizGeneratorOutput> {
    const { output } = await aiQuizGeneratorPrompt(input);
    return output!;
}

export async function getTutorResponse(input: AiSmartTutorInput): Promise<AiSmartTutorOutput> {
    // smartTutorLogic contains custom auth checks that need to run before the AI call.
    return await smartTutorLogic(input);
}

export async function getStudyPlan(input: PlannerInput): Promise<AiStudyPlannerOutput> {
    const { output } = await aiStudyPlannerPrompt(input);
    return output!;
}

export async function generateStudyInsights(input: StudyInsightsInput): Promise<StudyInsightsOutput> {
    const { output } = await studyInsightsPrompt(input);
    return output!;
}
