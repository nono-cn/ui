import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))

export const aliases = {
  '@nono/ui/core': path.resolve(root, 'src/core/index.ts'),
  '@nono/ui/vue': path.resolve(root, 'src/vue/index.ts'),
  '@nono/ui/styles.css': path.resolve(root, 'src/styles/index.css'),
  '@test': path.resolve(root, 'tests'),
  '@docs': path.resolve(root, 'docs'),
  '@': path.resolve(root, 'src'),
}

export const frameworks = {
  vue: {
    jsx: /[\\/](src|tests|docs[\\/]demos)[\\/]vue[\\/].*\.tsx$/,
  },
}
