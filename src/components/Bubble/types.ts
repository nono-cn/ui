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
  href?: string
  reactions?: string
  reactionsSide?: BubbleReactionsSide
  reactionsAlign?: BubbleReactionsAlign
  onClick?: (event: MouseEvent) => unknown
  ui?: BubbleUi
}

export interface BubbleSlots {
  default?(): unknown
  reactions?(): unknown
}

export interface BubbleGroupUi {
  root?: UiResolver
}

export interface BubbleGroupProps {
  align?: BubbleAlign
  ui?: BubbleGroupUi
}

export interface BubbleGroupSlots {
  default?(): unknown
}
