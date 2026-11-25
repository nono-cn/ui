import type { GaugeLabelDetails, NumberFormat } from '@ui-sdk/core/progress'
import type { ProgressState, ProgressValueState } from '@/components/Progress/types'
import type { progressCircularSizes } from '@/components/ProgressCircular/constants'
import type { UiResolver } from '@/composables/useUi'

export type ProgressCircularSize = (typeof progressCircularSizes)[number]

export interface ProgressCircularUi {
  root?: UiResolver
  label?: UiResolver<ProgressState>
  value?: UiResolver<ProgressValueState>
  svg?: UiResolver<ProgressState>
  track?: UiResolver<ProgressState>
  indicator?: UiResolver<ProgressState>
}

export interface ProgressCircularProps {
  value?: number | null
  min?: number
  max?: number
  format?: NumberFormat
  locale?: string
  getValueLabel?: (value: number | null, details: GaugeLabelDetails<number | null>) => string
  label?: string
  showValue?: boolean
  color?: string
  size?: ProgressCircularSize
  thickness?: number
  inverted?: boolean
  ui?: ProgressCircularUi
}

export interface ProgressCircularSlots {
  label?(props: ProgressState): unknown
  value?(props: ProgressValueState): unknown
}
