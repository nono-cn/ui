<script setup lang="ts">
import { Button as ButtonRoot } from '@ui-sdk/vue/button'
import { computed, useAttrs } from 'vue'
import { cn, type ClassValue } from '@/composables/cn'
import { getColorVariables, getRadiusVariables, oneOf } from '@/composables/useTheme'
import { buttonDefaults, buttonSizes, buttonVariantNames } from '@/components/Button/constants'
import type { ButtonProps, ButtonSlots } from '@/components/Button/types'
import {
  buttonIconVariants,
  buttonLeadingVariants,
  buttonTrailingVariants,
  buttonVariants,
} from '@/components/Button/variants'
import Icon from '@/components/Icon/Icon.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: buttonDefaults.variant,
  color: buttonDefaults.color,
  size: buttonDefaults.size,
  radius: buttonDefaults.radius,
  type: undefined,
  pendingAnnouncement: undefined,
  onClick: undefined,
})

const slots = defineSlots<ButtonSlots>()
const attrs = useAttrs()

const size = computed(() => oneOf(props.size, buttonSizes, buttonDefaults.size))
const hasLeading = computed(() => Boolean(props.leadingIcon || slots.leading))
const hasTrailing = computed(() => Boolean(props.trailingIcon || slots.trailing))

const leadingProps = computed(() => ({
  'data-slot': 'leading',
  class: buttonLeadingVariants({ size: size.value }),
}))

const trailingProps = computed(() => ({
  'data-slot': 'trailing',
  class: buttonTrailingVariants({ size: size.value }),
}))

const labelProps = {
  'data-slot': 'label',
  class: 'truncate',
}

const spinnerProps = {
  name: 'spinner' as const,
  'data-slot': 'spinner',
  class: cn(buttonIconVariants(), 'animate-spin'),
}

const leadingIconProps = computed(() => ({
  name: props.leadingIcon!,
  class: buttonIconVariants(),
}))

const trailingIconProps = computed(() => ({
  name: props.trailingIcon!,
  class: buttonIconVariants(),
}))

const rootProps = computed(() => ({
  ...attrs,
  disabled: props.disabled,
  focusableWhenDisabled: props.focusableWhenDisabled,
  type: props.type,
  pendingAnnouncement: props.pendingAnnouncement,
  onClick: props.onClick,
  class: cn(
    buttonVariants({
      size: size.value,
      variant: oneOf(props.variant, buttonVariantNames, buttonDefaults.variant),
      block: props.block,
    }),
    attrs.class as ClassValue,
  ),
  style: [
    getColorVariables(props.color, 'button', buttonDefaults.color),
    getRadiusVariables(props.radius, 'button', buttonDefaults.radius),
    attrs.style,
  ],
}))
</script>

<template>
  <ButtonRoot v-bind="rootProps">
    <template #default="{ state }">
      <span v-if="hasLeading || state.pending" v-bind="leadingProps">
        <slot v-if="state.pending" name="loading">
          <Icon v-bind="spinnerProps" />
        </slot>
        <slot v-else name="leading">
          <Icon v-if="leadingIcon" v-bind="leadingIconProps" />
        </slot>
      </span>
      <slot>
        <span v-if="label" v-bind="labelProps">{{ label }}</span>
      </slot>
      <span v-if="hasTrailing" v-bind="trailingProps">
        <slot name="trailing">
          <Icon v-if="trailingIcon" v-bind="trailingIconProps" />
        </slot>
      </span>
    </template>
  </ButtonRoot>
</template>
