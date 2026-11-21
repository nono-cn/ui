<script setup lang="ts">
import { InputClear, InputGroup, Input as InputRoot } from '@ui-sdk/vue/input'
import type { InputGroupState } from '@ui-sdk/vue/input'
import { computed, useAttrs } from 'vue'
import { getColorVariables, getRadiusVariables, oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import { useFormField } from '@/components/FormField/context'
import { inputDefaults, inputSizes, inputVariantNames } from '@/components/Input/constants'
import type { InputEmits, InputProps, InputSlots } from '@/components/Input/types'
import {
  inputClearVariants,
  inputIconVariants,
  inputLeadingVariants,
  inputRootVariants,
  inputTrailingVariants,
  inputVariants,
} from '@/components/Input/variants'
import Icon from '@/components/Icon/Icon.vue'
import { useLocale } from '@/i18n/useLocale'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  type: inputDefaults.type,
  placeholder: undefined,
  variant: inputDefaults.variant,
  color: inputDefaults.color,
  size: undefined,
  radius: inputDefaults.radius,
  clearable: false,
  clearLabel: undefined,
  highlight: false,
  disabled: undefined,
  readOnly: undefined,
  required: undefined,
})

const emit = defineEmits<InputEmits>()
const slots = defineSlots<InputSlots>()
const attrs = useAttrs()
const { t } = useLocale()
const formField = useFormField()

const size = computed(() => oneOf(props.size ?? formField?.size(), inputSizes, inputDefaults.size))
const hasLeading = computed(() => Boolean(props.leadingIcon || slots.leading))
const hasTrailing = computed(() => Boolean(props.trailingIcon || slots.trailing))

const leadingProps = computed(() =>
  useUi({
    base: { class: inputLeadingVariants({ size: size.value }) },
    resolver: props.ui?.leading,
  }),
)

const trailingProps = computed(() =>
  useUi({
    base: { class: inputTrailingVariants({ size: size.value }) },
    resolver: props.ui?.trailing,
  }),
)

const clearProps = computed(() =>
  useUi({
    base: {
      'aria-label': props.clearLabel || t('clear'),
      class: inputClearVariants({ size: size.value }),
    },
    resolver: props.ui?.clear,
  }),
)

const leadingIconProps = computed(() => ({
  ...useUi({ base: { class: inputIconVariants() }, resolver: props.ui?.leadingIcon }),
  name: props.leadingIcon!,
}))

const trailingIconProps = computed(() => ({
  ...useUi({ base: { class: inputIconVariants() }, resolver: props.ui?.trailingIcon }),
  name: props.trailingIcon!,
}))

const clearIconProps = computed(() => ({
  ...useUi({ base: { class: 'size-full' }, resolver: props.ui?.clearIcon }),
  name: 'x' as const,
}))

const rootProps = computed(() =>
  useUi({
    base: {
      class: inputRootVariants(),
      style: [
        getColorVariables(props.color, 'input', inputDefaults.color),
        getRadiusVariables(props.radius, 'input', inputDefaults.radius),
      ],
    },
    resolver: props.ui?.root,
    attrs: { class: attrs.class, style: attrs.style },
  }),
)

const inputProps = computed(() => {
  const rest = Object.fromEntries(
    Object.entries(attrs).filter(([key]) => key !== 'class' && key !== 'style'),
  )

  return {
    ...useUi({
      base: {
        class: inputVariants({
          size: size.value,
          variant: oneOf(props.variant, inputVariantNames, inputDefaults.variant),
          highlight: props.highlight,
          leading: hasLeading.value,
          trailing: hasTrailing.value,
          clearable: props.clearable,
        }),
      },
      resolver: props.ui?.input,
      attrs: rest,
    }),
    type: props.type,
    modelValue: props.modelValue,
    defaultValue: props.defaultValue,
    'onUpdate:modelValue': (value: string) => emit('update:modelValue', value),
    placeholder: props.placeholder,
    disabled: props.disabled,
    readOnly: props.readOnly,
    required: props.required ?? formField?.required(),
  }
})

function showsClear(state: InputGroupState) {
  return props.clearable && state.filled && !state.disabled && !state.readOnly
}
</script>

<template>
  <InputGroup data-ui="input-root" v-bind="rootProps">
    <template #default="{ state }">
      <span v-if="hasLeading" data-ui="input-leading" v-bind="leadingProps">
        <slot name="leading">
          <Icon v-if="leadingIcon" data-ui="input-leading-icon" v-bind="leadingIconProps" />
        </slot>
      </span>
      <InputRoot data-ui="input-input" v-bind="inputProps" />
      <span v-if="hasTrailing || showsClear(state)" data-ui="input-trailing" v-bind="trailingProps">
        <InputClear v-if="clearable" data-ui="input-clear" v-bind="clearProps">
          <slot name="iconClear">
            <Icon data-ui="input-clear-icon" v-bind="clearIconProps" />
          </slot>
        </InputClear>
        <slot name="trailing">
          <Icon v-if="trailingIcon" data-ui="input-trailing-icon" v-bind="trailingIconProps" />
        </slot>
      </span>
    </template>
  </InputGroup>
</template>
