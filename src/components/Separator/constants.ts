export const separatorOrientations = ['horizontal', 'vertical'] as const

export const separatorTypes = ['solid', 'dashed', 'dotted'] as const

export const separatorSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

export const separatorPositions = ['left', 'center', 'right'] as const

export const separatorDefaults = {
  orientation: 'horizontal',
  decorative: true,
  type: 'solid',
  size: 'sm',
  color: 'neutral',
  position: 'center',
} as const
