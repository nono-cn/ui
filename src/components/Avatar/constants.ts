export const avatarSizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const

export const avatarVariantNames = ['solid', 'outline', 'soft', 'subtle'] as const

export const avatarDefaults = {
  variant: 'soft',
  color: 'neutral',
  size: 'md',
  radius: 'full',
  icon: 'user',
  delay: 0,
} as const
