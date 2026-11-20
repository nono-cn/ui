<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn, type ClassValue } from '@/composables/cn'
import type { KbdGroupSlots } from '@/components/Kbd/types'
import { kbdGroupVariants } from '@/components/Kbd/variants'

defineOptions({ inheritAttrs: false })

defineSlots<KbdGroupSlots>()
const attrs = useAttrs()

const rootProps = computed(() => ({
  ...attrs,
  class: cn(kbdGroupVariants(), attrs.class as ClassValue),
}))
</script>

<template>
  <kbd data-ui="kbd-group-root" v-bind="rootProps">
    <slot />
  </kbd>
</template>
