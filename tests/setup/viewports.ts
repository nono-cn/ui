export const viewports = {
  desktop: { text: 'desktop', width: 1280, height: 800 },
  mobile: { text: 'mobile', width: 390, height: 844 },
} as const

export type ViewportName = keyof typeof viewports

export const defaultViewport: ViewportName = 'desktop'

export const browserWindow = { width: 1920, height: 1080 } as const
