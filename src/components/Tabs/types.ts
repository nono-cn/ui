import type { ChangeDetails } from '@ui-sdk/core'
import type { TabsController, TabsValueChangeReason } from '@ui-sdk/core/tabs'
import type {
  tabsActivations,
  tabsOrientations,
  tabsSizes,
  tabsVariantNames,
} from '@/components/Tabs/constants'
import type { Radius } from '@/composables/useTheme'
import type { UiResolver } from '@/composables/useUi'
import type { IconName } from '@/icons'

export type TabsOrientation = (typeof tabsOrientations)[number]

export type TabsActivation = (typeof tabsActivations)[number]

export type TabsSize = (typeof tabsSizes)[number]

export type TabsVariant = (typeof tabsVariantNames)[number]

export type TabsValueChangeDetails = ChangeDetails<TabsValueChangeReason>

export interface TabsItem {
  value: string
  label?: string
  icon?: IconName
  trailingIcon?: IconName
  content?: string
  slot?: string
  disabled?: boolean
}

export interface TabsItemContext {
  item: TabsItem
  index: number
  selected: boolean
  disabled: boolean
}

export interface TabsUi {
  root?: UiResolver
  list?: UiResolver
  indicator?: UiResolver
  tab?: UiResolver<TabsItemContext>
  leadingIcon?: UiResolver<TabsItemContext>
  label?: UiResolver<TabsItemContext>
  trailingIcon?: UiResolver<TabsItemContext>
  panel?: UiResolver<TabsItemContext>
}

export interface TabsProps {
  items?: TabsItem[]
  modelValue?: string | null
  defaultValue?: string | null
  orientation?: TabsOrientation
  activation?: TabsActivation
  loop?: boolean
  content?: boolean
  keepMounted?: boolean
  hiddenUntilFound?: boolean
  variant?: TabsVariant
  color?: string
  size?: TabsSize
  radius?: Radius
  ui?: TabsUi
}

export interface TabsEmits {
  'update:modelValue': [value: string | null]
  valueChange: [value: string | null, details: TabsValueChangeDetails]
}

export interface TabsSlots {
  leading?(props: TabsItemContext): unknown
  label?(props: TabsItemContext): unknown
  trailing?(props: TabsItemContext): unknown
  content?(props: TabsItemContext): unknown
  [slot: `${string}-content`]: ((props: TabsItemContext) => unknown) | undefined
}

export type TabsExpose = Pick<TabsController, 'getValue' | 'setValue' | 'select' | 'focus'>
