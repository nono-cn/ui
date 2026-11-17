<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn, type ClassValue } from '@/composables/cn'
import { getColorVariables, getRadiusVariables, oneOf } from '@/composables/useTheme'
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

const leadingProps = computed(() => ({
  'data-slot': 'leading',
  class: badgeLeadingVariants({ size: size.value }),
}))

const trailingProps = computed(() => ({
  'data-slot': 'trailing',
  class: badgeTrailingVariants({ size: size.value }),
}))

const labelProps = {
  'data-slot': 'label',
  class: 'truncate',
}

const leadingIconProps = computed(() => ({
  name: props.leadingIcon!,
  class: badgeIconVariants(),
}))

const trailingIconProps = computed(() => ({
  name: props.trailingIcon!,
  class: badgeIconVariants(),
}))

const rootProps = computed(() => ({
  'data-slot': 'badge',
  ...attrs,
  class: cn(
    badgeVariants({
      size: size.value,
      variant: oneOf(props.variant, badgeVariantNames, badgeDefaults.variant),
    }),
    attrs.class as ClassValue,
  ),
  style: [
    getColorVariables(props.color, 'badge', badgeDefaults.color),
    getRadiusVariables(props.radius, 'badge', badgeDefaults.radius),
    attrs.style,
  ],
}))
</script>

<template>
  <span v-bind="rootProps">
    <span v-if="hasLeading" v-bind="leadingProps">
      <slot name="leading">
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
  </span>
</template>
