import type { MeterLabelDetails, NumberFormat } from '@ui-sdk/core/meter'
import type {
  meterGroupLegends,
  meterGroupOrientations,
  meterGroupSizes,
} from '@/components/MeterGroup/constants'
import type { UiResolver } from '@/composables/useUi'
import type { IconName } from '@/icons'

export type MeterGroupSize = (typeof meterGroupSizes)[number]

export type MeterGroupOrientation = (typeof meterGroupOrientations)[number]

export type MeterGroupLegend = (typeof meterGroupLegends)[number]

export interface MeterGroupItem {
  value: number
  label?: string
  color?: string
  icon?: IconName
}

export interface MeterGroupItemContext {
  item: MeterGroupItem
  index: number
  percent: number
  text: string
}

export interface MeterGroupContext {
  value: number
  percent: number
  max: number
  text: string
}

export interface MeterGroupUi {
  root?: UiResolver
  meter?: UiResolver<MeterGroupContext>
  label?: UiResolver<MeterGroupContext>
  value?: UiResolver<MeterGroupContext>
  track?: UiResolver<MeterGroupContext>
  segment?: UiResolver<MeterGroupItemContext>
  legend?: UiResolver
  item?: UiResolver<MeterGroupItemContext>
  itemIcon?: UiResolver<MeterGroupItemContext>
  itemDot?: UiResolver<MeterGroupItemContext>
  itemLabel?: UiResolver<MeterGroupItemContext>
  itemValue?: UiResolver<MeterGroupItemContext>
}

export interface MeterGroupProps {
  items?: MeterGroupItem[]
  max?: number
  format?: NumberFormat
  locale?: string
  getValueLabel?: (value: number, details: MeterLabelDetails) => string
  label?: string
  showValue?: boolean
  legend?: MeterGroupLegend
  separated?: boolean
  color?: string
  size?: MeterGroupSize
  orientation?: MeterGroupOrientation
  ui?: MeterGroupUi
}

export interface MeterGroupSlots {
  label?(props: MeterGroupContext): unknown
  value?(props: MeterGroupContext): unknown
  'item-leading'?(props: MeterGroupItemContext): unknown
  'item-label'?(props: MeterGroupItemContext): unknown
  'item-value'?(props: MeterGroupItemContext): unknown
}
