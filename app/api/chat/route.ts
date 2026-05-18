/* eslint-disable @typescript-eslint/no-explicit-any */
import { Message } from '@/types/chat';

export const maxDuration = 30;
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const { env } = await import('@/lib/env');
  
  try {
    if (!env.googleApiKey) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), { status: 500 });
    }

    const { messages } = await req.json() as { messages: Message[] };
    if (!messages) {
      return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
    }

    const { streamText, google } = await import('ai').then(async (ai) => {
      const googleSdk = await import('@ai-sdk/google');
      return { streamText: ai.streamText, google: googleSdk.google };
    });
    
    const result: any = await streamText({
      model: google('gemini-2.5-flash-preview-05-20') as any,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });

    return (result as any).toDataStreamResponse();
  } catch (error) {
    return new Response(JSON.stringify({ error: 'AI service unavailable' }), { status: 503 });
  }
}