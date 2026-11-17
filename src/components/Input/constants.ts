export const inputSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

export const inputVariantNames = ['outline', 'soft', 'subtle', 'plain'] as const

export const inputDefaults = {
  variant: 'outline',
  color: 'primary',
  size: 'md',
  radius: 'md',
  type: 'text',
} as const
