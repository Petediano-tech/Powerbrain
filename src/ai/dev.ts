
// Only needed for local development.
import {config} from 'dotenv';
config();

import '@/ai/genkit';
import '@/ai/flows/ai-study-insights.ts';
import '@/ai/flows/ai-grade-quizzes.ts';
import '@/ai/flows/ai-smart-tutor.ts';
import '@/ai/flows/ai-career-guidance.ts';
import '@/ai/flows/ai-study-planner.ts';
import '@/ai/flows/ai-quiz-generator.ts';
