import type {
  formFieldOrientations,
  formFieldSizes,
  formFieldVariantNames,
} from '@/components/FormField/constants'
import type { UiResolver } from '@/composables/useUi'

export type FormFieldSize = (typeof formFieldSizes)[number]

export type FormFieldOrientation = (typeof formFieldOrientations)[number]

export type FormFieldVariant = (typeof formFieldVariantNames)[number]

export interface FormFieldUi {
  root?: UiResolver
  header?: UiResolver
  label?: UiResolver
  hint?: UiResolver
  description?: UiResolver
  container?: UiResolver
  error?: UiResolver
}

export interface FormFieldProps {
  label?: string
  description?: string
  hint?: string
  error?: string | boolean
  name?: string
  size?: FormFieldSize
  orientation?: FormFieldOrientation
  variant?: FormFieldVariant
  required?: boolean
  disabled?: boolean
  ui?: FormFieldUi
}

export interface FormFieldSlots {
  default?(): unknown
  label?(): unknown
  hint?(): unknown
  description?(): unknown
  error?(props: { message: string }): unknown
}
