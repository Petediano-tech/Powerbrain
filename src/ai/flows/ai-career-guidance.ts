'use server';

import { z } from 'zod';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuthenticatedUser } from '@/firebase/auth/get-authenticated-user';
import { ai } from '@/ai/genkit';
import { AiCareerGuidanceOutputSchema } from './schemas';

export const PerformanceDataSchema = z.object({
  strongestSubjects: z.array(z.string()).describe("The student's strongest subjects in school."),
  averageScore: z.number().describe('The student\'s average score across all subjects (0-100).'),
  interests: z.array(z.string()).describe("A list of the student's personal interests and hobbies."),
});
export type PerformanceData = z.infer<typeof PerformanceDataSchema>;

export async function getCareerGuidance(input: PerformanceData, idToken: string): Promise<AiCareerGuidanceOutput> {
    return await careerGuidanceFlow({input, idToken});
}

const careerGuidanceFlow = ai.defineFlow({ 
    name: 'careerGuidanceFlow', 
    inputSchema: z.object({
        input: PerformanceDataSchema,
        idToken: z.string(),
    }),
    outputSchema: AiCareerGuidanceOutputSchema 
}, async ({ input, idToken }) => {
    const user = await getAuthenticatedUser(idToken);
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

    const { output } = await ai.generate({
        prompt: `You are an AI career advisor for Malawian students. Based on the student's performance and interests, provide 2-3 tailored career recommendations, suggest specific degree/diploma programs at Malawian universities (e.g., University of Malawi, MUBAS, KUHeS, Mzuni), and give actionable next steps.

    Student's Strongest Subjects: {{{strongestSubjects}}}
    Student's Average Score: {{{averageScore}}}%
    Student's Interests: {{{interests}}}`,
        input,
        output: { schema: AiCareerGuidanceOutputSchema },
    });
    return output!;
});
