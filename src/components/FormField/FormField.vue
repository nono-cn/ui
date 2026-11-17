<script setup lang="ts">
import { Field, FieldDescription, FieldError, FieldLabel } from '@ui-sdk/vue/field'
import { computed, useAttrs } from 'vue'
import { cn, type ClassValue } from '@/composables/cn'
import { oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import { formFieldDefaults, formFieldSizes } from '@/components/FormField/constants'
import { provideFormField } from '@/components/FormField/context'
import type { FormFieldProps, FormFieldSlots } from '@/components/FormField/types'
import {
  formFieldContainerVariants,
  formFieldDescriptionVariants,
  formFieldErrorVariants,
  formFieldHeaderVariants,
  formFieldHintVariants,
  formFieldLabelVariants,
  formFieldVariants,
} from '@/components/FormField/variants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<FormFieldProps>(), {
  error: undefined,
  size: formFieldDefaults.size,
  required: undefined,
  disabled: undefined,
})

const slots = defineSlots<FormFieldSlots>()
const attrs = useAttrs()

const size = computed(() => oneOf(props.size, formFieldSizes, formFieldDefaults.size))
const errorMessage = computed(() => (typeof props.error === 'string' ? props.error : ''))
const invalid = computed(() => (props.error === undefined ? undefined : Boolean(props.error)))
const hasLabel = computed(() => Boolean(props.label || slots.label))
const hasHint = computed(() => Boolean(props.hint || slots.hint))
const hasDescription = computed(() => Boolean(props.description || slots.description))

provideFormField({
  size: () => size.value,
  required: () => props.required,
})

const rootProps = computed(() => ({
  ...attrs,
  name: props.name,
  disabled: props.disabled,
  invalid: invalid.value,
  class: cn(formFieldVariants(), attrs.class as ClassValue),
}))

const headerProps = computed(() =>
  useUi({ 'data-slot': 'header', class: formFieldHeaderVariants() }, props.ui?.header),
)

const labelProps = computed(() =>
  useUi({ class: formFieldLabelVariants({ size: size.value }) }, props.ui?.label),
)

const hintProps = computed(() =>
  useUi(
    { 'data-slot': 'hint', class: formFieldHintVariants({ size: size.value }) },
    props.ui?.hint,
  ),
)

const descriptionProps = computed(() =>
  useUi({ class: formFieldDescriptionVariants({ size: size.value }) }, props.ui?.description),
)

const containerProps = computed(() =>
  useUi({ 'data-slot': 'container', class: formFieldContainerVariants() }, props.ui?.container),
)

const errorProps = computed(() =>
  useUi({ class: formFieldErrorVariants({ size: size.value }) }, props.ui?.error),
)
</script>

<template>
  <Field v-bind="rootProps">
    <template #default="{ state }">
      <div v-if="hasLabel || hasHint" v-bind="headerProps">
        <FieldLabel v-if="hasLabel" v-bind="labelProps">
          <slot name="label">{{ label }}</slot>
        </FieldLabel>
        <span v-if="hasHint" v-bind="hintProps">
          <slot name="hint">{{ hint }}</slot>
        </span>
      </div>
      <div v-bind="containerProps">
        <slot />
      </div>
      <FieldError v-bind="errorProps">
        <template #default="{ state: errorState }">
          <slot name="error" :message="errorMessage || errorState.message">
            {{ errorMessage || errorState.message }}
          </slot>
        </template>
      </FieldError>
      <FieldDescription v-if="hasDescription && !state.invalid" v-bind="descriptionProps">
        <slot name="description">{{ description }}</slot>
      </FieldDescription>
    </template>
  </Field>
</template>
