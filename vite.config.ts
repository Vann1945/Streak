import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// NOTE: This app is 100% client-side (localStorage only) and has no server
// component, so it must never define or bundle any API keys/secrets. If a
// backend is added later, secrets must stay server-side and be proxied
// through an API route — never exposed via `define` or `import.meta.env`
// with a client-readable value.
// When deployed to GitHub Pages as a project site (https://user.github.io/repo/),
// assets must be served from /repo/ instead of /. Set BASE_PATH in CI to
// "/repo-name/"; it defaults to "/" for local dev, previews, and custom domains.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    cssMinify: true,
    sourcemap: false, // never ship source maps in production
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['motion'],
          icons: ['lucide-react'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
});
