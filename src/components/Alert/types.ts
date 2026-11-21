import type { alertVariantNames } from '@/components/Alert/constants'
import type { UiResolver } from '@/composables/useUi'
import type { IconName } from '@/icons'

export type AlertVariant = (typeof alertVariantNames)[number]

export interface AlertUi {
  root?: UiResolver
  icon?: UiResolver
  label?: UiResolver
  description?: UiResolver
  closeContainer?: UiResolver
  closeButton?: UiResolver
}

export interface AlertProps {
  label?: string
  description?: string
  icon?: IconName
  variant?: AlertVariant
  color?: string
  closable?: boolean
  closeLabel?: string
  decorative?: boolean
  ui?: AlertUi
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
