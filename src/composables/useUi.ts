import {
  camelize,
  type AriaAttributes,
  type Component,
  type HTMLAttributes,
  type StyleValue,
} from 'vue'
import { cn, type ClassValue } from '@/composables/cn'

type WithoutEvents<T> = { [K in keyof T as K extends `on${string}` ? never : K]: T[K] }

export type UiAttributes = WithoutEvents<HTMLAttributes> &
  AriaAttributes & {
    [key: `data-${string}`]: unknown
    [key: `on${string}`]: never
    'data-ui'?: never
    'data-slot'?: never
  }

export type UiResolver<P = void> = (state: P) => UiAttributes

type UiBase = Record<string, unknown>

const reserved = new Set(['data-ui', 'data-slot'])

export function propsOf(component: Component): string[] {
  const props = (component as { props?: string[] | Record<string, unknown> }).props ?? {}
  return Array.isArray(props) ? props : Object.keys(props)
}

function pickUiAttributes(value: object | undefined, exclude: readonly string[]): UiBase {
  if (!value) return {}
  return Object.fromEntries(
    Object.entries(value).filter(
      ([key]) => !key.startsWith('on') && !reserved.has(key) && !exclude.includes(camelize(key)),
    ),
  )
}

export function mergeUiAttributes(base: UiAttributes, own: UiAttributes): UiAttributes {
  return {
    ...base,
    ...own,
    class: cn(base.class as ClassValue, own.class as ClassValue),
    style: [base.style, own.style] as StyleValue,
  }
}

export function mergeUiResolvers<P>(
  base: UiResolver<P> | undefined,
  own: UiResolver<P> | undefined,
): UiResolver<P> | undefined {
  if (!base || !own) return own ?? base
  return (state) => mergeUiAttributes(base(state) ?? {}, own(state) ?? {})
}

export interface UseUiOptions {
  base: UiBase | UiBase[]
  ui?: UiAttributes
  exclude?: readonly string[]
}

export function useUi({ base, ui, exclude = [] }: UseUiOptions): Record<string, unknown> {
  const layers: UiBase[] = [...(Array.isArray(base) ? base : [base]), pickUiAttributes(ui, exclude)]

  return {
    ...Object.assign({}, ...layers),
    class: cn(...layers.map((layer) => layer.class as ClassValue)),
    style: layers.map((layer) => layer.style) as StyleValue,
  }
}
