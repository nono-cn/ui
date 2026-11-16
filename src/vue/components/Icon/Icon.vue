<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn, getIconAttrs, iconDefaults, type ClassValue, type IconProps } from '@nono/ui/core'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<IconProps>(), {
  size: iconDefaults.size,
  color: iconDefaults.color,
  stroke: iconDefaults.stroke,
})

const attrs = useAttrs()

const icon = computed(() => getIconAttrs(props, attrs))

const rootAttrs = computed(() => ({
  ...icon.value.attrs,
  ...attrs,
  class: cn(icon.value.attrs.class, attrs.class as ClassValue),
  style: [icon.value.attrs.style, attrs.style],
}))
</script>

<template>
  <svg v-bind="rootAttrs">
    <component
      :is="tag"
      v-for="([tag, nodeAttrs], index) in icon.node"
      :key="index"
      v-bind="nodeAttrs"
    />
  </svg>
</template>
