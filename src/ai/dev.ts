
// Only needed for local development.
import {config} from 'dotenv';
config();

import { ai } from '@/ai/genkit';
import { z } from 'zod';

// AI Study Insights
import { StudyInsightsInputSchema, getStudyInsights } from '@/ai/flows/ai-study-insights';
import { AiStudyInsightsOutputSchema } from './flows/schemas';
const studyInsightsPrompt = ai.definePrompt({
    name: 'studyInsightsPrompt',
    input: {schema: StudyInsightsInputSchema},
    output: {schema: AiStudyInsightsOutputSchema},
    prompt: `You are an AI study assistant that analyzes student data and provides personalized insights.

    Analyze the following data to provide the student with an overview of their performance, their strengths and weaknesses, and personalized recommendations for improvement.

    Study Streaks: {{{studyStreaks}}} days
    Total Time Studied: {{{totalTimeStudied}}} minutes
    Quizzes Completed: {{{quizzesCompleted}}}
    Topics Mastered: {{{topicsMastered}}}
    Performance in Math: {{{performanceInMath}}}%
    Performance in English: {{{performanceInEnglish}}}%
    Performance in Science: {{{performanceInScience}}}%
    Performance in History: {{{performanceInHistory}}}%
    Performance in Chichewa: {{{performanceInChichewa}}}%
    Recent Math Scores: {{{recentMathScores}}}
    Recent English Scores: {{{recentEnglishScores}}}
    Favourite Subject: {{{favouriteSubject}}}

    Provide the analysis in the following format:

    Overall Performance: [Overall assessment of the student\u0027s performance]
    Strengths: [Specific strengths of the student]
    Weaknesses: [Specific weaknesses of the student]
    Recommendations: [Personalized recommendations for the student]`,
});
ai.defineFlow({ name: 'studyInsightsFlow', inputSchema: StudyInsightsInputSchema, outputSchema: AiStudyInsightsOutputSchema }, async (input) => {
    const {output} = await studyInsightsPrompt(input);
    return output!;
});


// AI Grade Quizzes
import { AiGradeQuizzesInputSchema, aiGradeQuizzes } from '@/ai/flows/ai-grade-quizzes';
import { AiGradeQuizzesOutputSchema } from './flows/schemas';
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
import { AiSmartTutorInputSchema, aiSmartTutor } from '@/ai/flows/ai-smart-tutor';
import { AiSmartTutorOutputSchema } from './flows/schemas';
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
import { PerformanceDataSchema, aiCareerGuidance } from '@/ai/flows/ai-career-guidance';
import { AiCareerGuidanceOutputSchema } from './flows/schemas';
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
import { PlannerInputSchema, aiStudyPlanner } from '@/ai/flows/ai-study-planner';
import { AiStudyPlannerOutputSchema } from './flows/schemas';
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
import { QuizGeneratorInputSchema, aiQuizGenerator } from '@/ai/flows/ai-quiz-generator';
import { AiQuizGeneratorOutputSchema } from './flows/schemas';
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
    aiCareerGuidance, 
    aiGradeQuizzes, 
    aiQuizGenerator, 
    aiSmartTutor, 
    aiStudyPlanner, 
    getStudyInsights 
};
