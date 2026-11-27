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
import { useBubbleGroup } from '@/components/Bubble/context'
import { bubbleUiExclude } from '@/components/Bubble/exclude'
import type { BubbleProps, BubbleSlots } from '@/components/Bubble/types'
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
  align: undefined,
  reactionsSide: bubbleDefaults.reactionsSide,
  reactionsAlign: bubbleDefaults.reactionsAlign,
  onClick: undefined,
})

const slots = defineSlots<BubbleSlots>()
const attrs = useAttrs()

const bubbleGroup = useBubbleGroup()

const variant = computed(() => oneOf(props.variant, bubbleVariantNames, bubbleDefaults.variant))
const align = computed(() =>
  oneOf(props.align ?? bubbleGroup?.align(), bubbleAligns, bubbleDefaults.align),
)
const reactionsSide = computed(() =>
  oneOf(props.reactionsSide, bubbleReactionsSides, bubbleDefaults.reactionsSide),
)
const hasReactions = computed(() => Boolean(props.reactions || slots.reactions))
const tag = computed(() => {
  if (props.href) return 'a'
  return props.onClick ? 'button' : 'div'
})

const contentProps = computed(() =>
  useUi({
    base: {
      class: bubbleContentVariants({ variant: variant.value, interactive: tag.value !== 'div' }),
      href: props.href,
      type: tag.value === 'button' ? 'button' : undefined,
      onClick: props.onClick,
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
          fill: variant.value === 'plain',
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
    <component :is="tag" data-ui="bubble-content" v-bind="contentProps">
      <slot>{{ text }}</slot>
    </component>
    <div v-if="hasReactions" data-ui="bubble-reactions" v-bind="reactionsProps">
      <slot name="reactions">{{ reactions }}</slot>
    </div>
  </div>
</template>
