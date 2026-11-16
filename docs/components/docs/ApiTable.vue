<script setup lang="ts">
import type { ApiTableRow } from '@docs/config/component-docs'

withDefaults(
  defineProps<{
    id?: string
    title: string
    rows: ApiTableRow[]
    showDefault?: boolean
  }>(),
  {
    id: undefined,
    showDefault: true,
  },
)
</script>

<template>
  <section :id="id" class="overflow-hidden rounded-xl border bg-card text-card-foreground">
    <header class="border-b px-4 py-3 sm:px-5">
      <h3 class="font-semibold">{{ title }}</h3>
    </header>

    <div class="overflow-x-auto">
      <table class="w-full min-w-[640px] text-left text-sm">
        <thead class="bg-muted/40 text-xs tracking-wide text-muted-foreground uppercase">
          <tr>
            <th class="px-4 py-3 font-medium sm:px-5">Name</th>
            <th class="px-4 py-3 font-medium sm:px-5">Type</th>
            <th v-if="showDefault" class="px-4 py-3 font-medium sm:px-5">Default</th>
            <th class="px-4 py-3 font-medium sm:px-5">Description</th>
          </tr>
        </thead>

        <tbody class="divide-y">
          <tr v-for="row in rows" :key="row.name" class="align-top">
            <td class="px-4 py-3 font-mono text-xs whitespace-nowrap sm:px-5">
              {{ row.name }}<span v-if="row.required" class="text-destructive"> *</span>
            </td>
            <td class="px-4 py-3 sm:px-5">
              <a
                v-if="row.typeLink"
                :href="row.typeLink"
                class="text-primary underline-offset-4 hover:underline"
              >
                <code class="rounded bg-muted px-1.5 py-0.5 text-xs">{{ row.type }}</code>
              </a>
              <code v-else class="rounded bg-muted px-1.5 py-0.5 text-xs">{{ row.type }}</code>
            </td>
            <td v-if="showDefault" class="px-4 py-3 text-muted-foreground sm:px-5">
              <code v-if="row.default" class="text-xs whitespace-pre">{{ row.default }}</code>
              <span v-else>—</span>
            </td>
            <td class="px-4 py-3 text-muted-foreground sm:px-5">{{ row.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
