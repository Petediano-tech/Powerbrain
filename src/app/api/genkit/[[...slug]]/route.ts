
import { ai } from '@/ai';
import { GENKIT_CLIENT_HEADER } from '@genkit-ai/next/lib/constants';
import { NextRequest, NextResponse } from 'next/server';

const GENKIT_DEV_CLIENT_HOST = 'http://127.0.0.1:3100';

async function handler(req: NextRequest) {
  if (process.env.NODE_ENV === 'development') {
    const reqHeaders = new Headers(req.headers);
    reqHeaders.set(GENKIT_CLIENT_HEADER, 'genkit-dev-webapp');
    const url = new URL(req.url);
    const proxyUrl = new URL(url.pathname + url.search, GENKIT_DEV_CLIENT_HOST);

    const proxyRes = await fetch(proxyUrl.toString(), {
      method: req.method,
      headers: reqHeaders,
      body: req.body,
      // @ts-ignore
      duplex: 'half',
    });
    return new NextResponse(proxyRes.body, {
      status: proxyRes.status,
      headers: proxyRes.headers,
    });
  } else {
    // In production, you can directly use the Genkit 'ai' object.
    const { handleRequest } = await import('@/ai/prod');
    return handleRequest(req);
  }
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const OPTIONS = handler;
