/* eslint-disable @typescript-eslint/no-explicit-any */
import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { Message } from '@/types/chat';

export const maxDuration = 30;
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  try {
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = await req.json();
    const messages = body?.messages;

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Invalid request' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const result: any = await streamText({
      model: google('gemini-2.5-flash-preview-05-20') as any,
      messages: messages.map((m: Message) => ({
        role: m.role,
        content: m.content,
      })),
    });

    return (result as any).toDataStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: 'AI service unavailable' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }
}