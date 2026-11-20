<script setup lang="ts">
import { createCheckboxController, type CheckedState } from '@ui-sdk/core/checkbox'
import { Checkbox as CheckboxRoot, CheckboxIndicator } from '@ui-sdk/vue/checkbox'
import { computed, useAttrs } from 'vue'
import { cn, type ClassValue } from '@/composables/cn'
import { getColorVariables, getRadiusVariables, oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import { useFormField } from '@/components/FormField/context'
import { checkboxDefaults, checkboxSizes } from '@/components/Checkbox/constants'
import type {
  CheckboxChangeDetails,
  CheckboxEmits,
  CheckboxExpose,
  CheckboxIndicatorState,
  CheckboxProps,
  CheckboxSlots,
} from '@/components/Checkbox/types'
import {
  checkboxIconVariants,
  checkboxIndicatorVariants,
  checkboxVariants,
} from '@/components/Checkbox/variants'
import Icon from '@/components/Icon/Icon.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  color: checkboxDefaults.color,
  size: undefined,
  radius: checkboxDefaults.radius,
  icon: checkboxDefaults.icon,
  indeterminateIcon: checkboxDefaults.indeterminateIcon,
  disabled: undefined,
  readOnly: undefined,
  required: undefined,
})

const emit = defineEmits<CheckboxEmits>()
defineSlots<CheckboxSlots>()
const attrs = useAttrs()
const formField = useFormField()

const controller = createCheckboxController()

const size = computed(() =>
  oneOf(props.size ?? formField?.size(), checkboxSizes, checkboxDefaults.size),
)

const rootProps = computed(() => ({
  ...attrs,
  class: cn(checkboxVariants({ size: size.value }), attrs.class as ClassValue),
  style: [
    getColorVariables(props.color, 'checkbox', checkboxDefaults.color),
    getRadiusVariables(props.radius, 'checkbox', checkboxDefaults.radius),
    attrs.style,
  ],
  checked: props.modelValue,
  defaultChecked: props.defaultValue,
  'onUpdate:checked': (value: CheckedState) => emit('update:modelValue', value),
  onCheckedChange: (checked: CheckedState, details: CheckboxChangeDetails) =>
    emit('checkedChange', checked, details),
  disabled: props.disabled,
  readOnly: props.readOnly,
  required: props.required ?? formField?.required(),
  name: props.name,
  value: props.value,
  form: props.form,
  controller,
}))

function indicatorState(state: CheckboxIndicatorState): CheckboxIndicatorState {
  return { checked: state.checked, indeterminate: state.indeterminate }
}

function indicatorProps(state: CheckboxIndicatorState) {
  return useUi({ class: checkboxIndicatorVariants() }, props.ui?.indicator, state)
}

function iconProps(state: CheckboxIndicatorState) {
  return useUi(
    {
      name: state.indeterminate ? props.indeterminateIcon : props.icon,
      'data-slot': 'icon',
      stroke: 3,
      class: checkboxIconVariants(),
    },
    props.ui?.icon,
    state,
  )
}

defineExpose<CheckboxExpose>({
  toggle: (details) => controller.toggle(details),
  setChecked: (checked, details) => controller.setChecked(checked, details),
  getChecked: () => controller.getChecked(),
  focus: () => controller.focus(),
})
</script>

<template>
  <CheckboxRoot v-bind="rootProps">
    <template #default="{ state }">
      <CheckboxIndicator v-bind="indicatorProps(indicatorState(state))">
        <slot name="indicator" v-bind="indicatorState(state)">
          <Icon v-bind="iconProps(indicatorState(state))" />
        </slot>
      </CheckboxIndicator>
    </template>
  </CheckboxRoot>
</template>
