<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import {
  buttonGroupDefaults,
  buttonGroupOrientations,
  buttonGroupSizes,
} from '@/components/ButtonGroup/constants'
import { provideButtonGroup } from '@/components/ButtonGroup/context'
import type { ButtonGroupProps, ButtonGroupSlots } from '@/components/ButtonGroup/types'
import { buttonGroupVariants } from '@/components/ButtonGroup/variants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ButtonGroupProps>(), {
  size: undefined,
  orientation: buttonGroupDefaults.orientation,
})

defineSlots<ButtonGroupSlots>()
const attrs = useAttrs()

const orientation = computed(() =>
  oneOf(props.orientation, buttonGroupOrientations, buttonGroupDefaults.orientation),
)

provideButtonGroup({
  size: () => buttonGroupSizes.find((size) => size === props.size),
})

const rootProps = computed(() =>
  useUi(
    [
      {
        class: buttonGroupVariants({ orientation: orientation.value }),
        role: 'group',
      },
      attrs,
    ],
    props.ui?.root?.(),
  ),
)
</script>

<template>
  <div data-ui="button-group-root" v-bind="rootProps">
    <slot />
  </div>
</template>
