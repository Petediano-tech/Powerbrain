'use server';
/**
 * @fileOverview AI-powered career guidance flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { AiCareerGuidanceOutput, AiCareerGuidanceOutputSchema } from '@/ai/schemas';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuthenticatedUser } from '@/firebase/auth/get-authenticated-user';
import { runFlow } from 'genkit/flow';

export const PerformanceDataSchema = z.object({
  strongestSubjects: z.array(z.string()).describe("The student's strongest subjects in school."),
  averageScore: z.number().describe('The student\'s average score across all subjects (0-100).'),
  interests: z.array(z.string()).describe("A list of the student's personal interests and hobbies."),
});


export async function aiCareerGuidance(input: z.infer<typeof PerformanceDataSchema>): Promise<AiCareerGuidanceOutput> {
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

  return await runFlow(ai.flow('aiCareerGuidanceFlow'), input);
}
