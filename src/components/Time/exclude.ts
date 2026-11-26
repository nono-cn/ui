import type { TimeUi } from '@/components/Time/types'

export const timeUiExclude = {
  root: ['datetime'],
} satisfies Record<keyof TimeUi, readonly string[]>
