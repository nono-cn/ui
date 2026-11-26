<script setup lang="ts">
import { Label as LabelRoot } from '@ui-sdk/vue/label'
import { computed, useAttrs } from 'vue'
import { useUi } from '@/composables/useUi'
import { labelUiExclude } from '@/components/Label/exclude'
import type { LabelProps, LabelSlots } from '@/components/Label/types'
import { labelVariants } from '@/components/Label/variants'

defineOptions({ inheritAttrs: false })

const props = defineProps<LabelProps>()

defineSlots<LabelSlots>()
const attrs = useAttrs()

const rootProps = computed(() =>
  useUi({
    base: [{ class: labelVariants() }, attrs],
    ui: props.ui?.root?.(),
    exclude: labelUiExclude.root,
  }),
)
</script>

<template>
  <LabelRoot data-ui="label-root" v-bind="rootProps">
    <slot>{{ label }}</slot>
  </LabelRoot>
</template>
