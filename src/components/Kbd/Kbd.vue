<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn, type ClassValue } from '@/composables/cn'
import { getColorVariables, getRadiusVariables, oneOf } from '@/composables/useTheme'
import { kbdDefaults, kbdSizes, kbdVariantNames } from '@/components/Kbd/constants'
import type { KbdProps, KbdSlots } from '@/components/Kbd/types'
import { kbdVariants } from '@/components/Kbd/variants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<KbdProps>(), {
  variant: kbdDefaults.variant,
  color: kbdDefaults.color,
  size: kbdDefaults.size,
  radius: kbdDefaults.radius,
})

defineSlots<KbdSlots>()
const attrs = useAttrs()

const rootProps = computed(() => ({
  ...attrs,
  class: cn(
    kbdVariants({
      size: oneOf(props.size, kbdSizes, kbdDefaults.size),
      variant: oneOf(props.variant, kbdVariantNames, kbdDefaults.variant),
    }),
    attrs.class as ClassValue,
  ),
  style: [
    getColorVariables(props.color, 'kbd', kbdDefaults.color),
    getRadiusVariables(props.radius, 'kbd', kbdDefaults.radius),
    attrs.style,
  ],
}))
</script>

<template>
  <kbd data-ui="kbd-root" v-bind="rootProps">
    <slot>{{ label }}</slot>
  </kbd>
</template>
