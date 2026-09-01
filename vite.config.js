import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * The site is deployed to two hosts that serve it from different paths:
 *
 *   GitHub Pages  →  /Figma_Style_Portfolio/  (project sites live on a subpath)
 *   Vercel        →  /                        (served at the domain root)
 *
 * A hardcoded `base` therefore breaks one of them: the built HTML requests
 * /Figma_Style_Portfolio/assets/… which does not exist on Vercel. Vercel still
 * reports the deploy green, because the *build* succeeded — it cannot know the
 * runtime paths are wrong.
 *
 * So resolve it per environment. Vercel sets VERCEL=1 in its build container,
 * which makes the correct default self-detecting; VITE_BASE overrides both if
 * you ever need a third target.
 */
const base =
  process.env.VITE_BASE ??
  (process.env.VERCEL ? '/' : '/Figma_Style_Portfolio/')

export default defineConfig({
  base,
  plugins: [react()],

  // This project keeps JSX in plain .js files. Vite only parses JSX in .jsx by
  // default, so point esbuild's jsx loader at our source directory.
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.js$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: { loader: { '.js': 'jsx' } },
  },

  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
