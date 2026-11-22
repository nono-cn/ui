import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import DocsShell from '@docs/components/DocsShell.vue'
import { docsComponents } from '@docs/config/docs-components'
import { docsComposables } from '@docs/config/docs-composables'

const firstComponent = `/components/${docsComponents[0]!.slug}`
const firstComposable = `/composables/${docsComposables[0]!.slug}`

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from) {
    if (to.hash) return { el: to.hash }
    if (to.path === from.path) return false
    return { top: 0, left: 0 }
  },
  routes: [
    {
      path: '/',
      component: DocsShell,
      meta: {
        page: defineAsyncComponent(() => import('@docs/components/HomePage.vue')),
      },
    },
    { path: '/components', redirect: firstComponent },
    { path: '/components/:slug', component: DocsShell },
    { path: '/composables', redirect: firstComposable },
    { path: '/composables/:slug', component: DocsShell },
    ...(import.meta.env.DEV
      ? [
          {
            path: '/playground',
            component: DocsShell,
            meta: {
              page: defineAsyncComponent(() => import('@docs/playground/Playground.vue')),
            },
          },
        ]
      : []),
  ],
})
