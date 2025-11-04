
'use server';
import {genkit, type GenkitErrorCode, type GenkitError} from 'genkit';
import {googleAI, type GoogleAIBadRequestError} from '@genkit-ai/google-genai';

function isGoogleAIBadRequestError(
  err: GenkitError | GoogleAIBadRequestError
): err is GoogleAIBadRequestError {
  return err.name === 'GoogleAIBadRequestError';
}

function getGoogleAIBadRequestError(err: GenkitError): string {
  if (isGoogleAIBadRequestError(err)) {
    return `Google AI Error: ${err.message}`;
  }
  return err.message;
}

export function configureGenkit() {
    genkit({
        plugins: [
            googleAI({
                apiVersion: 'v1beta',
            }),
        ],
        logLevel: 'debug',
        enableTracingAndMetrics: true,
        flow: {
            errorHandler: <T, S, O>(
            err: GenkitError,
            flowName: string,
            stream?: any
            ) => {
            const code: GenkitErrorCode = err.status as GenkitErrorCode;
            return {
                code,
                message: getGoogleAIBadRequestError(err),
            };
            },
        },
    });
}
