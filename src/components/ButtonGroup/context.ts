import { inject, provide, type InjectionKey } from 'vue'
import type { ButtonGroupSize } from '@/components/ButtonGroup/types'

export interface ButtonGroupContext {
  size: () => ButtonGroupSize | undefined
}

const buttonGroupKey: InjectionKey<ButtonGroupContext> = Symbol('button-group')

export function provideButtonGroup(context: ButtonGroupContext) {
  provide(buttonGroupKey, context)
}

export function useButtonGroup() {
  return inject(buttonGroupKey, null)
}
