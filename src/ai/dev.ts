
// Only needed for local development.
import {config} from 'dotenv';
config();

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

genkit({
  plugins: [
    googleAI({
      apiVersion: 'v1beta',
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});


import '@/ai/flows/ai-study-insights.ts';
import '@/ai/flows/ai-grade-quizzes.ts';
import '@/ai/flows/ai-smart-tutor.ts';
import '@/ai/flows/ai-career-guidance.ts';
import '@/ai/flows/ai-study-planner.ts';
import '@/ai/flows/ai-quiz-generator.ts';
