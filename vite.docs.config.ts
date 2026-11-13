import { readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { aliases, frameworks } from './aliases.ts'

const root = path.dirname(fileURLToPath(import.meta.url))
const docs = path.resolve(root, 'docs')

const pages = Object.fromEntries(
  readdirSync(docs)
    .filter((file) => file.endsWith('.html'))
    .map((file) => [path.basename(file, '.html'), path.join(docs, file)]),
)

export default defineConfig({
  root: docs,
  plugins: [vue(), vueJsx({ include: frameworks.vue.jsx })],
  resolve: { alias: aliases },
  build: {
    outDir: path.resolve(root, 'docs-dist'),
    emptyOutDir: true,
    rolldownOptions: { input: pages },
  },
})
