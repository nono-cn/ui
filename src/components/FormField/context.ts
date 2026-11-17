import { inject, provide, type InjectionKey } from 'vue'
import type { FormFieldSize } from '@/components/FormField/types'

export interface FormFieldContext {
  size: () => FormFieldSize
  required: () => boolean | undefined
  describedBy: () => string | undefined
}

const formFieldKey: InjectionKey<FormFieldContext> = Symbol('form-field')

export function provideFormField(context: FormFieldContext) {
  provide(formFieldKey, context)
}

export function useFormField() {
  return inject(formFieldKey, null)
}

export function describedBy(own: unknown, field: FormFieldContext | null) {
  const ids = [own, field?.describedBy()].filter((id) => typeof id === 'string' && id)
  return ids.length ? ids.join(' ') : undefined
}
