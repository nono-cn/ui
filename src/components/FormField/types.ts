import type { formFieldSizes } from '@/components/FormField/constants'
import type { UiResolver } from '@/composables/useUi'

export type FormFieldSize = (typeof formFieldSizes)[number]

export interface FormFieldUi {
  header?: UiResolver
  label?: UiResolver
  hint?: UiResolver
  description?: UiResolver
  container?: UiResolver
  error?: UiResolver
  help?: UiResolver
}

export interface FormFieldProps {
  label?: string
  description?: string
  hint?: string
  help?: string
  error?: string | boolean
  name?: string
  size?: FormFieldSize
  required?: boolean
  disabled?: boolean
  ui?: FormFieldUi
}

export interface FormFieldSlots {
  default?(): unknown
  label?(): unknown
  hint?(): unknown
  description?(): unknown
  help?(): unknown
  error?(props: { message: string }): unknown
}
