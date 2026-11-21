<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import { docsComponents } from '@docs/config/docs-components'

const emit = defineEmits<{ navigate: [] }>()
const route = useRoute()
const dev = import.meta.env.DEV
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
    <template v-if="dev">
      <p class="docs-nav-heading"><span>Dev</span></p>
      <nav class="docs-nav-list" aria-label="Dev">
        <RouterLink
          to="/playground"
          :aria-current="route.path === '/playground' ? 'page' : undefined"
          @click="emit('navigate')"
        >
          Playground
        </RouterLink>
      </nav>
    </template>
  </div>
</template>
