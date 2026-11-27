import { inject, provide, type InjectionKey } from 'vue'
import type { BubbleAlign } from '@/components/Bubble/types'

export interface BubbleGroupContext {
  align: () => BubbleAlign | undefined
}

const bubbleGroupKey: InjectionKey<BubbleGroupContext> = Symbol('bubble-group')

export function provideBubbleGroup(context: BubbleGroupContext) {
  provide(bubbleGroupKey, context)
}

export function useBubbleGroup() {
  return inject(bubbleGroupKey, null)
}
