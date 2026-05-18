const GOOGLE_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

if (!GOOGLE_API_KEY && process.env.NODE_ENV === 'production') {
  throw new Error('GOOGLE_GENERATIVE_AI_API_KEY is not set');
}

export const env = { googleApiKey: GOOGLE_API_KEY || '' };