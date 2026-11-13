import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { playwright } from '@vitest/browser-playwright'
import type { PluginOption } from 'vite'
import { defineConfig, type TestProjectInlineConfiguration } from 'vitest/config'
import { aliases, frameworks } from './aliases.ts'
import { browserCommands } from './tests/setup/browser-commands.ts'
import { browserWindow, defaultViewport, viewports } from './tests/setup/viewports.ts'

const browserWsEndpoint = process.env.BROWSER_WS_ENDPOINT ?? 'ws://127.0.0.1:6677/'
const browserViewport = viewports[defaultViewport]

interface BrowserProject {
  name: string
  include: string[]
  setupFiles: string[]
  plugins?: PluginOption[]
  optimizeDeps?: string[]
}

function browserProject({
  name,
  include,
  setupFiles,
  plugins = [],
  optimizeDeps = [],
}: BrowserProject): TestProjectInlineConfiguration {
  return {
    extends: true,
    plugins: [tailwindcss(), ...plugins],
    optimizeDeps: { include: ['@ui-sdk/core', ...optimizeDeps] },
    test: {
      name,
      include,
      globalSetup: ['./tests/setup/browser-server.ts'],
      setupFiles,
      browser: {
        enabled: true,
        headless: true,
        commands: browserCommands,
        instances: [{ browser: 'chromium' }],
        viewport: { width: browserViewport.width, height: browserViewport.height },
        expect: {
          toMatchScreenshot: {
            resolveScreenshotPath: ({
              root,
              testFileDirectory,
              screenshotDirectory,
              testFileName,
              arg,
              browserName,
              ext,
            }) =>
              `${root}/${testFileDirectory}/${screenshotDirectory}/${testFileName}/${arg}-${browserName}${ext}`,
            resolveDiffPath: ({
              root,
              attachmentsDir,
              testFileDirectory,
              testFileName,
              arg,
              browserName,
              ext,
            }) =>
              `${root}/${attachmentsDir}/${testFileDirectory}/${testFileName}/${arg}-${browserName}${ext}`,
          },
        },
        provider: playwright({
          connectOptions: {
            wsEndpoint: browserWsEndpoint,
            exposeNetwork: '<loopback>',
          },
          launchOptions: {
            args: ['--font-render-hinting=none', '--disable-font-subpixel-positioning'],
          },
          contextOptions: {
            viewport: { width: browserWindow.width, height: browserWindow.height },
            deviceScaleFactor: 1,
            reducedMotion: 'reduce',
            locale: 'en-US',
            timezoneId: 'UTC',
            colorScheme: 'light',
          },
        }),
      },
    },
  }
}

export default defineConfig({
  resolve: { alias: aliases },
  test: {
    chaiConfig: { truncateThreshold: 0 },
    passWithNoTests: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx,vue}'],
      exclude: ['src/**/index.ts', 'src/**/__tests__/**'],
    },
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'jsdom',
          setupFiles: ['./tests/setup/jsdom.ts'],
          include: ['src/**/__tests__/*.spec.ts'],
        },
      },
      browserProject({
        name: 'core',
        include: ['src/core/**/__tests__/*.spec.browser.ts'],
        setupFiles: ['./tests/setup/core.ts'],
      }),
      browserProject({
        name: 'vue',
        include: ['src/vue/**/__tests__/*.spec.browser.{ts,tsx}'],
        setupFiles: ['./tests/setup/vue.ts'],
        plugins: [vue(), vueJsx({ include: frameworks.vue.jsx })],
        optimizeDeps: ['@ui-sdk/vue', 'vitest-browser-vue', 'vue'],
      }),
    ],
  },
})
