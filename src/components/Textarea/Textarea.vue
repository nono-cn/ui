<script setup lang="ts">
import { Textarea as TextareaRoot } from '@ui-sdk/vue/textarea'
import { computed, useAttrs } from 'vue'
import { cn, type ClassValue } from '@/composables/cn'
import { getColorVariables, getRadiusVariables, oneOf } from '@/composables/useTheme'
import {
  textareaDefaults,
  textareaSizes,
  textareaVariantNames,
} from '@/components/Textarea/constants'
import type { TextareaEmits, TextareaProps } from '@/components/Textarea/types'
import { textareaVariants } from '@/components/Textarea/variants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TextareaProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  placeholder: undefined,
  variant: textareaDefaults.variant,
  color: textareaDefaults.color,
  size: textareaDefaults.size,
  radius: textareaDefaults.radius,
  rows: textareaDefaults.rows,
  autoResize: false,
  highlight: false,
  invalid: false,
  disabled: undefined,
  readOnly: undefined,
  required: undefined,
  submitShortcut: undefined,
  onSubmit: undefined,
})

const emit = defineEmits<TextareaEmits>()
const attrs = useAttrs()

const rootProps = computed(() => ({
  'data-slot': 'textarea',
  ...attrs,
  modelValue: props.modelValue,
  defaultValue: props.defaultValue,
  'onUpdate:modelValue': (value: string) => emit('update:modelValue', value),
  placeholder: props.placeholder,
  rows: props.rows,
  autoResize: props.autoResize,
  disabled: props.disabled,
  readOnly: props.readOnly,
  required: props.required,
  submitShortcut: props.submitShortcut,
  onSubmit: props.onSubmit,
  'aria-invalid': props.invalid ? true : (attrs['aria-invalid'] as boolean | undefined),
  class: cn(
    textareaVariants({
      size: oneOf(props.size, textareaSizes, textareaDefaults.size),
      variant: oneOf(props.variant, textareaVariantNames, textareaDefaults.variant),
      autoResize: props.autoResize,
      highlight: props.highlight,
    }),
    attrs.class as ClassValue,
  ),
  style: [
    getColorVariables(props.color, 'textarea', textareaDefaults.color),
    getRadiusVariables(props.radius, 'textarea', textareaDefaults.radius),
    attrs.style,
  ],
}))
</script>

<template>
  <TextareaRoot v-bind="rootProps" />
</template>
