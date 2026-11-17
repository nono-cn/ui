import type {
  separatorOrientations,
  separatorPositions,
  separatorSizes,
  separatorTypes,
} from '@/components/Separator/constants'

export type SeparatorOrientation = (typeof separatorOrientations)[number]

export type SeparatorType = (typeof separatorTypes)[number]

export type SeparatorSize = (typeof separatorSizes)[number]

export type SeparatorPosition = (typeof separatorPositions)[number]

export interface SeparatorProps {
  label?: string
  orientation?: SeparatorOrientation
  decorative?: boolean
  type?: SeparatorType
  size?: SeparatorSize
  color?: string
  position?: SeparatorPosition
}

export interface SeparatorSlots {
  default?(): unknown
}
