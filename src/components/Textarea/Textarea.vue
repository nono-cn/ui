<script setup lang="ts">
import { Textarea as TextareaRoot } from '@ui-sdk/vue/textarea'
import { computed, useAttrs } from 'vue'
import { getColorVariables, getRadiusVariables, oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import { useFormField } from '@/components/FormField/context'
import {
  textareaDefaults,
  textareaSizes,
  textareaVariantNames,
} from '@/components/Textarea/constants'
import { textareaUiExclude } from '@/components/Textarea/exclude'
import type { TextareaEmits, TextareaProps } from '@/components/Textarea/types'
import { textareaVariants } from '@/components/Textarea/variants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TextareaProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  variant: textareaDefaults.variant,
  color: textareaDefaults.color,
  size: undefined,
  radius: textareaDefaults.radius,
  autoResize: false,
  highlight: false,
  disabled: undefined,
  readOnly: undefined,
  required: undefined,
  submitShortcut: undefined,
  onSubmit: undefined,
})

const emit = defineEmits<TextareaEmits>()
const attrs = useAttrs()
const formField = useFormField()

const rootProps = computed(() => ({
  ...useUi({
    base: [
      {
        rows: textareaDefaults.rows,
        class: textareaVariants({
          size: oneOf(props.size ?? formField?.size(), textareaSizes, textareaDefaults.size),
          variant: oneOf(props.variant, textareaVariantNames, textareaDefaults.variant),
          autoResize: props.autoResize,
          highlight: props.highlight,
        }),
        style: [
          getColorVariables(props.color, 'textarea', textareaDefaults.color),
          getRadiusVariables(props.radius, 'textarea', textareaDefaults.radius),
        ],
      },
      attrs,
    ],
    ui: props.ui?.root?.(),
    exclude: textareaUiExclude.root,
  }),
  modelValue: props.modelValue,
  defaultValue: props.defaultValue,
  'onUpdate:modelValue': (value: string) => emit('update:modelValue', value),
  autoResize: props.autoResize,
  disabled: props.disabled,
  readOnly: props.readOnly,
  required: props.required ?? formField?.required(),
  submitShortcut: props.submitShortcut,
  onSubmit: props.onSubmit,
}))
</script>

<template>
  <TextareaRoot data-ui="textarea-root" v-bind="rootProps" />
</template>
