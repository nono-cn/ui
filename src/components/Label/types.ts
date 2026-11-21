import type { UiResolver } from '@/composables/useUi'

export interface LabelUi {
  root?: UiResolver
}

export interface LabelProps {
  label?: string
  for?: string
  ui?: LabelUi
}

export interface LabelSlots {
  default?(): unknown
}
