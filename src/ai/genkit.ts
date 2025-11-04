'use client';
import {genkit, type GenkitErrorCode, type GenkitError} from 'genkit';
import {googleAI, type GoogleAIBadRequestError} from '@genkit-ai/google-genai';
import {NextRequest} from 'next/server';

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

export const ai = genkit({
  plugins: [
    googleAI({
      apiVersion: 'v1beta',
      // Pass the API key from the Authorization header.
      apiKey: async (request?: Request) => {
        const req = request as NextRequest;
        if (req) {
          const authHeader = req.headers.get('Authorization');
          if (authHeader) {
            const [type, token] = authHeader.split(' ');
            if (type === 'Bearer') {
              return token;
            }
          }
        }
        return process.env.GEMINI_API_KEY;
      },
    }),
  ],
  model: 'googleai/gemini-2.5-flash',
  telemetry: {
    instrumentation: {
      reports: [
        {
          reporter: 'log',
          config: {
            // Log all errors.
            filter: {
              minLevel: 'ERROR',
            },
          },
        },
      ],
    },
  },
  flow: {
    // When an error occurs, it will be returned to the user in a JSON-RPC 2.0
    // error format.
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
