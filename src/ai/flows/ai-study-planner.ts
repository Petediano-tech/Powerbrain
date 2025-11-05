
import { z } from 'zod';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuthenticatedUser } from '@/firebase/auth/get-authenticated-user';
import { ai } from '@/ai/genkit';
import { AiStudyPlannerOutputSchema } from './schemas';

export const PlannerInputSchema = z.object({
  weakestSubjects: z.array(z.string()).describe("The student's weakest subjects, which need more focus."),
  upcomingExams: z.array(z.object({ subject: z.string(), date: z.string() })).describe("A list of upcoming exams and their dates."),
});
export type PlannerInput = z.infer<typeof PlannerInputSchema>;

const aiStudyPlannerPrompt = ai.definePrompt({
    name: 'aiStudyPlannerPrompt',
    input: {schema: PlannerInputSchema},
    output: {schema: AiStudyPlannerOutputSchema},
    prompt: `You are an AI study planner. Create a personalized 7-day study schedule for a student. The plan should prioritize their weakest subjects and prepare them for upcoming exams. Include a short, actionable study tip for each day.

    Weakest Subjects: {{{weakestSubjects}}}
    Upcoming Exams: {{#each upcomingExams}}{{subject}} on {{date}}{{/each}}`,
});

const studyPlannerFlow = ai.defineFlow({ 
    name: 'aiStudyPlannerFlow', 
    inputSchema: PlannerInputSchema, 
    outputSchema: AiStudyPlannerOutputSchema 
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
    
    const { output } = await aiStudyPlannerPrompt(input);
    return output!;
});

export async function getStudyPlan(input: PlannerInput): Promise<AiStudyPlannerOutput> {
    return await studyPlannerFlow(input);
}
