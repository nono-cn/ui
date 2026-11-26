import type { ChangeDetails } from '@ui-sdk/core'
import type { AccordionController, AccordionValueChangeReason } from '@ui-sdk/core/accordion'
import type {
  accordionIndicatorPositions,
  accordionIndicators,
  accordionSizes,
  accordionVariantNames,
} from '@/components/Accordion/constants'
import type { Radius } from '@/composables/useTheme'
import type { UiResolver } from '@/composables/useUi'
import type { IconName } from '@/icons'

export type AccordionSize = (typeof accordionSizes)[number]

export type AccordionVariant = (typeof accordionVariantNames)[number]

export type AccordionIndicator = (typeof accordionIndicators)[number]

export type AccordionIndicatorPosition = (typeof accordionIndicatorPositions)[number]

export type AccordionValueChangeDetails = ChangeDetails<AccordionValueChangeReason>

export interface AccordionItem {
  value?: string
  label?: string
  icon?: IconName
  trailingIcon?: IconName
  content?: string
  slot?: string
  disabled?: boolean
}

export interface AccordionItemContext {
  item: AccordionItem
  index: number
  value: string
  open: boolean
  disabled: boolean
}

export interface AccordionUi {
  root?: UiResolver
  item?: UiResolver<AccordionItemContext>
  header?: UiResolver<AccordionItemContext>
  trigger?: UiResolver<AccordionItemContext>
  leadingIcon?: UiResolver<AccordionItemContext>
  label?: UiResolver<AccordionItemContext>
  trailingIcon?: UiResolver<AccordionItemContext>
  indicatorIcon?: UiResolver<AccordionItemContext>
  panel?: UiResolver<AccordionItemContext>
  body?: UiResolver<AccordionItemContext>
}

export interface AccordionProps {
  items?: AccordionItem[]
  modelValue?: string[]
  defaultValue?: string[]
  multiple?: boolean
  collapsible?: boolean
  disabled?: boolean
  keepMounted?: boolean
  hiddenUntilFound?: boolean
  variant?: AccordionVariant
  indicator?: AccordionIndicator
  indicatorPosition?: AccordionIndicatorPosition
  color?: string
  size?: AccordionSize
  radius?: Radius
  ui?: AccordionUi
}

export interface AccordionEmits {
  'update:modelValue': [value: string[]]
  valueChange: [value: string[], details: AccordionValueChangeDetails]
}

export interface AccordionSlots {
  leading?(props: AccordionItemContext): unknown
  label?(props: AccordionItemContext): unknown
  trailing?(props: AccordionItemContext): unknown
  indicator?(props: AccordionItemContext): unknown
  content?(props: AccordionItemContext): unknown
  [slot: `item-${string}`]: ((props: AccordionItemContext) => unknown) | undefined
}

export type AccordionExpose = Pick<
  AccordionController,
  | 'getValue'
  | 'setValue'
  | 'isOpen'
  | 'open'
  | 'close'
  | 'toggle'
  | 'openAll'
  | 'closeAll'
  | 'focus'
>
