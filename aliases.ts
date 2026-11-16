import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))

export const aliases = {
  '@nono/ui/styles.css': path.resolve(root, 'src/styles/index.css'),
  '@nono/ui': path.resolve(root, 'src/index.ts'),
  '@test': path.resolve(root, 'tests'),
  '@docs': path.resolve(root, 'docs'),
  '@': path.resolve(root, 'src'),
}

export const jsx = /[\\/](src|tests)[\\/].*\.tsx$/
