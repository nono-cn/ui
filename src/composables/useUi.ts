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

type BaseAttributes = Omit<UiAttributes, `data-${string}`> & {
  [key: `data-${string}`]: string | number | boolean | undefined
}

export interface UseUiOptions<P = void> {
  base?: BaseAttributes
  resolver?: UiResolver<P>
  payload?: P
  attrs?: Record<string, unknown>
}

const allowed = new Set<string>(uiAttributeNames)

function isUiAttribute(key: string) {
  return allowed.has(key) || key.startsWith('aria-')
}

function pickUiAttributes(value: object | undefined): UiAttributes {
  if (!value) return {}
  return Object.fromEntries(
    Object.entries(value).filter(([key]) => isUiAttribute(key)),
  ) as UiAttributes
}

export function useUi<P = void>({
  base = {},
  resolver,
  payload,
  attrs = {},
}: UseUiOptions<P>): Record<string, unknown> {
  const ui = pickUiAttributes(resolver?.(payload as P))

  return {
    ...base,
    ...ui,
    ...attrs,
    class: cn(base.class as ClassValue, ui.class as ClassValue, attrs.class as ClassValue),
    style: [base.style, ui.style, attrs.style] as StyleValue,
  }
}
