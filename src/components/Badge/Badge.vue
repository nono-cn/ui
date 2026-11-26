<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { getColorVariables, getRadiusVariables, oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import { badgeDefaults, badgeSizes, badgeVariantNames } from '@/components/Badge/constants'
import { badgeUiExclude } from '@/components/Badge/exclude'
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
const hasLeading = computed(() => Boolean(props.icon || slots.leading))
const hasTrailing = computed(() => Boolean(props.trailingIcon || slots.trailing))

const leadingProps = computed(() => ({ class: badgeLeadingVariants({ size: size.value }) }))

const trailingProps = computed(() => ({ class: badgeTrailingVariants({ size: size.value }) }))

const labelProps = computed(() =>
  useUi({ base: { class: 'truncate' }, ui: props.ui?.label?.(), exclude: badgeUiExclude.label }),
)

const leadingIconProps = computed(() => ({
  ...useUi({
    base: { class: badgeIconVariants() },
    ui: props.ui?.leadingIcon?.(),
    exclude: badgeUiExclude.leadingIcon,
  }),
  name: props.icon!,
}))

const trailingIconProps = computed(() => ({
  ...useUi({
    base: { class: badgeIconVariants() },
    ui: props.ui?.trailingIcon?.(),
    exclude: badgeUiExclude.trailingIcon,
  }),
  name: props.trailingIcon!,
}))

const rootProps = computed(() =>
  useUi({
    base: [
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
    ui: props.ui?.root?.(),
    exclude: badgeUiExclude.root,
  }),
)
</script>

<template>
  <span data-ui="badge-root" v-bind="rootProps">
    <span v-if="hasLeading" data-ui="badge-leading" v-bind="leadingProps">
      <slot name="leading">
        <Icon v-if="icon" data-ui="badge-leading-icon" v-bind="leadingIconProps" />
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
