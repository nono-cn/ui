export const meterGroupSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

export const meterGroupOrientations = ['horizontal', 'vertical'] as const

export const meterGroupLegends = ['list', 'inline', 'none'] as const

export const meterGroupDefaults = {
  color: 'primary',
  size: 'md',
  orientation: 'horizontal',
  legend: 'list',
  max: 100,
} as const
