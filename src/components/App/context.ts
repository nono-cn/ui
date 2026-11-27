import {
  computed,
  inject,
  provide,
  toValue,
  type ComputedRef,
  type InjectionKey,
  type MaybeRefOrGetter,
} from 'vue'
import type { AppDefaults } from '@/components/App/types'
import { mergeUiResolvers, type UiResolver } from '@/composables/useUi'

type PlainObject = Record<string, unknown>

const appDefaultsKey: InjectionKey<ComputedRef<AppDefaults>> = Symbol('nono-ui-app-defaults')

function isPlainObject(value: unknown): value is PlainObject {
  if (typeof value !== 'object' || value === null) return false
  const prototype = Object.getPrototypeOf(value)
  return prototype === Object.prototype || prototype === null
}

function mergeUi(base: unknown, own: unknown): unknown {
  if (!isPlainObject(base) || !isPlainObject(own)) return own
  const merged: PlainObject = { ...base }
  for (const [node, resolver] of Object.entries(own)) {
    merged[node] = mergeUiResolvers(merged[node] as UiResolver, resolver as UiResolver)
  }
  return merged
}

export function mergeDefaults<T extends object>(base: T | undefined, own: T | undefined): T {
  const merged: PlainObject = { ...base }
  for (const [key, value] of Object.entries(own ?? {})) {
    if (value === undefined) continue
    const current = merged[key]
    if (key === 'ui') merged[key] = mergeUi(current, value)
    else if (isPlainObject(current) && isPlainObject(value))
      merged[key] = mergeDefaults(current, value)
    else merged[key] = value
  }
  return merged as T
}

export function provideAppDefaults(defaults: MaybeRefOrGetter<AppDefaults | undefined>) {
  const parent = inject(appDefaultsKey, null)
  provide(
    appDefaultsKey,
    computed(() => mergeDefaults(parent?.value, toValue(defaults))),
  )
}

export function useAppProps<Name extends keyof AppDefaults, Props extends object>(
  name: Name,
  props: Props,
): Props {
  const defaults = inject(appDefaultsKey, null)
  const merged = computed(() => mergeDefaults(defaults?.value[name] as Props | undefined, props))
  return new Proxy(props, { get: (_, key) => Reflect.get(merged.value, key) })
}
