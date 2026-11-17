import type { alertVariantNames } from '@/components/Alert/constants'
import type { IconName } from '@/icons'

export type AlertVariant = (typeof alertVariantNames)[number]

export interface AlertProps {
  label?: string
  description?: string
  icon?: IconName
  variant?: AlertVariant
  color?: string
  closable?: boolean
  closeLabel?: string
  decorative?: boolean
}

export interface AlertEmits {
  close: []
}

export interface AlertSlots {
  icon?(): unknown
  label?(): unknown
  description?(): unknown
  close?(props: { close: () => void }): unknown
}
