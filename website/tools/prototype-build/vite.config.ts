import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import path from 'node:path'

const ROOT = path.resolve(__dirname, '../..')
// ENTRY=option2 builds homepage option 2; the default builds the main homepage.
const ENTRY = process.env.ENTRY === 'option2' ? 'option2' : process.env.ENTRY === 'option3' ? 'option3' : 'index'
export default defineConfig({
  root: __dirname,
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: [
      { find: '@/lib/assets', replacement: path.resolve(__dirname, 'shims/assets.ts') },
      { find: 'next/font/google', replacement: path.resolve(__dirname, 'shims/next-font.ts') },
      { find: 'next/dynamic', replacement: path.resolve(__dirname, 'shims/next-dynamic.tsx') },
      { find: '@', replacement: ROOT },
    ],
  },
  build: {
    outDir: path.resolve(ROOT, ENTRY === 'index' ? '../prototype/build' : `../prototype/build-${ENTRY}`),
    rollupOptions: { input: path.resolve(__dirname, `${ENTRY}.html`) },
    emptyOutDir: true,
    assetsInlineLimit: 100 * 1024 * 1024,
    cssCodeSplit: false,
    target: 'es2020',
  },
  esbuild: { legalComments: 'none' },
})
