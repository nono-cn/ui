import type { ChangeDetails } from '@ui-sdk/core'
import type {
  RatingController,
  RatingItemState,
  RatingValueChangeReason,
} from '@ui-sdk/core/rating'
import type { ratingOrientations, ratingSizes } from '@/components/Rating/constants'
import type { UiAttributes, UiResolver } from '@/composables/useUi'
import type { IconName } from '@/icons'

export type RatingSize = (typeof ratingSizes)[number]

export type RatingOrientation = (typeof ratingOrientations)[number]

export type RatingChangeDetails = ChangeDetails<RatingValueChangeReason>

export interface RatingUi {
  item?: UiResolver<UiAttributes, RatingItemState>
  emptyIcon?: UiResolver<UiAttributes, RatingItemState>
  icon?: UiResolver<UiAttributes, RatingItemState>
}

export interface RatingProps {
  modelValue?: number | null
  defaultValue?: number | null
  max?: number
  step?: number
  color?: string
  size?: RatingSize
  orientation?: RatingOrientation
  icon?: IconName
  emptyIcon?: IconName
  deselectable?: boolean
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  name?: string
  form?: string
  loop?: boolean
  getValueLabel?: (value: number, max: number) => string
  ui?: RatingUi
}

export interface RatingEmits {
  'update:modelValue': [value: number | null]
  valueChange: [value: number | null, details: RatingChangeDetails]
}

export interface RatingSlots {
  item?(props: RatingItemState): unknown
}

export type RatingExpose = Pick<RatingController, 'getValue' | 'setValue' | 'focus'>
