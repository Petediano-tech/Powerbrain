
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
ai.defineFlow({ name: 'studyInsightsFlow', inputSchema: StudyInsightsInputSchema, outputSchema: StudyInsightsOutputSchema }, async (input) => {
    const studyInsightsPrompt = ai.definePrompt({
        name: 'studyInsightsPrompt',
        input: {schema: StudyInsightsInputSchema},
        output: {schema: StudyInsightsOutputSchema},
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
    const {output} = await studyInsightsPrompt(input);
    return output!;
});


// AI Grade Quizzes
import { AiGradeQuizzesInputSchema, AiGradeQuizzesOutputSchema, aiGradeQuizzes as aiGradeQuizzesLogic } from '@/ai/flows/ai-grade-quizzes';
ai.defineFlow({ name: 'aiGradeQuizzesFlow', inputSchema: AiGradeQuizzesInputSchema, outputSchema: AiGradeQuizzesOutputSchema }, async (input) => {
  const prompt = ai.definePrompt({
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

  const {output} = await prompt(input);
  return output!;
});

// AI Smart Tutor
import { AiSmartTutorInputSchema, AiSmartTutorOutputSchema } from '@/ai/flows/ai-smart-tutor';
ai.defineFlow({ name: 'aiSmartTutorFlow', inputSchema: AiSmartTutorInputSchema, outputSchema: AiSmartTutorOutputSchema }, async (input) => {
    const prompt = ai.definePrompt({
        name: 'aiSmartTutorPrompt',
        input: {schema: AiSmartTutorInputSchema},
        output: {schema: AiSmartTutorOutputSchema},
        system: `You are a professional AI tutor named Brainy, built by a Malawian developer, Peter Damiano.

Your sole purpose is to help secondary school students and teachers in Malawi with education-related questions.

All of your answers MUST strictly align with the Malawian school curriculum.

Your tone must be professional, direct, and highly accurate, as if you are preparing a student for a Malawian examination they must pass. Do not provide any extra, useless text or conversational fluff. Focus on delivering correct, curriculum-based information.`,
        prompt: `A student in grade {{gradeLevel}} is asking about {{subject}}.

Student's question: {{{query}}}`,
    });

    const {output} = await prompt(input);
    return output!;
});

// AI Career Guidance
import { PerformanceDataSchema, aiCareerGuidance as aiCareerGuidanceLogic } from '@/ai/flows/ai-career-guidance';
ai.defineFlow({ name: 'aiCareerGuidanceFlow', inputSchema: PerformanceDataSchema, outputSchema: AiCareerGuidanceOutputSchema }, async (input) => {
    const prompt = ai.definePrompt({
        name: 'aiCareerGuidancePrompt',
        input: { schema: PerformanceDataSchema },
        output: { schema: AiCareerGuidanceOutputSchema },
        system: `You are an expert career guidance counselor for Malawian secondary school students. Your sole purpose is to provide realistic, encouraging, and actionable advice based on the student's academic performance and interests.

    Your recommendations MUST be tailored to the Malawian context. This means:
    - Recommending careers that are viable and in demand in Malawi.
    - Suggesting courses at real, well-known Malawian universities and colleges (e.g., University of Malawi (UNIMA), Malawi University of Business and Applied Sciences (MUBAS), Kamuzu University of Health Sciences (KUHeS), Mzuzu University (Mzuni), Lilongwe University of Agriculture and Natural Resources (LUANAR)).
    - The next steps should be practical for a student in Malawi.`,
        prompt: `A student has provided the following information:
    - Strongest Subjects: {{strongestSubjects}}
    - Average Score: {{averageScore}}%
    - Personal Interests: {{interests}}

    Based on this, please generate a report with career recommendations, specific university course suggestions available in Malawi, and actionable next steps.`,
  });
  const { output } = await prompt(input);
  return output!;
});


// AI Study Planner
import { PlannerInputSchema, aiStudyPlanner as aiStudyPlannerLogic } from '@/ai/flows/ai-study-planner';
ai.defineFlow({ name: 'aiStudyPlannerFlow', inputSchema: PlannerInputSchema, outputSchema: AiStudyPlannerOutputSchema }, async (input) => {
    const prompt = ai.definePrompt({
        name: 'aiStudyPlannerPrompt',
        input: { schema: PlannerInputSchema },
        output: { schema: AiStudyPlannerOutputSchema },
        system: `You are an expert academic advisor for Malawian secondary school students. Your goal is to create a realistic and effective weekly study plan.

    The plan should:
    - Prioritize the student's weakest subjects.
    - Incorporate preparation for upcoming exams.
    - Be balanced, with a mix of subjects each day and recommendations for breaks.
    - Include one unique, actionable study tip for each day.
    - The tone should be encouraging and motivational.`,
        prompt: `A student needs a study plan. Here is their information:
    - Weakest Subjects to focus on: {{weakestSubjects}}
    - Upcoming Exams: {{#each upcomingExams}}{{subject}} ({{date}}){{/each}}

    Please generate a balanced 7-day study schedule starting from Monday. For each day, provide a clear plan and a helpful study tip.`,
  });

  const { output } = await prompt(input);
  return output!;
});

// AI Quiz Generator
import { QuizGeneratorInputSchema, AiQuizGeneratorOutputSchema, aiQuizGenerator as aiQuizGeneratorLogic } from '@/ai/flows/ai-quiz-generator';
ai.defineFlow({ name: 'aiQuizGeneratorFlow', inputSchema: QuizGeneratorInputSchema, outputSchema: AiQuizGeneratorOutputSchema }, async (input) => {
    const prompt = ai.definePrompt({
        name: 'aiQuizGeneratorPrompt',
        input: { schema: QuizGeneratorInputSchema },
        output: { schema: AiQuizGeneratorOutputSchema },
        system: `You are an expert curriculum designer for the Malawian education system. Your task is to create high-quality multiple-choice quizzes for teachers.

    All questions must:
    - Be directly relevant to the specified subject and topic.
    - Be appropriate for the specified grade level in Malawi.
    - Have exactly 4 plausible options.
    - Include a clear correct answer and a concise explanation.`,
        prompt: `Generate a quiz with {{numberOfQuestions}} multiple-choice questions for a {{gradeLevel}} class.

    Subject: {{subject}}
    Topic: {{topic}}
    
    For each question, provide the question text, 4 options, the correct answer, and an explanation.`,
    });

    const { output } = await prompt(input);
    return output!;
});

export {
    aiStudyPlannerLogic,
    aiCareerGuidanceLogic,
    aiGradeQuizzesLogic,
    aiQuizGeneratorLogic,
    getStudyInsightsLogic
};
