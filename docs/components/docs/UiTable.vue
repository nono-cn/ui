<script setup lang="ts">
import { Popover, PopoverContent, PopoverTrigger } from '@ui-sdk/vue/popover'
import { Info } from 'lucide'
import DocsIcon from '@docs/components/DocsIcon.vue'
import type { UiTableRow } from '@docs/config/component-docs'

const props = defineProps<{
  slug: string
  rows: UiTableRow[]
}>()

function element(row: UiTableRow) {
  const node = row.node.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
  return `<${row.tag} data-ui="${props.slug}-${node}">`
}
</script>

<template>
  <section id="ui" class="overflow-hidden rounded-xl border bg-card text-card-foreground">
    <header class="flex items-center gap-2 border-b px-4 py-3 sm:px-5">
      <h3 class="font-semibold">UI</h3>
      <Popover open-on-hover>
        <PopoverTrigger
          aria-label="How ui works"
          class="inline-flex size-6 cursor-pointer items-center justify-center rounded-full text-muted-foreground outline-none hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <DocsIcon :icon="Info" />
        </PopoverTrigger>
        <PopoverContent
          side="top"
          align="start"
          :side-offset="8"
          :collision-padding="12"
          class="z-50 w-[min(28rem,calc(100vw-24px))] rounded-lg border bg-popover p-3 text-sm leading-6 text-popover-foreground shadow-lg outline-none"
        >
          Pass HTML attributes to each node with <code class="text-xs">ui.&lt;node&gt;</code>, a
          function that returns them. Only attributes are kept, such as
          <code class="text-xs">class</code>, <code class="text-xs">style</code>,
          <code class="text-xs">id</code>, <code class="text-xs">title</code> and
          <code class="text-xs">aria-*</code>. Events, props,
          <code class="text-xs">data-*</code> and <code class="text-xs">innerHTML</code> are
          dropped; target a node with its <code class="text-xs">data-ui</code>. Classes are merged
          with the defaults and win on conflict, styles are combined, and other attributes replace
          the default. Attributes passed to the component win over
          <code class="text-xs">ui.root</code>. Not overridable lists the attributes a node keeps
          even when <code class="text-xs">ui</code> returns them.
        </PopoverContent>
      </Popover>
    </header>

    <div class="overflow-x-auto">
      <table class="w-full min-w-[640px] text-left text-sm">
        <thead class="bg-muted/40 text-xs tracking-wide text-muted-foreground uppercase">
          <tr>
            <th class="px-4 py-3 font-medium sm:px-5">Node</th>
            <th class="px-4 py-3 font-medium sm:px-5">Element</th>
            <th class="px-4 py-3 font-medium sm:px-5">State</th>
            <th class="px-4 py-3 font-medium sm:px-5">Not overridable</th>
          </tr>
        </thead>

        <tbody class="divide-y">
          <tr v-for="row in rows" :key="row.node" class="align-top">
            <td class="px-4 py-3 font-mono text-xs whitespace-nowrap sm:px-5">{{ row.node }}</td>
            <td class="px-4 py-3 whitespace-nowrap sm:px-5">
              <code class="rounded bg-muted px-1.5 py-0.5 text-xs">{{ element(row) }}</code>
            </td>
            <td class="px-4 py-3 sm:px-5">
              <code
                v-if="row.state"
                class="block w-max rounded bg-muted px-1.5 py-0.5 text-xs whitespace-pre"
                >{{ row.state }}</code
              >
              <span v-else class="text-muted-foreground">—</span>
            </td>
            <td class="px-4 py-3 text-muted-foreground sm:px-5">{{ row.kept ?? '—' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
