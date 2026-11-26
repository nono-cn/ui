<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { getColorVariables, getRadiusVariables, oneOf } from '@/composables/useTheme'
import { useShortcutHint } from '@/composables/useShortcut'
import { useUi } from '@/composables/useUi'
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
const { text } = useShortcutHint(() => props.shortcut)

const rootProps = computed(() =>
  useUi({
    base: [
      {
        class: kbdVariants({
          size: oneOf(props.size, kbdSizes, kbdDefaults.size),
          variant: oneOf(props.variant, kbdVariantNames, kbdDefaults.variant),
        }),
        style: [
          getColorVariables(props.color, 'kbd', kbdDefaults.color),
          getRadiusVariables(props.radius, 'kbd', kbdDefaults.radius),
        ],
      },
      attrs,
    ],
    ui: props.ui?.root?.(),
  }),
)
</script>

<template>
  <kbd data-ui="kbd-root" v-bind="rootProps">
    <slot>{{ text }}</slot>
  </kbd>
</template>
