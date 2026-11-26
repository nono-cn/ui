export const accordionSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const

export const accordionVariantNames = ['plain', 'outline', 'separated', 'soft'] as const

export const accordionIndicators = ['chevron', 'plus'] as const

export const accordionIndicatorPositions = ['start', 'end'] as const

export const accordionDefaults = {
  variant: 'plain',
  indicator: 'chevron',
  indicatorPosition: 'end',
  color: 'primary',
  size: 'md',
  radius: 'md',
  multiple: false,
  collapsible: true,
  disabled: false,
  keepMounted: false,
} as const
