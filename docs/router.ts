import { createRouter, createWebHistory } from 'vue-router'
import DocsShell from '@docs/components/DocsShell.vue'
import { docsComponents } from '@docs/config/docs-components'

const firstComponent = `/components/${docsComponents[0]!.slug}`

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from) {
    if (to.hash) return { el: to.hash }
    if (to.path === from.path) return false
    return { top: 0, left: 0 }
  },
  routes: [
    { path: '/', redirect: firstComponent },
    { path: '/components', redirect: firstComponent },
    { path: '/components/:slug', component: DocsShell },
  ],
})
