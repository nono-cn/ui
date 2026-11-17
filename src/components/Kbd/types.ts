import type { kbdSizes, kbdVariantNames } from '@/components/Kbd/constants'
import type { Radius } from '@/composables/useTheme'

export type KbdSize = (typeof kbdSizes)[number]

export type KbdVariant = (typeof kbdVariantNames)[number]

export interface KbdProps {
  label?: string
  variant?: KbdVariant
  color?: string
  size?: KbdSize
  radius?: Radius
}

export interface KbdSlots {
  default?(): unknown
}

export interface KbdGroupSlots {
  default?(): unknown
}
