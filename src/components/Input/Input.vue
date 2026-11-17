<script setup lang="ts">
import { InputClear, InputGroup, Input as InputRoot } from '@ui-sdk/vue/input'
import type { InputGroupState } from '@ui-sdk/vue/input'
import { computed, useAttrs } from 'vue'
import { cn, type ClassValue } from '@/composables/cn'
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
  useUi(
    { 'data-slot': 'leading', class: inputLeadingVariants({ size: size.value }) },
    props.ui?.leading,
  ),
)

const trailingProps = computed(() =>
  useUi(
    { 'data-slot': 'trailing', class: inputTrailingVariants({ size: size.value }) },
    props.ui?.trailing,
  ),
)

const clearProps = computed(() =>
  useUi(
    {
      'aria-label': props.clearLabel || t('clear'),
      class: inputClearVariants({ size: size.value }),
    },
    props.ui?.clear,
  ),
)

const iconClass = inputIconVariants()

const rootProps = computed(() => ({
  'data-slot': 'input-group',
  class: cn(inputRootVariants(), attrs.class as ClassValue),
  style: [
    getColorVariables(props.color, 'input', inputDefaults.color),
    getRadiusVariables(props.radius, 'input', inputDefaults.radius),
    attrs.style,
  ],
}))

const inputProps = computed(() => {
  const rest = Object.fromEntries(
    Object.entries(attrs).filter(([key]) => key !== 'class' && key !== 'style'),
  )

  return {
    'data-slot': 'input',
    ...rest,
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

function inputBindings(state: InputGroupState) {
  const items = Number(hasTrailing.value) + Number(showsClear(state))

  return useUi(
    {
      ...inputProps.value,
      class: inputVariants({
        size: size.value,
        variant: oneOf(props.variant, inputVariantNames, inputDefaults.variant),
        highlight: props.highlight,
        leading: hasLeading.value,
        trailing: (['none', 'one', 'two'] as const)[items],
      }),
    },
    props.ui?.input,
  )
}
</script>

<template>
  <InputGroup v-bind="rootProps">
    <template #default="{ state }">
      <span v-if="hasLeading" v-bind="leadingProps">
        <slot name="leading">
          <Icon v-if="leadingIcon" :name="leadingIcon" :class="iconClass" />
        </slot>
      </span>
      <InputRoot v-bind="inputBindings(state)" />
      <span v-if="hasTrailing || showsClear(state)" v-bind="trailingProps">
        <InputClear v-if="clearable" v-bind="clearProps">
          <slot name="clear">
            <Icon name="x" class="size-full" />
          </slot>
        </InputClear>
        <slot name="trailing">
          <Icon v-if="trailingIcon" :name="trailingIcon" :class="iconClass" />
        </slot>
      </span>
    </template>
  </InputGroup>
</template>
