<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { useUi } from '@/composables/useUi'
import { aspectRatioDefaults } from '@/components/AspectRatio/constants'
import { aspectRatioUiExclude } from '@/components/AspectRatio/exclude'
import type { AspectRatioProps, AspectRatioSlots } from '@/components/AspectRatio/types'
import { aspectRatioVariants } from '@/components/AspectRatio/variants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<AspectRatioProps>(), {
  ratio: aspectRatioDefaults.ratio,
})

defineSlots<AspectRatioSlots>()
const attrs = useAttrs()

const ratio = computed(() =>
  Number.isFinite(props.ratio) && props.ratio > 0 ? props.ratio : aspectRatioDefaults.ratio,
)

const rootProps = computed(() =>
  useUi({
    base: [
      { class: aspectRatioVariants(), style: { '--aspect-ratio': String(ratio.value) } },
      attrs,
    ],
    ui: props.ui?.root?.(),
    exclude: aspectRatioUiExclude.root,
  }),
)
</script>

<template>
  <div data-ui="aspect-ratio-root" v-bind="rootProps">
    <slot />
  </div>
</template>
