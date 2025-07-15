// astro.config.mjs
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'server',      // enable serverless functions
  adapter: vercel(),     // must be this
  vite: {
    plugins: [tailwindcss()],
  },
});
