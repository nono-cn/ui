<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { docsComponents } from '@docs/config/docs-components'

const emit = defineEmits<{ navigate: [] }>()
const route = useRoute()
</script>

<template>
  <div class="docs-nav-panel">
    <p class="docs-nav-heading">
      <span>Components</span>
      <span class="docs-nav-count">{{ docsComponents.length }}</span>
    </p>
    <nav class="docs-nav-list" aria-label="Components">
      <RouterLink
        v-for="component in docsComponents"
        :key="component.slug"
        :to="`/components/${component.slug}`"
        :aria-current="route.params.slug === component.slug ? 'page' : undefined"
        @click="emit('navigate')"
      >
        {{ component.title }}
      </RouterLink>
    </nav>
  </div>
</template>
