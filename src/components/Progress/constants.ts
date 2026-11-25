export const progressSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

export const progressOrientations = ['horizontal', 'vertical'] as const

export const progressAnimations = ['carousel', 'carousel-inverse', 'swing', 'elastic'] as const

export const progressValuePositions = ['outside', 'inside'] as const

export const progressStatuses = ['indeterminate', 'progressing', 'complete'] as const

export const progressDefaults = {
  color: 'primary',
  size: 'md',
  orientation: 'horizontal',
  animation: 'carousel',
  valuePosition: 'outside',
  min: 0,
  max: 100,
} as const
