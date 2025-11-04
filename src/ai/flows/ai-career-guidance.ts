'use server';
/**
 * @fileOverview AI-powered career guidance flow.
 */

import { ai } from 'genkit/ai';
import { z } from 'genkit/zod';
import { AiCareerGuidanceOutputSchema, AiCareerGuidanceOutput } from '@/ai/schemas';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuthenticatedUser } from '@/firebase/auth/get-authenticated-user';

const PerformanceDataSchema = z.object({
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
}
