export const tabsOrientations = ['horizontal', 'vertical'] as const

export const tabsActivations = ['automatic', 'manual'] as const

export const tabsSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

export const tabsVariantNames = ['pill', 'link'] as const

export const tabsDefaults = {
  orientation: 'horizontal',
  activation: 'automatic',
  variant: 'pill',
  color: 'primary',
  size: 'md',
  radius: 'md',
  content: true,
  keepMounted: false,
} as const
