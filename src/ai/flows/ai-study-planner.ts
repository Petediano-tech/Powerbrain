'use server';
/**
 * @fileOverview AI-powered study plan generator.
 */

import { z } from 'zod';
import { AiStudyPlannerOutput } from './schemas';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuthenticatedUser } from '@/firebase/auth/get-authenticated-user';
import { runFlow } from 'genkit/flow';

export const PlannerInputSchema = z.object({
  weakestSubjects: z.array(z.string()).describe("The student's weakest subjects, which need more focus."),
  upcomingExams: z.array(z.object({ subject: z.string(), date: z.string() })).describe("A list of upcoming exams and their dates."),
});
export type PlannerInput = z.infer<typeof PlannerInputSchema>;

export async function aiStudyPlanner(input: PlannerInput): Promise<AiStudyPlannerOutput> {
  const user = await getAuthenticatedUser();
  if (!user) {
    throw new Error('Authentication required.');
  }

  const firestore = getFirestore();
  const profileRef = firestore.collection('userProfiles').doc(user.uid);
  const profileSnap = await profileRef.get();

  if (!profileSnap.exists()) {
      throw new Error("User profile not found.");
  }
  
  const userProfile = profileSnap.data();
  if (!userProfile || userProfile.subscriptionTier === 'free') {
    throw new Error('This is a premium feature. Please upgrade to a VIP plan.');
  }
  
  const flowOutput = await runFlow('aiStudyPlannerFlow', input);
  return flowOutput;
}
