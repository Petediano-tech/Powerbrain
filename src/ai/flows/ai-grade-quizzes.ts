'use server';

/**
 * @fileOverview AI-powered quiz grading flow logic.
 */
import { z } from 'zod';
import { ai } from '@/ai/genkit';
import { AiGradeQuizzesOutputSchema, type AiGradeQuizzesOutput } from './schemas';

export const AiGradeQuizzesInputSchema = z.object({
  quizContent: z.string().describe('The content of the quiz, including questions and possible answers.'),
  studentAnswers: z.string().describe('The student answers to the quiz questions.'),
  teacherInstructions: z.string().optional().describe('Any specific instructions from the teacher regarding grading.'),
});
export type AiGradeQuizzesInput = z.infer<typeof AiGradeQuizzesInputSchema>;

export async function gradeQuiz(input: AiGradeQuizzesInput): Promise<AiGradeQuizzesOutput> {
    return await gradeQuizzesFlow(input);
}

const gradeQuizzesFlow = ai.defineFlow({ 
    name: 'aiGradeQuizzesFlow', 
    inputSchema: AiGradeQuizzesInputSchema, 
    outputSchema: AiGradeQuizzesOutputSchema 
}, async (input) => {
  const { output } = await ai.generate({
    prompt: `You are an AI grading assistant that automatically grades quizzes based on the provided content and student answers.

    Quiz Content:
    {{quizContent}}

    Student Answers:
    {{studentAnswers}}

    Teacher Instructions (if any):
    {{teacherInstructions}}

    Provide an overall grade and detailed feedback on the student's answers. The feedback should include specific corrections and explanations.

    Ensure that the grade and feedback are aligned with the quiz content and any teacher instructions provided.  Give the grade in the format A,B,C,D,E or F.
    Grade:
    Feedback: `,
    input,
    output: { schema: AiGradeQuizzesOutputSchema },
  });
  return output!;
});
