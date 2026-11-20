<script setup lang="ts">
import { AvatarFallback, Avatar as AvatarRoot, AvatarImage } from '@ui-sdk/vue/avatar'
import { computed, useAttrs } from 'vue'
import { cn, type ClassValue } from '@/composables/cn'
import { getColorVariables, getRadiusVariables, oneOf } from '@/composables/useTheme'
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
  src: props.src,
  alt: props.alt ?? '',
  class: avatarImageVariants(),
}))

const fallbackProps = computed(() => ({
  delay: props.delay,
  ...(props.alt ? { role: 'img', 'aria-label': props.alt } : {}),
  class: avatarFallbackVariants({
    variant: oneOf(props.variant, avatarVariantNames, avatarDefaults.variant),
  }),
}))

const textProps = { 'aria-hidden': 'true' as const }

const iconProps = computed(() => ({
  name: props.icon,
  class: avatarIconVariants(),
}))

const rootProps = computed(() => ({
  ...attrs,
  onLoadingStatusChange: props.onLoadingStatusChange,
  class: cn(
    avatarVariants({ size: oneOf(props.size, avatarSizes, avatarDefaults.size) }),
    attrs.class as ClassValue,
  ),
  style: [
    getColorVariables(props.color, 'avatar', avatarDefaults.color),
    getRadiusVariables(props.radius, 'avatar', avatarDefaults.radius),
    attrs.style,
  ],
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
