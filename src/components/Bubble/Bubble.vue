<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { getColorVariables, getRadiusVariables, oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import {
  bubbleAligns,
  bubbleDefaults,
  bubbleReactionsAligns,
  bubbleReactionsSides,
  bubbleVariantNames,
} from '@/components/Bubble/constants'
import { bubbleUiExclude } from '@/components/Bubble/exclude'
import type { BubbleEmits, BubbleProps, BubbleSlots } from '@/components/Bubble/types'
import {
  bubbleContentVariants,
  bubbleReactionsVariants,
  bubbleVariants,
} from '@/components/Bubble/variants'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<BubbleProps>(), {
  variant: bubbleDefaults.variant,
  color: bubbleDefaults.color,
  radius: bubbleDefaults.radius,
  align: bubbleDefaults.align,
  reactionsSide: bubbleDefaults.reactionsSide,
  reactionsAlign: bubbleDefaults.reactionsAlign,
})

const emit = defineEmits<BubbleEmits>()
const slots = defineSlots<BubbleSlots>()
const attrs = useAttrs()

const variant = computed(() => oneOf(props.variant, bubbleVariantNames, bubbleDefaults.variant))
const align = computed(() => oneOf(props.align, bubbleAligns, bubbleDefaults.align))
const reactionsSide = computed(() =>
  oneOf(props.reactionsSide, bubbleReactionsSides, bubbleDefaults.reactionsSide),
)
const hasReactions = computed(() => Boolean(slots.reactions))

const contentProps = computed(() =>
  useUi({
    base: {
      class: bubbleContentVariants({ variant: variant.value, interactive: props.interactive }),
      ...(props.interactive && {
        type: 'button',
        onClick: (event: MouseEvent) => emit('click', event),
      }),
    },
    ui: props.ui?.content?.(),
    exclude: bubbleUiExclude.content,
  }),
)

const reactionsProps = computed(() =>
  useUi({
    base: {
      class: bubbleReactionsVariants({
        side: reactionsSide.value,
        align: oneOf(props.reactionsAlign, bubbleReactionsAligns, bubbleDefaults.reactionsAlign),
      }),
    },
    ui: props.ui?.reactions?.(),
    exclude: bubbleUiExclude.reactions,
  }),
)

const rootProps = computed(() =>
  useUi({
    base: [
      {
        class: bubbleVariants({
          align: align.value,
          reactions: hasReactions.value ? reactionsSide.value : 'none',
        }),
        style: [
          getColorVariables(props.color, 'bubble', bubbleDefaults.color),
          getRadiusVariables(props.radius, 'bubble', bubbleDefaults.radius),
        ],
      },
      attrs,
    ],
    ui: props.ui?.root?.(),
    exclude: bubbleUiExclude.root,
  }),
)
</script>

<template>
  <div data-ui="bubble-root" v-bind="rootProps">
    <component :is="interactive ? 'button' : 'div'" data-ui="bubble-content" v-bind="contentProps">
      <slot>{{ text }}</slot>
    </component>
    <div v-if="hasReactions" data-ui="bubble-reactions" v-bind="reactionsProps">
      <slot name="reactions" />
    </div>
  </div>
</template>
