import type {
  bubbleAligns,
  bubbleReactionsAligns,
  bubbleReactionsSides,
  bubbleVariantNames,
} from '@/components/Bubble/constants'
import type { Radius } from '@/composables/useTheme'
import type { UiResolver } from '@/composables/useUi'

export type BubbleVariant = (typeof bubbleVariantNames)[number]

export type BubbleAlign = (typeof bubbleAligns)[number]

export type BubbleReactionsSide = (typeof bubbleReactionsSides)[number]

export type BubbleReactionsAlign = (typeof bubbleReactionsAligns)[number]

export interface BubbleUi {
  root?: UiResolver
  content?: UiResolver
  reactions?: UiResolver
}

export interface BubbleProps {
  text?: string
  variant?: BubbleVariant
  color?: string
  radius?: Radius
  align?: BubbleAlign
  reactionsSide?: BubbleReactionsSide
  reactionsAlign?: BubbleReactionsAlign
  interactive?: boolean
  ui?: BubbleUi
}

export interface BubbleEmits {
  click: [event: MouseEvent]
}

export interface BubbleSlots {
  default?(): unknown
  reactions?(): unknown
}
