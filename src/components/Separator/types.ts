import type {
  separatorOrientations,
  separatorPositions,
  separatorSizes,
  separatorTypes,
} from '@/components/Separator/constants'
import type { UiResolver } from '@/composables/useUi'

export type SeparatorOrientation = (typeof separatorOrientations)[number]

export type SeparatorType = (typeof separatorTypes)[number]

export type SeparatorSize = (typeof separatorSizes)[number]

export type SeparatorPosition = (typeof separatorPositions)[number]

export interface SeparatorUi {
  root?: UiResolver
  label?: UiResolver
}

export interface SeparatorProps {
  label?: string
  orientation?: SeparatorOrientation
  decorative?: boolean
  type?: SeparatorType
  size?: SeparatorSize
  color?: string
  position?: SeparatorPosition
  ui?: SeparatorUi
}

export interface SeparatorSlots {
  default?(): unknown
}
