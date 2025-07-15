import type { APIRoute } from 'astro';
import { appendFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Compute a path in your output folder for storing submissions
const __dirname = dirname(fileURLToPath(import.meta.url));
const dataFile = join(__dirname, '../../submissions.json');

export const post: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const entry = {
    name: form.get('name')?.toString() || '',
    email: form.get('email')!.toString(),
    question: form.get('question')!.toString(),
    date: new Date().toISOString(),
  };

  // Append to a JSON‑lines file
  await appendFile(dataFile, JSON.stringify(entry) + '\n');

  return new Response(null, {
    status: 303,
    headers: { Location: '/thank-you' }, // you can create a thank-you page
  });
};
