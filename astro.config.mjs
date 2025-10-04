// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwindcss from "@tailwindcss/vite";
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  devToolbar: {
    enabled: false
  },

  vite: {
    plugins: [tailwindcss()],
  },

  output: 'server',
  adapter: node({ mode: 'standalone' }),
});