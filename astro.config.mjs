import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/functions'; // or /edge for Edge Functions
import tailwind from '@tailwindcss/vite';

export default defineConfig({
  output: 'server',      // ensures SSR mode
  adapter: vercel(),     // use the Vercel Functions adapter
  vite: {
    plugins: [tailwind()],
  },
});
