import type { HTMLAttributes, StyleValue } from 'vue'
import { cn, type ClassValue } from '@/composables/cn'

export type UiAttributes = HTMLAttributes & Record<`data-${string}`, unknown>

export type UiResolver<T extends object = UiAttributes> = () => T

interface Styled {
  class?: unknown
  style?: unknown
}

export function useUi<B extends object, U extends object>(
  base: B,
  resolver: UiResolver<U> | undefined,
): B & U {
  const ui = resolver?.()
  if (!ui) return base as B & U

  return {
    ...base,
    ...ui,
    class: cn((base as Styled).class as ClassValue, (ui as Styled).class as ClassValue),
    style: [(base as Styled).style, (ui as Styled).style] as StyleValue,
  }
}
