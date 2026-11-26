import { Field, FieldDescription, FieldError, FieldLabel } from '@ui-sdk/vue/field'
import { propsOf } from '@/composables/useUi'
import type { FormFieldUi } from '@/components/FormField/types'

export const formFieldUiExclude = {
  root: [...propsOf(Field), 'dataOrientation', 'dataVariant'],
  label: propsOf(FieldLabel),
  hint: [],
  description: propsOf(FieldDescription),
  container: [],
  error: propsOf(FieldError),
} satisfies Record<keyof FormFieldUi, readonly string[]>
