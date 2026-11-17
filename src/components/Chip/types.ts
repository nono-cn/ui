import type { chipPositions, chipSizes } from '@/components/Chip/constants'

export type ChipSize = (typeof chipSizes)[number]

export type ChipPosition = (typeof chipPositions)[number]

export interface ChipProps {
  color?: string
  size?: ChipSize
  position?: ChipPosition
  show?: boolean
  inset?: boolean
  standalone?: boolean
}

export interface ChipSlots {
  default?(): unknown
}
