/**
 * @fileOverview Barrel file for exporting all AI flow functions and types.
 * This file should only export the public-facing async functions and their I/O types.
 * It should NOT export the flow or prompt objects themselves to avoid breaking 'use server' constraints.
 */

// Career Guidance
export { getCareerGuidance } from './ai-career-guidance';
export type { PerformanceData } from './ai-career-guidance';
export type { AiCareerGuidanceOutput } from './schemas';

// Grade Quizzes
export { gradeQuiz } from './ai-grade-quizzes';
export type { AiGradeQuizzesInput } from './ai-grade-quizzes';
export type { AiGradeQuizzesOutput } from './schemas';

// Quiz Generator
export { generateQuiz } from './ai-quiz-generator';
export type { QuizGeneratorInput } from './ai-quiz-generator';
export type { AiQuizGeneratorOutput } from './schemas';

// Smart Tutor
export { getTutorResponse } from './ai-smart-tutor';
export type { AiSmartTutorInput } from './ai-smart-tutor';
export type { AiSmartTutorOutput } from './schemas';

// Study Insights
export { generateStudyInsights } from './ai-study-insights';
export type { StudyInsightsInput } from './ai-study-insights';
export type { StudyInsightsOutput } from './schemas';

// Study Planner
export { getStudyPlan } from './ai-study-planner';
export type { PlannerInput } from './ai-study-planner';
export type { AiStudyPlannerOutput } from './schemas';

// All Schema Outputs
export * from './schemas';