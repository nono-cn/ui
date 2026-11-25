import type { GaugeLabelDetails, NumberFormat } from '@ui-sdk/core/progress'
import type {
  progressAnimations,
  progressOrientations,
  progressSizes,
  progressStatuses,
  progressValuePositions,
} from '@/components/Progress/constants'
import type { UiResolver } from '@/composables/useUi'

export type ProgressSize = (typeof progressSizes)[number]

export type ProgressOrientation = (typeof progressOrientations)[number]

export type ProgressAnimation = (typeof progressAnimations)[number]

export type ProgressValuePosition = (typeof progressValuePositions)[number]

export type ProgressStatus = (typeof progressStatuses)[number]

export interface ProgressState {
  value: number | null
  percent: number | null
  status: ProgressStatus
  min: number
  max: number
}

export interface ProgressValueState extends ProgressState {
  text: string
}

export interface ProgressUi {
  root?: UiResolver
  label?: UiResolver<ProgressState>
  value?: UiResolver<ProgressValueState>
  track?: UiResolver<ProgressState>
  indicator?: UiResolver<ProgressState>
}

export interface ProgressProps {
  value?: number | null
  min?: number
  max?: number
  format?: NumberFormat
  locale?: string
  getValueLabel?: (value: number | null, details: GaugeLabelDetails<number | null>) => string
  label?: string
  showValue?: boolean
  valuePosition?: ProgressValuePosition
  color?: string
  size?: ProgressSize
  orientation?: ProgressOrientation
  inverted?: boolean
  animation?: ProgressAnimation
  ui?: ProgressUi
}

export interface ProgressSlots {
  label?(props: ProgressState): unknown
  value?(props: ProgressValueState): unknown
}
