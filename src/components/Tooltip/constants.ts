export const tooltipSides = ['top', 'right', 'bottom', 'left'] as const

export const tooltipAligns = ['start', 'center', 'end'] as const

export const tooltipTypes = ['label', 'description'] as const

export const tooltipDefaults = {
  side: 'top',
  align: 'center',
  radius: 'md',
  arrow: false,
} as const
