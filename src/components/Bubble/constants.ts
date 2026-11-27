export const bubbleVariantNames = ['solid', 'outline', 'plain', 'subtle', 'soft'] as const

export const bubbleAligns = ['start', 'end'] as const

export const bubbleReactionsSides = ['top', 'bottom'] as const

export const bubbleReactionsAligns = ['start', 'end'] as const

export const bubbleDefaults = {
  variant: 'solid',
  color: 'primary',
  radius: '2xl',
  align: 'start',
  reactionsSide: 'bottom',
  reactionsAlign: 'end',
} as const
