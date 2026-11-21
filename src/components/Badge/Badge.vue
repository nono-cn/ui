<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { getColorVariables, getRadiusVariables, oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import { badgeDefaults, badgeSizes, badgeVariantNames } from '@/components/Badge/constants'
import type { BadgeProps, BadgeSlots } from '@/components/Badge/types'
import {
  badgeIconVariants,
  badgeLeadingVariants,
  badgeTrailingVariants,
  badgeVariants,
} from '@/components/Badge/variants'
import Icon from '@/components/Icon/Icon.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: badgeDefaults.variant,
  color: badgeDefaults.color,
  size: badgeDefaults.size,
  radius: badgeDefaults.radius,
})

const slots = defineSlots<BadgeSlots>()
const attrs = useAttrs()

const size = computed(() => oneOf(props.size, badgeSizes, badgeDefaults.size))
const hasLeading = computed(() => Boolean(props.leadingIcon || slots.leading))
const hasTrailing = computed(() => Boolean(props.trailingIcon || slots.trailing))

const leadingProps = computed(() =>
  useUi({ class: badgeLeadingVariants({ size: size.value }) }, props.ui?.leading?.()),
)

const trailingProps = computed(() =>
  useUi({ class: badgeTrailingVariants({ size: size.value }) }, props.ui?.trailing?.()),
)

const labelProps = computed(() => useUi({ class: 'truncate' }, props.ui?.label?.()))

const leadingIconProps = computed(() => ({
  ...useUi({ class: badgeIconVariants() }, props.ui?.leadingIcon?.()),
  name: props.leadingIcon!,
}))

const trailingIconProps = computed(() => ({
  ...useUi({ class: badgeIconVariants() }, props.ui?.trailingIcon?.()),
  name: props.trailingIcon!,
}))

const rootProps = computed(() =>
  useUi(
    [
      {
        class: badgeVariants({
          size: size.value,
          variant: oneOf(props.variant, badgeVariantNames, badgeDefaults.variant),
        }),
        style: [
          getColorVariables(props.color, 'badge', badgeDefaults.color),
          getRadiusVariables(props.radius, 'badge', badgeDefaults.radius),
        ],
      },
      attrs,
    ],
    props.ui?.root?.(),
  ),
)
</script>

<template>
  <span data-ui="badge-root" v-bind="rootProps">
    <span v-if="hasLeading" data-ui="badge-leading" v-bind="leadingProps">
      <slot name="leading">
        <Icon v-if="leadingIcon" data-ui="badge-leading-icon" v-bind="leadingIconProps" />
      </slot>
    </span>
    <slot>
      <span v-if="label" data-ui="badge-label" v-bind="labelProps">{{ label }}</span>
    </slot>
    <span v-if="hasTrailing" data-ui="badge-trailing" v-bind="trailingProps">
      <slot name="trailing">
        <Icon v-if="trailingIcon" data-ui="badge-trailing-icon" v-bind="trailingIconProps" />
      </slot>
    </span>
  </span>
</template>
