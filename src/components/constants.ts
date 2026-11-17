export const themeColors = [
  'primary',
  'secondary',
  'neutral',
  'info',
  'success',
  'warning',
  'error',
] as const

export const themeRadii = [
  'none',
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  'full',
] as const

export type ThemeColor = (typeof themeColors)[number]

export type ThemeRadius = (typeof themeRadii)[number]
