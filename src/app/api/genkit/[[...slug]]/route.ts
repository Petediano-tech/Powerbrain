
import {createApi} from '@genkit-ai/next';
import { configureGenkit } from '@/ai/genkit';
import '@/ai/dev';

configureGenkit();

export const {POST} = createApi();
