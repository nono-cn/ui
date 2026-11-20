export const ratingSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

export const ratingOrientations = ['horizontal', 'vertical'] as const

export const ratingDefaults = {
  color: 'primary',
  size: 'md',
  orientation: 'horizontal',
  max: 5,
  step: 1,
  icon: 'star',
} as const
