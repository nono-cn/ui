<script setup lang="ts">
import { Label as LabelRoot } from '@ui-sdk/vue/label'
import { computed, useAttrs } from 'vue'
import { cn, type ClassValue } from '@/composables/cn'
import type { LabelProps, LabelSlots } from '@/components/Label/types'
import { labelVariants } from '@/components/Label/variants'

defineOptions({ inheritAttrs: false })

const props = defineProps<LabelProps>()

defineSlots<LabelSlots>()
const attrs = useAttrs()

const rootProps = computed(() => ({
  ...attrs,
  for: props.for,
  class: cn(labelVariants(), attrs.class as ClassValue),
}))
</script>

<template>
  <LabelRoot data-ui="label-root" v-bind="rootProps">
    <slot>{{ label }}</slot>
  </LabelRoot>
</template>
