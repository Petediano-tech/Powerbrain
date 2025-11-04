
// Only needed for local development.
import {config} from 'dotenv';
config();

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuthenticatedUser } from '@/firebase/auth/get-authenticated-user';
import { format } from 'date-fns';

// Schemas
import { AiStudyPlannerOutputSchema, AiCareerGuidanceOutputSchema } from '@/ai/schemas';

// AI Study Insights
import { StudyInsightsInputSchema, StudyInsightsOutputSchema, getStudyInsights as getStudyInsightsLogic } from '@/ai/flows/ai-study-insights';
ai.defineFlow({ name: 'studyInsightsFlow', inputSchema: StudyInsightsInputSchema, outputSchema: StudyInsightsOutputSchema }, getStudyInsightsLogic);

// AI Grade Quizzes
import { AiGradeQuizzesInputSchema, AiGradeQuizzesOutputSchema, aiGradeQuizzes as aiGradeQuizzesLogic } from '@/ai/flows/ai-grade-quizzes';
const gradeQuizPrompt = ai.definePrompt({
    name: 'aiGradeQuizzesPrompt',
    input: {schema: AiGradeQuizzesInputSchema},
    output: {schema: AiGradeQuizzesOutputSchema},
    prompt: `You are an AI grading assistant that automatically grades quizzes based on the provided content and student answers.

    Quiz Content:
    {{quizContent}}

    Student Answers:
    {{studentAnswers}}

    Teacher Instructions (if any):
    {{teacherInstructions}}

    Provide an overall grade and detailed feedback on the student's answers. The feedback should include specific corrections and explanations.

    Ensure that the grade and feedback are aligned with the quiz content and any teacher instructions provided.  Give the grade in the format A,B,C,D,E or F.
    Grade:
    Feedback: `,
});
ai.defineFlow({ name: 'aiGradeQuizzesFlow', inputSchema: AiGradeQuizzesInputSchema, outputSchema: AiGradeQuizzesOutputSchema }, async (input) => {
    const {output} = await gradeQuizPrompt(input);
    return output!;
});


// AI Smart Tutor
import { AiSmartTutorInputSchema, AiSmartTutorOutputSchema } from '@/ai/flows/ai-smart-tutor';
const smartTutorPrompt = ai.definePrompt({
    name: 'aiSmartTutorPrompt',
    input: {schema: AiSmartTutorInputSchema},
    output: {schema: AiSmartTutorOutputSchema},
    prompt: `You are Brainy, a friendly and expert AI tutor for students in Malawi. Your goal is to help students understand concepts, practice problems, and learn effectively. Use simple, clear language.

    Grade Level: {{gradeLevel}}
    Subject: {{subject}}

    Student's question:
    "{{query}}"`,
});
ai.defineFlow({ name: 'aiSmartTutorFlow', inputSchema: AiSmartTutorInputSchema, outputSchema: AiSmartTutorOutputSchema }, async (input) => {
    const {output} = await smartTutorPrompt(input);
    return output!;
});


// AI Career Guidance
import { PerformanceDataSchema, aiCareerGuidance as aiCareerGuidanceLogic } from '@/ai/flows/ai-career-guidance';
const careerGuidancePrompt = ai.definePrompt({
    name: 'aiCareerGuidancePrompt',
    input: {schema: PerformanceDataSchema},
    output: {schema: AiCareerGuidanceOutputSchema},
    prompt: `You are an AI career advisor for Malawian students. Based on the student's performance and interests, provide 2-3 tailored career recommendations, suggest specific degree/diploma programs at Malawian universities (e.g., University of Malawi, MUBAS, KUHeS, Mzuni), and give actionable next steps.

    Student's Strongest Subjects: {{{strongestSubjects}}}
    Student's Average Score: {{{averageScore}}}%
    Student's Interests: {{{interests}}}`,
});
ai.defineFlow({ name: 'aiCareerGuidanceFlow', inputSchema: PerformanceDataSchema, outputSchema: AiCareerGuidanceOutputSchema }, async (input) => {
    const {output} = await careerGuidancePrompt(input);
    return output!;
});


// AI Study Planner
import { PlannerInputSchema, aiStudyPlanner as aiStudyPlannerLogic } from '@/ai/flows/ai-study-planner';
const studyPlannerPrompt = ai.definePrompt({
    name: 'aiStudyPlannerPrompt',
    input: {schema: PlannerInputSchema},
    output: {schema: AiStudyPlannerOutputSchema},
    prompt: `You are an AI study planner. Create a personalized 7-day study schedule for a student. The plan should prioritize their weakest subjects and prepare them for upcoming exams. Include a short, actionable study tip for each day.

    Weakest Subjects: {{{weakestSubjects}}}
    Upcoming Exams: {{#each upcomingExams}}{{subject}} on {{date}}{{/each}}`,
});
ai.defineFlow({ name: 'aiStudyPlannerFlow', inputSchema: PlannerInputSchema, outputSchema: AiStudyPlannerOutputSchema }, async (input) => {
    const {output} = await studyPlannerPrompt(input);
    return output!;
});


// AI Quiz Generator
import { QuizGeneratorInputSchema, AiQuizGeneratorOutputSchema, aiQuizGenerator as aiQuizGeneratorLogic } from '@/ai/flows/ai-quiz-generator';
const quizGeneratorPrompt = ai.definePrompt({
    name: 'aiQuizGeneratorPrompt',
    input: {schema: QuizGeneratorInputSchema},
    output: {schema: AiQuizGeneratorOutputSchema},
    prompt: `You are an AI assistant for teachers in Malawi. Generate a multiple-choice quiz with a specified number of questions on a given topic and for a specific grade level. Each question should have 4 options, a correct answer, and a brief explanation.

    Subject: {{{subject}}}
    Topic: {{{topic}}}
    Number of Questions: {{{numberOfQuestions}}}
    Grade Level: {{{gradeLevel}}}`,
});
ai.defineFlow({ name: 'aiQuizGeneratorFlow', inputSchema: QuizGeneratorInputSchema, outputSchema: AiQuizGeneratorOutputSchema }, async (input) => {
    const {output} = await quizGeneratorPrompt(input);
    return output!;
});

export {
    aiStudyPlannerLogic,
    aiCareerGuidanceLogic,
    aiGradeQuizzesLogic,
    aiQuizGeneratorLogic,
    getStudyInsightsLogic
};
// This export is needed to avoid a build error, but the 'aiSmartTutor'
// function is the one that should be used in the application.
export { aiSmartTutor as aiSmartTutorLogic } from '@/ai/flows/ai-smart-tutor';
