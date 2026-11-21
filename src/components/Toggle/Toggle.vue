<script setup lang="ts">
import { createToggleController, Toggle as ToggleRoot, ToggleIcon } from '@ui-sdk/vue/toggle'
import { computed, useAttrs } from 'vue'
import { cn, type ClassValue } from '@/composables/cn'
import { getColorVariables, getRadiusVariables, oneOf } from '@/composables/useTheme'
import { toggleDefaults, toggleSizes, toggleVariantNames } from '@/components/Toggle/constants'
import type {
  ToggleEmits,
  ToggleExpose,
  TogglePressedChangeDetails,
  ToggleProps,
  ToggleSlots,
} from '@/components/Toggle/types'
import {
  toggleIconVariants,
  toggleSlotVariants,
  toggleVariants,
} from '@/components/Toggle/variants'
import Icon from '@/components/Icon/Icon.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ToggleProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  variant: toggleDefaults.variant,
  color: toggleDefaults.color,
  size: toggleDefaults.size,
  radius: toggleDefaults.radius,
  disabled: undefined,
  focusableWhenDisabled: undefined,
})

const emit = defineEmits<ToggleEmits>()
const slots = defineSlots<ToggleSlots>()
const attrs = useAttrs()

const controller = createToggleController()

const size = computed(() => oneOf(props.size, toggleSizes, toggleDefaults.size))
const hasLeading = computed(() => Boolean(props.leadingIcon || slots.leading))
const hasTrailing = computed(() => Boolean(props.trailingIcon || slots.trailing))

const slotProps = computed(() => ({ class: toggleSlotVariants({ size: size.value }) }))
const iconClass = toggleIconVariants()

const rootProps = computed(() => ({
  ...attrs,
  pressed: props.modelValue,
  defaultPressed: props.defaultValue,
  'onUpdate:pressed': (value: boolean) => emit('update:modelValue', value),
  onPressedChange: (value: boolean, details: TogglePressedChangeDetails) =>
    emit('pressedChange', value, details),
  disabled: props.disabled,
  focusableWhenDisabled: props.focusableWhenDisabled,
  controller,
  class: cn(
    toggleVariants({
      size: size.value,
      variant: oneOf(props.variant, toggleVariantNames, toggleDefaults.variant),
    }),
    attrs.class as ClassValue,
  ),
  style: [
    getColorVariables(props.color, 'toggle', toggleDefaults.color),
    getRadiusVariables(props.radius, 'toggle', toggleDefaults.radius),
    attrs.style,
  ],
}))

defineExpose<ToggleExpose>({
  toggle: (options) => controller.toggle(options),
  setPressed: (value, options) => controller.setPressed(value, options),
  isPressed: () => controller.isPressed(),
  focus: () => controller.focus(),
})
</script>

<template>
  <ToggleRoot data-ui="toggle-root" v-bind="rootProps">
    <template #default="{ state }">
      <ToggleIcon v-if="hasLeading" data-ui="toggle-leading" v-bind="slotProps">
        <slot name="leading" :pressed="state.pressed">
          <Icon
            v-if="leadingIcon"
            data-ui="toggle-leading-icon"
            :name="leadingIcon"
            :class="iconClass"
          />
        </slot>
      </ToggleIcon>
      <slot :pressed="state.pressed">
        <span v-if="label" data-ui="toggle-label" class="truncate">{{ label }}</span>
      </slot>
      <ToggleIcon v-if="hasTrailing" data-ui="toggle-trailing" v-bind="slotProps">
        <slot name="trailing" :pressed="state.pressed">
          <Icon
            v-if="trailingIcon"
            data-ui="toggle-trailing-icon"
            :name="trailingIcon"
            :class="iconClass"
          />
        </slot>
      </ToggleIcon>
    </template>
  </ToggleRoot>
</template>
