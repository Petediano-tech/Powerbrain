
'use server';
/**
 * @fileOverview A flow to fetch chat messages for a specific group.
 *
 * - fetchMessages - A function that handles fetching messages.
 * - FetchMessagesInput - The input type for the fetchMessages function.
 * - FetchMessagesOutput - The return type for the fetchMessages function.
 */

import { ai } from '@/ai';
import { getFirestore } from 'firebase-admin/firestore';
import { z } from 'genkit/zod';

const FetchMessagesInputSchema = z.object({
  groupId: z.string().describe('The ID of the chat group to fetch messages for.'),
});
export type FetchMessagesInput = z.infer<typeof FetchMessagesInputSchema>;

const MessageSchema = z.object({
    id: z.string(),
    text: z.string(),
    senderId: z.string(),
    senderName: z.string(),
    senderAvatarUrl: z.string().optional().nullable(),
    timestamp: z.string(), // Timestamps will be converted to ISO strings
});

const FetchMessagesOutputSchema = z.array(MessageSchema);
export type FetchMessagesOutput = z.infer<typeof FetchMessagesOutputSchema>;


export async function fetchMessages(input: FetchMessagesInput): Promise<FetchMessagesOutput> {
  return fetchMessagesFlow(input);
}


const fetchMessagesFlow = ai.defineFlow(
  {
    name: 'fetchMessagesFlow',
    inputSchema: FetchMessagesInputSchema,
    outputSchema: FetchMessagesOutputSchema,
  },
  async ({ groupId }) => {
    const firestore = getFirestore();
    const messagesRef = firestore.collection(`chatGroups/${groupId}/messages`).orderBy('timestamp', 'asc');
    const snapshot = await messagesRef.get();
    
    if (snapshot.empty) {
      return [];
    }

    const messages = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            text: data.text,
            senderId: data.senderId,
            senderName: data.senderName,
            senderAvatarUrl: data.senderAvatarUrl,
            // Convert Firestore Timestamp to ISO string for serialization
            timestamp: data.timestamp.toDate().toISOString(),
        }
    });
    
    return messages;
  }
);
