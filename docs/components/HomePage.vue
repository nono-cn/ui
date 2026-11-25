<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { docsComponents } from '@docs/config/docs-components'

const cards = [
  {
    title: 'Components',
    description: 'Accessible Vue components styled with Tailwind, built on ui-sdk.',
    to: `/components/${docsComponents[0]!.slug}`,
    count: docsComponents.length,
  },
]
</script>

<template>
  <article class="docs-page mx-auto grid min-w-0 gap-12 px-5 py-10 sm:px-8 sm:py-14">
    <header class="grid gap-4">
      <h1 class="text-4xl font-semibold tracking-tight sm:text-5xl">nono/ui</h1>
      <p class="max-w-2xl text-base leading-7 text-muted-foreground">
        Vue component library on top of ui-sdk.
      </p>
    </header>

    <div class="grid gap-5 sm:grid-cols-2">
      <RouterLink
        v-for="card in cards"
        :key="card.title"
        :to="card.to"
        class="grid gap-3 rounded-xl border bg-card p-5 text-card-foreground transition-colors hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:p-6"
      >
        <span class="flex items-center justify-between gap-3">
          <span class="text-xl font-semibold tracking-tight">{{ card.title }}</span>
          <span class="docs-nav-count">{{ card.count }}</span>
        </span>
        <span class="text-sm leading-6 text-muted-foreground">{{ card.description }}</span>
      </RouterLink>
    </div>
  </article>
</template>
