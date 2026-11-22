export const toggleSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

export const toggleVariantNames = ['solid', 'outline', 'plain', 'subtle', 'soft', 'link'] as const

export const toggleDefaults = {
  variant: 'outline',
  activeVariant: 'subtle',
  color: 'neutral',
  activeColor: 'neutral',
  size: 'md',
  radius: 'md',
} as const
