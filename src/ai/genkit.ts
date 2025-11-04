
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
