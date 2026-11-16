<script setup lang="ts">
export interface DocsTocItem {
  id: string
  label: string
  children?: DocsTocItem[]
}

defineProps<{
  items: DocsTocItem[]
  activeId?: string
}>()

const emit = defineEmits<{ navigate: [] }>()
</script>

<template>
  <div class="docs-nav-panel">
    <p class="docs-nav-heading">On this page</p>
    <nav aria-label="On this page">
      <ul class="docs-toc-tree">
        <li v-for="item in items" :key="item.id">
          <a
            :href="`#${item.id}`"
            :aria-current="activeId === item.id ? 'location' : undefined"
            @click="emit('navigate')"
          >
            {{ item.label }}
          </a>
          <ul v-if="item.children?.length" class="docs-toc-children">
            <li v-for="child in item.children" :key="child.id">
              <a
                :href="`#${child.id}`"
                :aria-current="activeId === child.id ? 'location' : undefined"
                @click="emit('navigate')"
              >
                {{ child.label }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>
