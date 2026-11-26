<script setup lang="ts">
import { createToggleController, Toggle as ToggleRoot } from '@ui-sdk/vue/toggle'
import { computed, useAttrs } from 'vue'
import { getColorVariables, getRadiusVariables, oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import { toggleDefaults, toggleSizes, toggleVariantNames } from '@/components/Toggle/constants'
import { toggleUiExclude } from '@/components/Toggle/exclude'
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
  activeVariant: toggleDefaults.activeVariant,
  color: toggleDefaults.color,
  activeColor: toggleDefaults.activeColor,
  size: toggleDefaults.size,
  radius: toggleDefaults.radius,
  square: undefined,
  disabled: undefined,
  focusableWhenDisabled: undefined,
})

const emit = defineEmits<ToggleEmits>()
const slots = defineSlots<ToggleSlots>()
const attrs = useAttrs()

const controller = createToggleController()

const size = computed(() => oneOf(props.size, toggleSizes, toggleDefaults.size))
const hasLeading = computed(() => Boolean(props.icon || slots.leading))
const hasTrailing = computed(() => Boolean(props.trailingIcon || slots.trailing))
const square = computed(
  () => props.square ?? (!props.label && !slots.default && (hasLeading.value || hasTrailing.value)),
)

const leadingProps = computed(() => ({ class: toggleSlotVariants({ size: size.value }) }))

const trailingProps = computed(() => ({ class: toggleSlotVariants({ size: size.value }) }))

const labelProps = computed(() =>
  useUi({ base: { class: 'truncate' }, ui: props.ui?.label?.(), exclude: toggleUiExclude.label }),
)

const leadingIconProps = computed(() => ({
  ...useUi({
    base: { class: toggleIconVariants() },
    ui: props.ui?.leadingIcon?.(),
    exclude: toggleUiExclude.leadingIcon,
  }),
  name: props.icon!,
}))

const trailingIconProps = computed(() => ({
  ...useUi({
    base: { class: toggleIconVariants() },
    ui: props.ui?.trailingIcon?.(),
    exclude: toggleUiExclude.trailingIcon,
  }),
  name: props.trailingIcon!,
}))

const rootProps = computed(() => ({
  ...useUi({
    base: [
      {
        class: toggleVariants({
          size: size.value,
          variant: oneOf(props.variant, toggleVariantNames, toggleDefaults.variant),
          activeVariant: oneOf(
            props.activeVariant,
            toggleVariantNames,
            toggleDefaults.activeVariant,
          ),
          square: square.value,
        }),
        style: [
          getColorVariables(props.color, 'toggle-inactive', toggleDefaults.color),
          getColorVariables(props.activeColor, 'toggle-active', toggleDefaults.activeColor),
          getRadiusVariables(props.radius, 'toggle', toggleDefaults.radius),
        ],
      },
      attrs,
    ],
    ui: props.ui?.root?.(),
    exclude: toggleUiExclude.root,
  }),
  pressed: props.modelValue,
  defaultPressed: props.defaultValue,
  value: props.value,
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
          <Icon v-if="icon" data-ui="toggle-leading-icon" v-bind="leadingIconProps" />
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
