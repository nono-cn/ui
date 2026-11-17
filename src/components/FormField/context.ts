import { inject, provide, type InjectionKey } from 'vue'
import type { FormFieldSize } from '@/components/FormField/types'

export interface FormFieldContext {
  size: () => FormFieldSize
  required: () => boolean | undefined
}

const formFieldKey: InjectionKey<FormFieldContext> = Symbol('form-field')

export function provideFormField(context: FormFieldContext) {
  provide(formFieldKey, context)
}

export function useFormField() {
  return inject(formFieldKey, null)
}
