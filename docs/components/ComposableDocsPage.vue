<script setup lang="ts">
import type { ComposableDocConfig } from '@docs/config/composable-docs'
import ApiTable from '@docs/components/docs/ApiTable.vue'

defineProps<{
  composable: ComposableDocConfig
}>()
</script>

<template>
  <article class="docs-page mx-auto grid min-w-0 gap-12 px-5 py-10 sm:px-8 sm:py-14">
    <header id="overview" class="grid scroll-mt-8 gap-4">
      <h1 class="font-mono text-4xl font-semibold tracking-tight sm:text-5xl">
        {{ composable.name }}
      </h1>
      <p class="max-w-2xl text-base leading-7 text-muted-foreground">
        {{ composable.description }}
      </p>
    </header>

    <section id="import" class="grid scroll-mt-8 gap-5">
      <h2 class="text-2xl font-semibold tracking-tight">Import</h2>
      <pre
        class="overflow-x-auto rounded-xl border bg-muted/40 p-4 text-sm"
      ><code>import { {{ composable.name }} } from '@nono/ui'

{{ composable.signature }}</code></pre>
    </section>

    <section id="usage" class="grid min-w-0 scroll-mt-8 gap-5">
      <h2 class="text-2xl font-semibold tracking-tight">Usage</h2>
      <pre
        class="overflow-x-auto rounded-xl border bg-muted/40 p-4 text-sm"
      ><code>{{ composable.usage }}</code></pre>
    </section>

    <section id="api" class="grid scroll-mt-8 gap-5">
      <h2 class="text-2xl font-semibold tracking-tight">API</h2>
      <div class="grid gap-8">
        <ApiTable
          v-if="composable.parameters.length"
          id="parameters"
          title="Parameters"
          :rows="composable.parameters"
          :show-default="false"
        />
        <ApiTable
          v-if="composable.returns.length"
          id="returns"
          title="Returns"
          :rows="composable.returns"
          :show-default="false"
        />
        <ApiTable
          v-if="composable.types.length"
          id="types"
          title="Types"
          :rows="composable.types"
          :show-default="false"
        />
      </div>
    </section>
  </article>
</template>
