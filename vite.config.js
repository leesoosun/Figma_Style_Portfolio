import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deployed as a GitHub Pages *project* site, so every asset URL needs the repo
// name prefix. Change `base` to '/' if you ever move to a custom domain.
export default defineConfig({
  base: '/Figma_Style_Portfolio/',
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
