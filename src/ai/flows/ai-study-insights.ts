'use server';
/**
 * @fileOverview An AI agent that provides study insights based on student data.
 *
 * - getStudyInsights - A function that analyzes study data and returns AI-generated insights.
 * - StudyInsightsInput - The input type for the getStudyInsights function.
 * - StudyInsightsOutput - The return type for the getStudyInsights function.
 */

import { z } from 'zod';
import { runFlow } from 'genkit/flow';
import { StudyInsightsOutput } from './schemas';


export const StudyInsightsInputSchema = z.object({
  studyStreaks: z.number().describe('Number of consecutive days the student has studied.'),
  totalTimeStudied: z.number().describe('Total time in minutes the student has studied.'),
  quizzesCompleted: z.number().describe('Total number of quizzes the student has completed.'),
  topicsMastered: z.number().describe('Total number of topics the student has mastered.'),
  performanceInMath: z.number().describe('Student performance in Mathematics (0-100).'),
  performanceInEnglish: z.number().describe('Student performance in English (0-100).'),
  performanceInScience: z.number().describe('Student performance in Science (0-100).'),
  performanceInHistory: z.number().describe('Student performance in History (0-100).'),
  performanceInChichewa: z.number().describe('Student performance in Chichewa (0-100).'),
  recentMathScores: z.array(z.number()).describe('Array of recent Math quiz scores (0-100).'),
  recentEnglishScores: z.array(z.number()).describe('Array of recent English quiz scores (0-100).'),
  favouriteSubject: z.string().describe('Student\'s favorite subject'),
});
export type StudyInsightsInput = z.infer<typeof StudyInsightsInputSchema>;

export async function getStudyInsights(input: StudyInsightsInput): Promise<StudyInsightsOutput> {
  const flowOutput = await runFlow('studyInsightsFlow', input);
  return flowOutput;
}
