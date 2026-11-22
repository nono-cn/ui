<script setup lang="ts">
import { Menu, Moon, Palette, Sun, TableOfContents } from 'lucide'
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { docsComponentsBySlug } from '@docs/config/docs-components'
import { exampleAnchor } from '@docs/config/docs-anchors'
import { docsComposablesBySlug } from '@docs/config/docs-composables'
import ComponentDocsPage from '@docs/components/ComponentDocsPage.vue'
import ComposableDocsPage from '@docs/components/ComposableDocsPage.vue'
import DocsComponentsNav from '@docs/components/DocsComponentsNav.vue'
import DocsDrawer from '@docs/components/DocsDrawer.vue'
import DocsIcon from '@docs/components/DocsIcon.vue'
import DocsToc, { type DocsTocItem } from '@docs/components/DocsToc.vue'
import { useActiveSection } from '@docs/components/useActiveSection'
import { dark, neutral, neutralColors } from '@docs/components/useDocsTheme'

const version = import.meta.env.NONO_UI_VERSION
const route = useRoute()
const themeOpen = ref(false)
const componentsOpen = ref(false)
const tocOpen = ref(false)

const neutralOptions = neutralColors.map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}))

const variables = ref([
  { name: '--primary', value: '' },
  { name: '--background', value: '' },
  { name: '--foreground', value: '' },
])

function setVariable(name: string, value: string) {
  if (value) document.documentElement.style.setProperty(name, value)
  else document.documentElement.style.removeProperty(name)
}

const slug = computed(() => String(route.params.slug))
const composablesPage = computed(() => route.path.startsWith('/composables/'))
const homePage = computed(() => route.path === '/')
const component = computed(() =>
  composablesPage.value ? undefined : docsComponentsBySlug[slug.value],
)
const composable = computed(() =>
  composablesPage.value ? docsComposablesBySlug[slug.value] : undefined,
)
const current = computed(() => (component.value ? component.value.title : composable.value?.name))
const section = computed(() => {
  if (homePage.value) return { title: 'Home', to: '/' }
  if (composablesPage.value) return { title: 'Composables', to: '/composables' }
  return { title: 'Components', to: '/components' }
})
const pageTitle = computed(() => {
  if (current.value) return `${current.value} · nono/ui`
  return homePage.value ? 'nono/ui' : `nono/ui · ${section.value.title}`
})

const tocTree = computed<DocsTocItem[]>(() => {
  if (composable.value) {
    const { parameters, returns, types } = composable.value
    const apiChildren: DocsTocItem[] = []
    if (parameters.length) apiChildren.push({ id: 'parameters', label: 'Parameters' })
    if (returns.length) apiChildren.push({ id: 'returns', label: 'Returns' })
    if (types.length) apiChildren.push({ id: 'types', label: 'Types' })
    return [
      { id: 'import', label: 'Import' },
      { id: 'usage', label: 'Usage' },
      { id: 'api', label: 'API', children: apiChildren },
    ]
  }

  const current = component.value
  if (!current) return []

  const items: DocsTocItem[] = [{ id: 'import', label: 'Import' }]

  for (const [id, label] of [
    ['usage', 'Usage'],
    ['examples', 'Examples'],
  ] as const) {
    if (!current[id].length) continue
    items.push({
      id,
      label,
      children: current[id].map((example, index) => ({
        id: exampleAnchor(id, example.title, index),
        label: example.title,
      })),
    })
  }

  items.push({ id: 'accessibility', label: 'Accessibility' })

  const { api } = current
  const apiChildren: DocsTocItem[] = []
  if (api.props.length) apiChildren.push({ id: 'props', label: 'Props' })
  if (api.emits.length) apiChildren.push({ id: 'emits', label: 'Emits' })
  if (api.slots.length) apiChildren.push({ id: 'slots', label: 'Slots' })
  for (const table of api.configs ?? []) {
    if (table.rows.length) apiChildren.push({ id: table.id, label: table.title })
  }
  if (api.expose.length) apiChildren.push({ id: 'expose', label: 'Expose' })
  if (api.ui?.length) apiChildren.push({ id: 'ui', label: 'UI' })

  items.push({ id: 'api', label: 'API', children: apiChildren })
  return items
})

const tocIds = computed(() =>
  tocTree.value.flatMap((item) => [item.id, ...(item.children ?? []).map(({ id }) => id)]),
)
const activeId = useActiveSection(tocIds)

