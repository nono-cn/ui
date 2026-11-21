import type { AriaAttributes, HTMLAttributes, StyleValue } from 'vue'
import { cn, type ClassValue } from '@/composables/cn'

interface NativeAttributes {
  autofocus?: boolean
  nonce?: string
  popover?: 'auto' | 'manual' | 'hint' | ''
}

export const uiAttributeNames = [
  'class',
  'style',
  'id',
  'title',
  'lang',
  'dir',
  'hidden',
  'inert',
  'translate',
  'spellcheck',
  'draggable',
  'contenteditable',
  'accesskey',
  'autocapitalize',
  'autocorrect',
  'enterkeyhint',
  'inputmode',
  'tabindex',
  'role',
  'part',
  'exportparts',
  'itemprop',
  'autofocus',
  'nonce',
  'popover',
] as const satisfies readonly (keyof (HTMLAttributes & NativeAttributes))[]

export type UiAttributeName = (typeof uiAttributeNames)[number]

export type UiAttributes = Pick<HTMLAttributes & NativeAttributes, UiAttributeName> &
  AriaAttributes & {
    [key: `data-${string}`]: never
    [key: `on${string}`]: never
  }

export type UiResolver<P = void> = (state: P) => UiAttributes

type UiBase = Record<string, unknown>

const allowed = new Set<string>(uiAttributeNames)

function isUiAttribute(key: string) {
  return allowed.has(key) || key.startsWith('aria-')
}

function pickUiAttributes(value: object | undefined): UiBase {
  if (!value) return {}
  return Object.fromEntries(Object.entries(value).filter(([key]) => isUiAttribute(key)))
}

export function useUi(base: UiBase | UiBase[], ui?: UiAttributes): Record<string, unknown> {
  const layers: UiBase[] = [...(Array.isArray(base) ? base : [base]), pickUiAttributes(ui)]

  return {
    ...Object.assign({}, ...layers),
    class: cn(...layers.map((layer) => layer.class as ClassValue)),
    style: layers.map((layer) => layer.style) as StyleValue,
  }
}
