<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { docsComponents } from '@docs/config/docs-components'
import { docsComposables } from '@docs/config/docs-composables'

const emit = defineEmits<{ navigate: [] }>()
const route = useRoute()
const groups = [
  {
    title: 'Components',
    base: '/components',
    items: docsComponents.map(({ slug, title }) => ({ slug, label: title })),
  },
  {
    title: 'Composables',
    base: '/composables',
    items: docsComposables.map(({ slug, name }) => ({ slug, label: name })),
  },
]

const visibleGroups = computed(() => {
  const current = groups.filter(({ base }) => route.path.startsWith(`${base}/`))
  return current.length ? current : groups
})
</script>

<template>
  <div class="docs-nav-panel">
    <template v-for="group in visibleGroups" :key="group.base">
      <p class="docs-nav-heading">
        <span>{{ group.title }}</span>
        <span class="docs-nav-count">{{ group.items.length }}</span>
      </p>
      <nav class="docs-nav-list" :aria-label="group.title">
        <RouterLink
          v-for="item in group.items"
          :key="item.slug"
          :to="`${group.base}/${item.slug}`"
          :aria-current="route.path === `${group.base}/${item.slug}` ? 'page' : undefined"
          @click="emit('navigate')"
        >
          {{ item.label }}
        </RouterLink>
      </nav>
    </template>
  </div>
</template>
