export const iconTileSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

export const iconTileVariantNames = [
  'solid',
  'outline',
  'soft',
  'subtle',
  'frame',
  'elevated',
] as const

export const iconTileDefaults = {
  variant: 'outline',
  color: 'neutral',
  size: 'md',
  radius: 'lg',
} as const
