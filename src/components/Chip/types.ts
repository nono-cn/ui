import type { chipPositions, chipSizes } from '@/components/Chip/constants'
import type { UiResolver } from '@/composables/useUi'

export type ChipSize = (typeof chipSizes)[number]

export type ChipPosition = (typeof chipPositions)[number]

export interface ChipUi {
  root?: UiResolver
  indicator?: UiResolver
}

export interface ChipProps {
  color?: string
  size?: ChipSize
  position?: ChipPosition
  show?: boolean
  inset?: boolean
  standalone?: boolean
  ui?: ChipUi
}

export interface ChipSlots {
  default?(): unknown
}
