<script setup lang="ts">
import { createToggleController, Toggle as ToggleRoot } from '@ui-sdk/vue/toggle'
import { computed, useAttrs } from 'vue'
import { getColorVariables, getRadiusVariables, oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
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

const leadingProps = computed(() =>
  useUi({
    base: { class: toggleSlotVariants({ size: size.value }) },
    resolver: props.ui?.leading,
  }),
)

const trailingProps = computed(() =>
  useUi({
    base: { class: toggleSlotVariants({ size: size.value }) },
    resolver: props.ui?.trailing,
  }),
)

const labelProps = computed(() => useUi({ base: { class: 'truncate' }, resolver: props.ui?.label }))

const leadingIconProps = computed(() => ({
  ...useUi({ base: { class: toggleIconVariants() }, resolver: props.ui?.leadingIcon }),
  name: props.leadingIcon!,
}))

const trailingIconProps = computed(() => ({
  ...useUi({ base: { class: toggleIconVariants() }, resolver: props.ui?.trailingIcon }),
  name: props.trailingIcon!,
}))

const rootProps = computed(() => ({
  ...useUi({
    base: {
      class: toggleVariants({
        size: size.value,
        variant: oneOf(props.variant, toggleVariantNames, toggleDefaults.variant),
      }),
      style: [
        getColorVariables(props.color, 'toggle', toggleDefaults.color),
        getRadiusVariables(props.radius, 'toggle', toggleDefaults.radius),
      ],
    },
    resolver: props.ui?.root,
    attrs,
  }),
  pressed: props.modelValue,
  defaultPressed: props.defaultValue,
  'onUpdate:pressed': (value: boolean) => emit('update:modelValue', value),
  onPressedChange: (value: boolean, details: TogglePressedChangeDetails) =>
    emit('pressedChange', value, details),
  disabled: props.disabled,
  focusableWhenDisabled: props.focusableWhenDisabled,
  controller,
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
      <span v-if="hasLeading" data-ui="toggle-leading" v-bind="leadingProps">
        <slot name="leading" :pressed="state.pressed">
          <Icon v-if="leadingIcon" data-ui="toggle-leading-icon" v-bind="leadingIconProps" />
        </slot>
      </span>
      <slot :pressed="state.pressed">
        <span v-if="label" data-ui="toggle-label" v-bind="labelProps">{{ label }}</span>
      </slot>
      <span v-if="hasTrailing" data-ui="toggle-trailing" v-bind="trailingProps">
        <slot name="trailing" :pressed="state.pressed">
          <Icon v-if="trailingIcon" data-ui="toggle-trailing-icon" v-bind="trailingIconProps" />
        </slot>
      </span>
    </template>
  </ToggleRoot>
</template>
