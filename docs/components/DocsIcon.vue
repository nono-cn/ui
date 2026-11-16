<script setup lang="ts">
import type { IconNode } from 'lucide'

withDefaults(defineProps<{ icon: IconNode; size?: number }>(), { size: 16 })
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <component :is="tag" v-for="([tag, attrs], index) in icon" :key="index" v-bind="attrs" />
  </svg>
</template>
