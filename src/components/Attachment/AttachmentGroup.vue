<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn, type ClassValue } from '@/composables/cn'
import type { AttachmentGroupSlots } from '@/components/Attachment/types'
import { attachmentGroupVariants } from '@/components/Attachment/variants'

defineOptions({ inheritAttrs: false })

defineSlots<AttachmentGroupSlots>()
const attrs = useAttrs()

const rootProps = computed(() => ({
  'data-slot': 'attachment-group',
  role: 'group',
  ...attrs,
  class: cn(attachmentGroupVariants(), attrs.class as ClassValue),
}))
</script>

<template>
  <div v-bind="rootProps">
    <slot />
  </div>
</template>
