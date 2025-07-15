// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel/serverless'; // for SSR on Vercel

export default defineConfig({
  output: 'server',        // enable server‑side routes
  adapter: vercel(),       // use the v8.x serverless adapter
  vite: {
    plugins: [tailwindcss()],
  },
});
