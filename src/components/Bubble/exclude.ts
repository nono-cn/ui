import type { BubbleUi } from '@/components/Bubble/types'

export const bubbleUiExclude = {
  root: [],
  content: [],
  reactions: [],
} satisfies Record<keyof BubbleUi, readonly string[]>
