<script setup lang="ts">
import { Button as ButtonRoot } from '@ui-sdk/vue/button'
import { computed, useAttrs } from 'vue'
import { cn } from '@/composables/cn'
import { getColorVariables, getRadiusVariables, oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import { buttonDefaults, buttonSizes, buttonVariantNames } from '@/components/Button/constants'
import type { ButtonInternalSlots, ButtonProps, ButtonSlots } from '@/components/Button/types'
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

const slots = defineSlots<ButtonSlots & ButtonInternalSlots>()
const attrs = useAttrs()

const size = computed(() => oneOf(props.size, buttonSizes, buttonDefaults.size))
const hasLeading = computed(() => Boolean(props.leadingIcon || slots.leading))
const hasTrailing = computed(() => Boolean(props.trailingIcon || slots.trailing))

const leadingProps = computed(() =>
  useUi({ class: buttonLeadingVariants({ size: size.value }) }, props.ui?.leading?.()),
)

const trailingProps = computed(() =>
  useUi({ class: buttonTrailingVariants({ size: size.value }) }, props.ui?.trailing?.()),
)

const labelProps = computed(() => useUi({ class: 'truncate' }, props.ui?.label?.()))

const spinnerProps = computed(() => ({
  ...useUi({ class: cn(buttonIconVariants(), 'animate-spin') }, props.ui?.spinner?.()),
  name: 'spinner' as const,
}))

const leadingIconProps = computed(() => ({
  ...useUi({ class: buttonIconVariants() }, props.ui?.leadingIcon?.()),
  name: props.leadingIcon!,
}))

const trailingIconProps = computed(() => ({
  ...useUi({ class: buttonIconVariants() }, props.ui?.trailingIcon?.()),
  name: props.trailingIcon!,
}))

const rootProps = computed(() => ({
  ...useUi(
    [
      {
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
      attrs,
    ],
    props.ui?.root?.(),
  ),
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
    <template v-if="slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
  </ButtonRoot>
</template>
