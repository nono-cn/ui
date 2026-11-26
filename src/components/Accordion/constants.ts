export const accordionVariantNames = ['plain', 'outline', 'separated', 'frame'] as const

export const accordionIndicatorPositions = ['start', 'end'] as const

export const accordionDefaults = {
  variant: 'plain',
  indicatorPosition: 'end',
  indicatorIcon: { start: 'chevronRight', end: 'chevronDown' },
  multiple: false,
  collapsible: true,
  disabled: false,
  keepMounted: false,
} as const
