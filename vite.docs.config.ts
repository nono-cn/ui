import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { aliases, jsx } from './aliases.ts'

const root = path.dirname(fileURLToPath(import.meta.url))
const docs = path.resolve(root, 'docs')

const { version } = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8')) as {
  version: string
}

export default defineConfig({
  root: docs,
  base: process.env.DOCS_BASE ?? '/',
  plugins: [tailwindcss(), vue(), vueJsx({ include: jsx })],
  resolve: { alias: aliases },
  define: { 'import.meta.env.NONO_UI_VERSION': JSON.stringify(version) },
  build: {
    outDir: path.resolve(root, 'docs-dist'),
    emptyOutDir: true,
  },
})
