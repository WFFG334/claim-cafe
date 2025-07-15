// src/pages/api/submit.ts
import { appendFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataFile = join(__dirname, '../../submissions.json');

export async function HEAD() {
  return new Response(null, { status: 405 });
}
export async function GET() {
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
  const entry = { name, email, question, date: new Date().toISOString() };
  try {
    await appendFile(dataFile, JSON.stringify(entry) + '\n');
  } catch (err) {
    console.error(err);
    return new Response('Internal Server Error', { status: 500 });
  }
  return new Response(null, {
    status: 303,
    headers: { Location: '/thank-you' },
  });
}
