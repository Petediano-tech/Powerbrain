
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

// This is the only place the `ai` object is initialized.
// It is NOT exported, to prevent illegal imports in Server Actions.
const ai = genkit({
  plugins: [
    googleAI({
      apiVersion: 'v1beta',
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

// Instead of exporting the object, we export a function to get it.
// This helps control its usage context.
export function getGenkitAi() {
    return ai;
}
