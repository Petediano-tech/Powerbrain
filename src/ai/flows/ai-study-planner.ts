'use server';
/**
 * @fileOverview AI-powered study plan generator.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { AiStudyPlannerOutputSchema, AiStudyPlannerOutput } from '@/ai/schemas';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuthenticatedUser } from '@/firebase/auth/get-authenticated-user';

const PlannerInputSchema = z.object({
  weakestSubjects: z.array(z.string()).describe("The student's weakest subjects, which need more focus."),
  upcomingExams: z.array(z.object({ subject: z.string(), date: z.string() })).describe("A list of upcoming exams and their dates."),
});

export async function aiStudyPlanner(input: z.infer<typeof PlannerInputSchema>): Promise<AiStudyPlannerOutput> {
  const user = await getAuthenticatedUser();
  if (!user) {
    throw new Error('Authentication required.');
  }

  const firestore = getFirestore();
  const profileRef = firestore.collection('userProfiles').doc(user.uid);
  const profileSnap = await profileRef.get();

  if (!profileSnap.exists) {
      throw new Error("User profile not found.");
  }
  
  const userProfile = profileSnap.data();
  if (!userProfile || userProfile.subscriptionTier === 'free') {
    throw new Error('This is a premium feature. Please upgrade to a VIP plan.');
  }
  
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
}
