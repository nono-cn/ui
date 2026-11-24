import {
  useShortcut as useSdkShortcut,
  useShortcutHint as useSdkShortcutHint,
  type ShortcutHandler,
  type ShortcutInfo,
  type UseShortcutOptions,
} from '@ui-sdk/vue/shortcuts'
import { computed, toValue, type ComputedRef, type MaybeRefOrGetter } from 'vue'

export { shortcuts } from '@ui-sdk/vue/shortcuts'

export type ShortcutKeys = MaybeRefOrGetter<string | null | undefined>

export type ShortcutOptions = UseShortcutOptions

export type { ShortcutHandler, ShortcutInfo }

export interface ShortcutHint {
  text: ComputedRef<string>
  ariaKeyshortcuts: ComputedRef<string>
}

export function useShortcutHint(keys: ShortcutKeys): ShortcutHint {
  const current = computed(() => toValue(keys) || '')
  const hint = useSdkShortcutHint(current)

  return {
    text: computed(() => (current.value ? hint.text.value : '')),
    ariaKeyshortcuts: computed(() => (current.value ? hint.ariaKeyshortcuts.value : '')),
  }
}

export function useShortcut(
  keys: ShortcutKeys,
  handler: ShortcutHandler,
  options?: MaybeRefOrGetter<ShortcutOptions>,
): ShortcutHint {
  useSdkShortcut(keys, handler, options)

  return useShortcutHint(keys)
}
