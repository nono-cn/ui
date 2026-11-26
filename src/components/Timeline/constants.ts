export const timelineSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

export const timelineOrientations = ['vertical', 'horizontal'] as const

export const timelineStatuses = ['complete', 'current', 'upcoming'] as const

export const timelineDefaults = {
  color: 'primary',
  size: 'md',
  orientation: 'vertical',
  reverse: false,
} as const
