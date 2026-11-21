<script setup lang="ts">
import { Field, FieldDescription, FieldError, FieldLabel } from '@ui-sdk/vue/field'
import { computed, useAttrs } from 'vue'
import { oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import {
  formFieldDefaults,
  formFieldOrientations,
  formFieldSizes,
  formFieldVariantNames,
} from '@/components/FormField/constants'
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
  orientation: formFieldDefaults.orientation,
  variant: formFieldDefaults.variant,
  required: undefined,
  disabled: undefined,
})

const slots = defineSlots<FormFieldSlots>()
const attrs = useAttrs()

const size = computed(() => oneOf(props.size, formFieldSizes, formFieldDefaults.size))
const orientation = computed(() =>
  oneOf(props.orientation, formFieldOrientations, formFieldDefaults.orientation),
)
const variant = computed(() =>
  oneOf(props.variant, formFieldVariantNames, formFieldDefaults.variant),
)
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
  ...useUi({
    base: { class: formFieldVariants({ orientation: orientation.value, variant: variant.value }) },
    resolver: props.ui?.root,
    attrs,
  }),
  name: props.name,
  disabled: props.disabled,
  invalid: invalid.value,
  'data-orientation': orientation.value,
  'data-variant': variant.value,
}))

const headerProps = computed(() =>
  useUi({
    base: { class: formFieldHeaderVariants({ orientation: orientation.value }) },
    resolver: props.ui?.header,
  }),
)

const labelProps = computed(() =>
  useUi({
    base: { class: formFieldLabelVariants({ size: size.value, variant: variant.value }) },
    resolver: props.ui?.label,
  }),
)

const hintProps = computed(() =>
  useUi({ base: { class: formFieldHintVariants({ size: size.value }) }, resolver: props.ui?.hint }),
)

const descriptionProps = computed(() =>
  useUi({
    base: {
      class: formFieldDescriptionVariants({ size: size.value, orientation: orientation.value }),
    },
    resolver: props.ui?.description,
  }),
)

const containerProps = computed(() =>
  useUi({
    base: { class: formFieldContainerVariants({ orientation: orientation.value }) },
    resolver: props.ui?.container,
  }),
)

const errorProps = computed(() =>
  useUi({
    base: { class: formFieldErrorVariants({ size: size.value, orientation: orientation.value }) },
    resolver: props.ui?.error,
  }),
)
</script>

<template>
  <Field data-ui="form-field-root" v-bind="rootProps">
    <template #default="{ state }">
      <div v-if="hasLabel || hasHint" data-ui="form-field-header" v-bind="headerProps">
        <FieldLabel v-if="hasLabel" data-ui="form-field-label" v-bind="labelProps">
          <slot name="label">{{ label }}</slot>
        </FieldLabel>
        <span v-if="hasHint" data-ui="form-field-hint" v-bind="hintProps">
          <slot name="hint">{{ hint }}</slot>
        </span>
      </div>
      <div data-ui="form-field-container" v-bind="containerProps">
        <slot />
      </div>
      <FieldError data-ui="form-field-error" v-bind="errorProps">
        <template #default="{ state: errorState }">
          <slot name="error" :message="errorMessage || errorState.message">
            {{ errorMessage || errorState.message }}
          </slot>
        </template>
      </FieldError>
      <FieldDescription
        v-if="hasDescription && !state.invalid"
        data-ui="form-field-description"
        v-bind="descriptionProps"
      >
        <slot name="description">{{ description }}</slot>
      </FieldDescription>
    </template>
  </Field>
</template>
