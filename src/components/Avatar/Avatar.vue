<script setup lang="ts">
import { AvatarFallback, Avatar as AvatarRoot, AvatarImage } from '@ui-sdk/vue/avatar'
import { computed, useAttrs } from 'vue'
import { getColorVariables, getRadiusVariables, oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import { avatarDefaults, avatarSizes, avatarVariantNames } from '@/components/Avatar/constants'
import type { AvatarProps, AvatarSlots } from '@/components/Avatar/types'
import {
  avatarFallbackVariants,
  avatarIconVariants,
  avatarImageVariants,
  avatarVariants,
} from '@/components/Avatar/variants'
import Icon from '@/components/Icon/Icon.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<AvatarProps>(), {
  variant: avatarDefaults.variant,
  color: avatarDefaults.color,
  size: avatarDefaults.size,
  radius: avatarDefaults.radius,
  icon: avatarDefaults.icon,
  delay: avatarDefaults.delay,
  onLoadingStatusChange: undefined,
})

defineSlots<AvatarSlots>()
const attrs = useAttrs()

const initials = computed(() => {
  const text = props.text?.trim()
  if (text) return text

  return (props.alt ?? '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => [...word][0])
    .join('')
})

const imageProps = computed(() => ({
  ...useUi({ base: { class: avatarImageVariants() }, ui: props.ui?.image?.() }),
  src: props.src,
  alt: props.alt ?? '',
}))

const fallbackProps = computed(() => ({
  ...useUi({
    base: {
      ...(props.alt ? { role: 'img', 'aria-label': props.alt } : {}),
      class: avatarFallbackVariants({
        variant: oneOf(props.variant, avatarVariantNames, avatarDefaults.variant),
      }),
    },
    ui: props.ui?.fallback?.(),
  }),
  delay: props.delay,
}))

const textProps = computed(() => useUi({ base: { 'aria-hidden': 'true' }, ui: props.ui?.text?.() }))

const iconProps = computed(() => ({
  ...useUi({ base: { class: avatarIconVariants() }, ui: props.ui?.icon?.() }),
  name: props.icon,
}))

const rootProps = computed(() => ({
  ...useUi({
    base: [
      {
        class: avatarVariants({ size: oneOf(props.size, avatarSizes, avatarDefaults.size) }),
        style: [
          getColorVariables(props.color, 'avatar', avatarDefaults.color),
          getRadiusVariables(props.radius, 'avatar', avatarDefaults.radius),
        ],
      },
      attrs,
    ],
    ui: props.ui?.root?.(),
  }),
  onLoadingStatusChange: props.onLoadingStatusChange,
}))
</script>

<template>
  <AvatarRoot data-ui="avatar-root" v-bind="rootProps">
    <AvatarImage v-if="src" data-ui="avatar-image" v-bind="imageProps" />
    <AvatarFallback data-ui="avatar-fallback" v-bind="fallbackProps">
      <slot>
        <span v-if="initials" data-ui="avatar-text" v-bind="textProps">{{ initials }}</span>
        <Icon v-else data-ui="avatar-icon" v-bind="iconProps" />
      </slot>
    </AvatarFallback>
  </AvatarRoot>
</template>
