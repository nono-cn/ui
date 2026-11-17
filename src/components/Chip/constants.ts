export const chipSizes = ['3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const

export const chipPositions = ['top-right', 'bottom-right', 'top-left', 'bottom-left'] as const

export const chipDefaults = {
  color: 'primary',
  size: '3xl',
  position: 'top-right',
  show: true,
  inset: false,
  standalone: false,
} as const
