import { z } from 'zod';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuthenticatedUser } from '@/firebase/auth/get-authenticated-user';
import { ai } from '@/ai/genkit';
import { AiStudyPlannerOutputSchema, type AiStudyPlannerOutput } from './schemas';

export const PlannerInputSchema = z.object({
  weakestSubjects: z.array(z.string()).describe("The student's weakest subjects, which need more focus."),
  upcomingExams: z.array(z.object({ subject: z.string(), date: z.string() })).describe("A list of upcoming exams and their dates."),
});
export type PlannerInput = z.infer<typeof PlannerInputSchema>;

const prompt = ai.definePrompt({
    name: 'aiStudyPlannerPrompt',
    input: { schema: PlannerInputSchema },
    output: { schema: AiStudyPlannerOutputSchema },
    prompt: `You are an AI study planner. Create a personalized 7-day study schedule for a student. The plan should prioritize their weakest subjects and prepare them for upcoming exams. Include a short, actionable study tip for each day.

    Weakest Subjects: {{#each weakestSubjects}}{{.}}, {{/each}}
    Upcoming Exams: {{#each upcomingExams}}{{subject}} on {{date}}{{/each}}`,
});

const studyPlannerFlow = ai.defineFlow({ 
    name: 'aiStudyPlannerFlow', 
    inputSchema: PlannerInputSchema,
    outputSchema: AiStudyPlannerOutputSchema 
}, async (input, streamingCallback, context) => {
    // Auth check must be inside the flow
    const idToken = context.auth?.idToken;
    if (!idToken) {
         throw new Error('Authentication required.');
    }
    const user = await getAuthenticatedUser(idToken);
    if (!user) {
        throw new Error('Authentication failed.');
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
    
    const { output } = await prompt(input);
    return output!;
});

export async function getStudyPlan(input: PlannerInput, context: any): Promise<AiStudyPlannerOutput> {
    return studyPlannerFlow(input, context);
}
