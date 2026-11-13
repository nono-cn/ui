import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import { aliases, frameworks } from './aliases.ts'

const root = path.dirname(fileURLToPath(import.meta.url))
const src = path.resolve(root, 'src')

export default defineConfig({
  plugins: [
    vue(),
    vueJsx({ include: frameworks.vue.jsx }),
    dts({
      tsconfigPath: './tsconfig.build.json',
      exclude: ['node_modules/**', 'src/**/__tests__/**'],
      entryRoot: 'src',
    }),
  ],
  resolve: { alias: aliases },
  publicDir: false,
  build: {
    cssCodeSplit: true,
    lib: {
      entry: {
        'core/index': path.join(src, 'core/index.ts'),
        'vue/index': path.join(src, 'vue/index.ts'),
        styles: path.join(src, 'styles/index.css'),
      },
      formats: ['es'],
    },
    rolldownOptions: {
      external: ['vue', /^@ui-sdk\//],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        assetFileNames: (asset) =>
          asset.names.some((name) => name.endsWith('.css'))
            ? 'styles.css'
            : 'assets/[name][extname]',
      },
    },
  },
})
