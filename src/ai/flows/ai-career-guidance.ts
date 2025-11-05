
/**
 * @fileOverview AI-powered career guidance flow logic.
 */
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

const careerGuidancePrompt = ai.definePrompt({
    name: 'aiCareerGuidancePrompt',
    input: {schema: PerformanceDataSchema},
    output: {schema: AiCareerGuidanceOutputSchema},
    prompt: `You are an AI career advisor for Malawian students. Based on the student's performance and interests, provide 2-3 tailored career recommendations, suggest specific degree/diploma programs at Malawian universities (e.g., University of Malawi, MUBAS, KUHeS, Mzuni), and give actionable next steps.

    Student's Strongest Subjects: {{{strongestSubjects}}}
    Student's Average Score: {{{averageScore}}}%
    Student's Interests: {{{interests}}}`,
});

const careerGuidanceFlow = ai.defineFlow({ 
    name: 'careerGuidanceFlow', 
    inputSchema: PerformanceDataSchema, 
    outputSchema: AiCareerGuidanceOutputSchema 
}, async (input) => {
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

    const { output } = await careerGuidancePrompt(input);
    return output!;
});

export async function getCareerGuidance(input: PerformanceData): Promise<AiCareerGuidanceOutput> {
    return await careerGuidanceFlow(input);
}
