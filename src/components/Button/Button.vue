<script setup lang="ts">
import { Button as ButtonRoot } from '@ui-sdk/vue/button'
import { computed, useAttrs } from 'vue'
import { cn } from '@/composables/cn'
import { getColorVariables, getRadiusVariables, oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import { buttonDefaults, buttonSizes, buttonVariantNames } from '@/components/Button/constants'
import { buttonUiExclude } from '@/components/Button/exclude'
import { useButtonGroup } from '@/components/ButtonGroup/context'
import type { ButtonInternalSlots, ButtonProps, ButtonSlots } from '@/components/Button/types'
import {
  buttonIconVariants,
  buttonLabelVariants,
  buttonLeadingVariants,
  buttonTrailingVariants,
  buttonVariants,
} from '@/components/Button/variants'
import Icon from '@/components/Icon/Icon.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: buttonDefaults.variant,
  color: buttonDefaults.color,
  size: undefined,
  radius: buttonDefaults.radius,
  square: undefined,
  type: undefined,
  pendingAnnouncement: undefined,
  onClick: undefined,
})

const slots = defineSlots<ButtonSlots & ButtonInternalSlots>()
const attrs = useAttrs()

const buttonGroup = useButtonGroup()

const size = computed(() =>
  oneOf(props.size ?? buttonGroup?.size(), buttonSizes, buttonDefaults.size),
)
const hasLeading = computed(() => Boolean(props.icon || slots.leading))
const hasTrailing = computed(() => Boolean(props.trailingIcon || slots.trailing))
const square = computed(
  () => props.square ?? (!props.label && !slots.default && (hasLeading.value || hasTrailing.value)),
)

const leadingProps = computed(() => ({ class: buttonLeadingVariants({ size: size.value }) }))

const trailingProps = computed(() => ({ class: buttonTrailingVariants({ size: size.value }) }))

const labelProps = computed(() =>
  useUi({
    base: { class: buttonLabelVariants() },
    ui: props.ui?.label?.(),
    exclude: buttonUiExclude.label,
  }),
)

const loadingIconProps = computed(() => ({
  ...useUi({
    base: { class: cn(buttonIconVariants(), 'animate-spin') },
    ui: props.ui?.loadingIcon?.(),
    exclude: buttonUiExclude.loadingIcon,
  }),
  name: 'spinner' as const,
}))

const iconProps = computed(() => ({
  ...useUi({
    base: { class: buttonIconVariants() },
    ui: props.ui?.icon?.(),
    exclude: buttonUiExclude.icon,
  }),
  name: props.icon!,
}))

const trailingIconProps = computed(() => ({
  ...useUi({
    base: { class: buttonIconVariants() },
    ui: props.ui?.trailingIcon?.(),
    exclude: buttonUiExclude.trailingIcon,
  }),
  name: props.trailingIcon!,
}))

const rootProps = computed(() => ({
  ...useUi({
    base: [
      {
        class: buttonVariants({
          size: size.value,
          variant: oneOf(props.variant, buttonVariantNames, buttonDefaults.variant),
          block: props.block,
          square: square.value,
        }),
        style: [
          getColorVariables(props.color, 'button', buttonDefaults.color),
          getRadiusVariables(props.radius, 'button', buttonDefaults.radius),
        ],
      },
      attrs,
    ],
    ui: props.ui?.root?.(),
    exclude: buttonUiExclude.root,
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
          <Icon data-ui="button-loading-icon" v-bind="loadingIconProps" />
        </slot>
        <slot v-else name="leading">
          <Icon v-if="icon" data-ui="button-icon" v-bind="iconProps" />
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