watch(pageTitle, (value) => (document.title = value), { immediate: true })
</script>

<template>
  <div class="docs-shell">
    <header class="docs-topbar">
      <RouterLink to="/" class="docs-brand"
        ><span class="docs-brand-mark">N</span><span>nono/ui</span
        ><span class="docs-version">v{{ version }}</span></RouterLink
      >
      <div class="docs-actions">
        <div class="docs-theme-wrap">
          <button
            type="button"
            class="docs-icon-button"
            aria-label="Customize theme"
            :aria-expanded="themeOpen"
            @click="themeOpen = !themeOpen"
          >
            <DocsIcon :icon="Palette" />
          </button>
          <div v-if="themeOpen" class="docs-theme-popover">
            <div class="docs-popover-heading">
              <div><strong>Customize theme</strong><small>Design CSS variables</small></div>
              <button
                type="button"
                class="docs-close"
                aria-label="Close"
                @click="themeOpen = false"
              >
                ×
              </button>
            </div>
            <fieldset class="docs-neutral-picker">
              <legend>Neutral scale</legend>
              <div class="docs-neutral-options">
                <button
                  v-for="option in neutralOptions"
                  :key="option.value"
                  type="button"
                  class="docs-neutral-option"
                  :aria-label="option.label"
                  :aria-pressed="neutral === option.value"
                  @click="neutral = option.value"
                >
                  <span
                    class="docs-neutral-swatch"
                    :style="{
                      background: `linear-gradient(135deg, var(--color-${option.value}-100) 50%, var(--color-${option.value}-800) 50%)`,
                    }"
                  />
                  <span>{{ option.label }}</span>
                </button>
              </div>
            </fieldset>
            <label v-for="variable in variables" :key="variable.name"
              ><span>{{ variable.name }}</span
              ><input
                v-model="variable.value"
                placeholder="Default"
                @input="setVariable(variable.name, variable.value)"
            /></label>
          </div>
        </div>
        <button
          type="button"
          class="docs-icon-button"
          :aria-label="dark ? 'Switch to light theme' : 'Switch to dark theme'"
          @click="dark = !dark"
        >
          <DocsIcon :icon="dark ? Sun : Moon" />
        </button>
      </div>
    </header>

    <div class="docs-sectionbar">
      <div class="docs-sectionbar-inner">
        <button
          type="button"
          class="docs-icon-button docs-mobile-only"
          aria-label="Open components"
          @click="componentsOpen = true"
        >
          <DocsIcon :icon="Menu" />
        </button>
        <RouterLink :to="section.to" class="docs-section-title">{{ section.title }}</RouterLink>
        <span v-if="current" class="docs-section-current">/ {{ current }}</span>
        <button
          v-if="tocTree.length"
          type="button"
          class="docs-icon-button docs-mobile-only docs-toc-button"
          @click="tocOpen = true"
        >
          <DocsIcon :icon="TableOfContents" />
          <span>On this page</span>
        </button>
      </div>
    </div>

    <div class="docs-workspace">
      <aside class="docs-sidebar">
        <DocsComponentsNav />
      </aside>
      <main class="docs-content">
        <ComponentDocsPage v-if="component" :key="component.slug" :component="component" />
        <ComposableDocsPage
          v-else-if="composable"
          :key="composable.slug"
          :composable="composable"
        />
        <component :is="route.meta.page" v-else-if="route.meta.page" />
        <div v-else class="docs-empty">
          <span class="docs-empty-kicker">{{ section.title }}</span>
          <h1>{{ composablesPage ? 'Composable' : 'Component' }} not found</h1>
          <p>Pick one of the available {{ section.title.toLowerCase() }} in the navigation.</p>
        </div>
      </main>
      <aside v-if="tocTree.length" class="docs-toc">
        <DocsToc :items="tocTree" :active-id="activeId" />
      </aside>
    </div>

    <DocsDrawer v-model:open="componentsOpen" side="left" label="Components">
      <DocsComponentsNav @navigate="componentsOpen = false" />
    </DocsDrawer>
    <DocsDrawer v-if="tocTree.length" v-model:open="tocOpen" side="right" label="On this page">
      <DocsToc :items="tocTree" :active-id="activeId" @navigate="tocOpen = false" />
    </DocsDrawer>
  </div>
</template>
