
import { z } from 'zod';
import { AiStudyInsightsOutputSchema, type StudyInsightsOutput } from './schemas';
import { ai } from '@/ai/genkit';


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

const studyInsightsFlow = ai.defineFlow({ 
    name: 'studyInsightsFlow', 
    inputSchema: StudyInsightsInputSchema, 
    outputSchema: AiStudyInsightsOutputSchema 
}, async (input) => {
  const { output } = await ai.generate({
    model: 'googleai/gemini-pro',
    prompt: `You are an AI study assistant that analyzes student data and provides personalized insights.

    Analyze the following data to provide the student with an overview of their performance, their strengths and weaknesses, and personalized recommendations for improvement.

    Study Streaks: {{studyStreaks}} days
    Total Time Studied: {{totalTimeStudied}} minutes
    Quizzes Completed: {{quizzesCompleted}}
    Topics Mastered: {{topicsMastered}}
    Performance in Math: {{performanceInMath}}%
    Performance in English: {{performanceInEnglish}}%
    Performance in Science: {{performanceInScience}}%
    Performance in History: {{performanceInHistory}}%
    Performance in Chichewa: {{performanceInChichewa}}%
    Recent Math Scores: {{#each recentMathScores}}{{.}}, {{/each}}
    Recent English Scores: {{#each recentEnglishScores}}{{.}}, {{/each}}
    Favourite Subject: {{favouriteSubject}}

    Provide the analysis in the following format:

    Overall Performance: [Overall assessment of the student's performance]
    Strengths: [Specific strengths of the student]
    Weaknesses: [Specific weaknesses of the student]
    Recommendations: [Personalized recommendations for the student]`,
    output: { schema: AiStudyInsightsOutputSchema },
  });
  return output!;
});

export async function generateStudyInsights(input: StudyInsightsInput): Promise<StudyInsightsOutput> {
    return studyInsightsFlow(input);
}
