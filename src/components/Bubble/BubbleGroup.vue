<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { useUi } from '@/composables/useUi'
import { bubbleAligns } from '@/components/Bubble/constants'
import { provideBubbleGroup } from '@/components/Bubble/context'
import type { BubbleGroupProps, BubbleGroupSlots } from '@/components/Bubble/types'
import { bubbleGroupVariants } from '@/components/Bubble/variants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<BubbleGroupProps>(), { align: undefined })

defineSlots<BubbleGroupSlots>()
const attrs = useAttrs()

provideBubbleGroup({
  align: () => bubbleAligns.find((align) => align === props.align),
})

const rootProps = computed(() =>
  useUi({ base: [{ class: bubbleGroupVariants() }, attrs], ui: props.ui?.root?.() }),
)
</script>

<template>
  <div data-ui="bubble-group-root" v-bind="rootProps">
    <slot />
  </div>
</template>
