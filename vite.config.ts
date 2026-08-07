import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import type { OutputAsset } from 'rollup';

/**
 * Inlines the built CSS directly into index.html as a <style> tag instead
 * of a separate <link rel="stylesheet">, and removes that link. This
 * eliminates the CSS file as a render-blocking network request entirely
 * (Lighthouse's "Eliminate render-blocking resources" flag) rather than
 * just shrinking it — worthwhile here because the stylesheet is small
 * (~5KB gzipped) and the app has no other pages that would benefit from
 * caching it separately; every route is this one index.html.
 */
function inlineCssPlugin(): Plugin {
  return {
    name: 'inline-css-into-html',
    apply: 'build',
    enforce: 'post',
    generateBundle(_options, bundle) {
      const isAsset = (f: (typeof bundle)[string]): f is OutputAsset => f.type === 'asset';

      const htmlFile = Object.values(bundle).find((f) => isAsset(f) && f.fileName.endsWith('.html')) as
        | OutputAsset
        | undefined;
      if (!htmlFile) return;

      const cssFiles = Object.values(bundle).filter(
        (f) => isAsset(f) && f.fileName.endsWith('.css'),
      ) as OutputAsset[];
      if (cssFiles.length === 0) return;

      let html = htmlFile.source as string;

      for (const cssFile of cssFiles) {
        const linkRegex = new RegExp(
          `<link[^>]*href="[^"]*${cssFile.fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>`,
        );
        const cssSource = typeof cssFile.source === 'string' ? cssFile.source : Buffer.from(cssFile.source).toString('utf-8');
        html = html.replace(linkRegex, `<style>${cssSource}</style>`);
        // Drop the now-orphaned CSS asset from the bundle so it isn't
        // written to disk as an unused file alongside the inlined copy.
        delete bundle[cssFile.fileName];
      }

      htmlFile.source = html;
    },
  };
}

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
  plugins: [react(), tailwindcss(), inlineCssPlugin()],
  build: {
    target: 'es2020',
    cssMinify: true,
    sourcemap: false, // never ship source maps in production
    rollupOptions: {
      output: {
        // A single merged vendor chunk. Splitting react/react-dom, motion,
        // and lucide-react into three separate chunks previously created a
        // long critical-path request chain (index -> vendor -> motion ->
        // icons, ~948ms max latency per Lighthouse), because the browser
        // can only discover each chunk's URL after parsing the one before
        // it. Merging them removes two round trips from the critical path;
        // the combined chunk still caches independently from app code
        // (index-*.js) and only changes when a dependency version bumps.
        manualChunks: {
          vendor: ['react', 'react-dom', 'motion', 'lucide-react'],
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
