/**
 * @fileOverview An AI tutor that can answer questions, summarize notes, or generate practice questions.
 */
'use server';
import { z } from 'zod';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuthenticatedUser } from '@/firebase/auth/get-authenticated-user';
import { format } from 'date-fns';
import { ai } from '../genkit';
import { AiSmartTutorOutput, AiSmartTutorOutputSchema } from './schemas';


export const AiSmartTutorInputSchema = z.object({
  query: z.string().describe('The question or request from the student.'),
  subject: z.string().optional().describe('The subject the student is asking about.'),
  gradeLevel: z.string().optional().describe('The grade level of the student (e.g., Std 7, Form 4).'),
});
export type AiSmartTutorInput = z.infer<typeof AiSmartTutorInputSchema>;


const FREE_TIER_DAILY_LIMIT = 5;

export async function smartTutorLogic(input: AiSmartTutorInput): Promise<AiSmartTutorOutput> {
  const user = await getAuthenticatedUser();
  if (!user) {
    return { response: "I'm sorry, but you must be logged in to chat with me. Please log in and try again." };
  }

  const firestore = getFirestore();
  const profileRef = firestore.collection('userProfiles').doc(user.uid);
  const profileSnap = await profileRef.get();

  if (!profileSnap.exists()) {
      return { response: "It seems I can't find your user profile. Please make sure your account is set up correctly." };
  }
  
  const userProfile = profileSnap.data();

  // If the user is on a paid plan, they have unlimited access.
  if (userProfile?.subscriptionTier && userProfile.subscriptionTier !== 'free') {
    const llmResponse = await ai.generate({
        prompt: `You are Brainy, a friendly and expert AI tutor for students in Malawi. Your goal is to help students understand concepts, practice problems, and learn effectively. Use simple, clear language.

        Grade Level: ${input.gradeLevel}
        Subject: ${input.subject}

        Student's question:
        "${input.query}"`,
        output: { schema: AiSmartTutorOutputSchema },
    });
    return llmResponse.output!;
  }
  
  // Logic for free-tier users
  const today = format(new Date(), 'yyyy-MM-dd');
  const lastChatDate = userProfile?.lastChatDate;
  let dailyChatCount = userProfile?.dailyChatCount || 0;

  if (lastChatDate !== today) {
    // If it's a new day, reset their chat count.
    dailyChatCount = 0;
  }

  if (dailyChatCount >= FREE_TIER_DAILY_LIMIT) {
    return { response: "You have reached your daily limit of free questions. Please upgrade to a VIP plan for unlimited access to Brainy AI Tutor." };
  }

  // Process the request and then update the count.
  const llmResponse = await ai.generate({
    prompt: `You are Brainy, a friendly and expert AI tutor for students in Malawi. Your goal is to help students understand concepts, practice problems, and learn effectively. Use simple, clear language.

    Grade Level: ${input.gradeLevel}
    Subject: ${input.subject}

    Student's question:
    "${input.query}"`,
    output: { schema: AiSmartTutorOutputSchema },
  });

  await profileRef.update({
    dailyChatCount: dailyChatCount + 1,
    lastChatDate: today,
  });

  return llmResponse.output!;
}
