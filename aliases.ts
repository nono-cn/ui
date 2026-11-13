import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))

export const aliases = {
  '@nono/ui/core': path.resolve(root, 'src/core/index.ts'),
  '@nono/ui/vue': path.resolve(root, 'src/vue/index.ts'),
  '@nono/ui/styles.css': path.resolve(root, 'src/styles/index.css'),
  '@test/shared': path.resolve(root, 'tests/shared/index.ts'),
  '@test/vue': path.resolve(root, 'tests/vue/index.ts'),
}

export const frameworks = {
  vue: {
    jsx: /[\\/](src|tests|docs[\\/]demos)[\\/]vue[\\/].*\.tsx$/,
  },
}
