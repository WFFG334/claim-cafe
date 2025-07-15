// src/pages/api/submit.ts
import { appendFile } from 'fs/promises';

const dataFile = '/tmp/submissions.json';

export async function HEAD() {
  // Route exists, but only POST is allowed
  return new Response(null, { status: 405 });
}

export async function GET() {
  // Route exists, but only POST is allowed
  return new Response(null, { status: 405 });
}

export async function POST({ request }: { request: Request }) {
  const form = await request.formData();
  const name     = form.get('name')?.toString()     || '';
  const email    = form.get('email')?.toString()    || '';
  const question = form.get('question')?.toString() || '';

  if (!email || !question) {
    return new Response('Email and vraag zijn verplicht', { status: 400 });
  }

  const entry = {
    name,
    email,
    question,
    date: new Date().toISOString(),
  };

  try {
    // Write into the Lambda's ephemeral /tmp folder
    await appendFile(dataFile, JSON.stringify(entry) + '\n');
  } catch (err) {
    console.error('Could not write to /tmp:', err);
    // Swallow error so we still redirect
  }

  // Always redirect back to the thank-you page
  return new Response(null, {
    status: 303,
    headers: { Location: '/thank-you' },
  });
}
