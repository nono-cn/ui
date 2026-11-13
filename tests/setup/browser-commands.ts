import { readFile } from 'node:fs/promises'
import type { BrowserCommand } from 'vitest/node'
import type {} from '@vitest/browser-playwright'

const setWindowSize: BrowserCommand<[width: number, height: number]> = async (
  context,
  width,
  height,
) => {
  if (context.provider.name !== 'playwright') throw new Error('setWindowSize requires Playwright')
  await context.page.setViewportSize({ width, height })
}

const readImageBase64: BrowserCommand<[path: string]> = async (_context, path) => {
  return (await readFile(path)).toString('base64')
}

export const browserCommands = { setWindowSize, readImageBase64 }

declare module 'vitest/browser' {
  interface BrowserCommands {
    setWindowSize: (width: number, height: number) => Promise<void>
    readImageBase64: (path: string) => Promise<string>
  }
}
