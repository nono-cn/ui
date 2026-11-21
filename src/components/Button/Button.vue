<script setup lang="ts">
import { Button as ButtonRoot } from '@ui-sdk/vue/button'
import { computed, useAttrs } from 'vue'
import { cn } from '@/composables/cn'
import { getColorVariables, getRadiusVariables, oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
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

const leadingProps = computed(() =>
  useUi({
    base: { class: buttonLeadingVariants({ size: size.value }) },
    resolver: props.ui?.leading,
  }),
)

const trailingProps = computed(() =>
  useUi({
    base: { class: buttonTrailingVariants({ size: size.value }) },
    resolver: props.ui?.trailing,
  }),
)

const labelProps = computed(() => useUi({ base: { class: 'truncate' }, resolver: props.ui?.label }))

const spinnerProps = computed(() => ({
  ...useUi({
    base: { class: cn(buttonIconVariants(), 'animate-spin') },
    resolver: props.ui?.spinner,
  }),
  name: 'spinner' as const,
}))

const leadingIconProps = computed(() => ({
  ...useUi({ base: { class: buttonIconVariants() }, resolver: props.ui?.leadingIcon }),
  name: props.leadingIcon!,
}))

const trailingIconProps = computed(() => ({
  ...useUi({ base: { class: buttonIconVariants() }, resolver: props.ui?.trailingIcon }),
  name: props.trailingIcon!,
}))

const rootProps = computed(() => ({
  ...useUi({
    base: {
      class: buttonVariants({
        size: size.value,
        variant: oneOf(props.variant, buttonVariantNames, buttonDefaults.variant),
        block: props.block,
      }),
      style: [
        getColorVariables(props.color, 'button', buttonDefaults.color),
        getRadiusVariables(props.radius, 'button', buttonDefaults.radius),
      ],
    },
    resolver: props.ui?.root,
    attrs,
  }),
  disabled: props.disabled,
  focusableWhenDisabled: props.focusableWhenDisabled,
  type: props.type,
  pendingAnnouncement: props.pendingAnnouncement,
  onClick: props.onClick,
}))
</script>

<template>
  <ButtonRoot data-ui="button-root" v-bind="rootProps">
    <template #default="{ state }">
      <span v-if="hasLeading || state.pending" data-ui="button-leading" v-bind="leadingProps">
        <slot v-if="state.pending" name="loading">
          <Icon data-ui="button-spinner" v-bind="spinnerProps" />
        </slot>
        <slot v-else name="leading">
          <Icon v-if="leadingIcon" data-ui="button-leading-icon" v-bind="leadingIconProps" />
        </slot>
      </span>
      <slot>
        <span v-if="label" data-ui="button-label" v-bind="labelProps">{{ label }}</span>
      </slot>
      <span v-if="hasTrailing" data-ui="button-trailing" v-bind="trailingProps">
        <slot name="trailing">
          <Icon v-if="trailingIcon" data-ui="button-trailing-icon" v-bind="trailingIconProps" />
        </slot>
      </span>
    </template>
  </ButtonRoot>
</template>
