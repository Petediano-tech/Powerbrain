import {genkit, type GenkitPrompt} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

// This is the only place the `ai` object is initialized.
export const ai = genkit({
  plugins: [
    googleAI(),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
