<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { useUi } from '@/composables/useUi'
import type { KbdGroupProps, KbdGroupSlots } from '@/components/Kbd/types'
import { kbdGroupVariants } from '@/components/Kbd/variants'

defineOptions({ inheritAttrs: false })

const props = defineProps<KbdGroupProps>()
defineSlots<KbdGroupSlots>()
const attrs = useAttrs()

const rootProps = computed(() =>
  useUi({ base: { class: kbdGroupVariants() }, resolver: props.ui?.root, attrs }),
)
</script>

<template>
  <kbd data-ui="kbd-group-root" v-bind="rootProps">
    <slot />
  </kbd>
</template>
