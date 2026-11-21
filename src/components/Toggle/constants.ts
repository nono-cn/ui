export const toggleTextSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

export const toggleIconSizes = ['icon-xs', 'icon-sm', 'icon', 'icon-lg', 'icon-xl'] as const

export const toggleSizes = [...toggleTextSizes, ...toggleIconSizes] as const

export const toggleVariantNames = ['outline', 'plain', 'solid'] as const

export const toggleDefaults = {
  variant: 'outline',
  color: 'primary',
  size: 'md',
  radius: 'md',
} as const
