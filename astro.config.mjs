// astro.config.mjs
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';          // ← MUST be this
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'server',                           // enable serverless functions
  adapter: vercel(),                          // use the Vercel adapter
  vite: { plugins: [tailwindcss()] },
});
