<script setup lang="ts">
import type { ComponentDocConfig } from '@docs/config/component-docs'
import { exampleAnchor } from '@docs/config/docs-anchors'
import ComponentExample from '@docs/components/ComponentExample.vue'
import ApiTable from '@docs/components/docs/ApiTable.vue'

const props = defineProps<{
  component: ComponentDocConfig
}>()

const sections = [
  { id: 'usage', title: 'Usage', items: props.component.usage },
  { id: 'examples', title: 'Examples', items: props.component.examples },
] as const
</script>

<template>
  <article class="docs-page mx-auto grid min-w-0 gap-12 px-5 py-10 sm:px-8 sm:py-14">
    <header id="overview" class="grid scroll-mt-8 gap-4">
      <h1 class="text-4xl font-semibold tracking-tight sm:text-5xl">{{ component.title }}</h1>
      <p class="max-w-2xl text-base leading-7 text-muted-foreground">
        {{ component.description }}
      </p>
    </header>

    <section id="import" class="grid scroll-mt-8 gap-5">
      <h2 class="text-2xl font-semibold tracking-tight">Import</h2>
      <pre
        class="overflow-x-auto rounded-xl border bg-muted/40 p-4 text-sm"
      ><code>import { {{ component.title }} } from '@nono/ui/vue'</code></pre>
    </section>

    <template v-for="section in sections" :key="section.id">
      <section
        v-if="section.items.length"
        :id="section.id"
        class="grid min-w-0 scroll-mt-8 grid-cols-1 gap-5"
      >
        <h2 class="text-2xl font-semibold tracking-tight">{{ section.title }}</h2>
        <div class="grid min-w-0 grid-cols-1 gap-6">
          <div
            v-for="(example, index) in section.items"
            :id="exampleAnchor(section.id, example.title, index)"
            :key="example.title"
            class="min-w-0 scroll-mt-8"
          >
            <ComponentExample :component="component" :example="example" />
          </div>
        </div>
      </section>
    </template>

    <section id="accessibility" class="grid scroll-mt-8 gap-5">
      <h2 class="text-2xl font-semibold tracking-tight">Accessibility</h2>
      <div class="grid gap-5">
        <article
          v-for="item in component.accessibility"
          :key="item.title"
          class="grid gap-3 rounded-xl border bg-card p-4 text-card-foreground sm:p-5"
        >
          <h3 class="font-semibold">{{ item.title }}</h3>
          <p class="text-sm leading-6 text-muted-foreground">{{ item.description }}</p>
          <div v-if="item.table" class="overflow-x-auto rounded-lg border">
            <table class="w-full min-w-[480px] text-left text-sm">
              <thead class="bg-muted/40 text-xs tracking-wide text-muted-foreground uppercase">
                <tr>
                  <th
                    v-for="column in item.table.columns"
                    :key="column"
                    class="px-4 py-2.5 font-medium"
                  >
                    {{ column }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y">
                <tr v-for="row in item.table.rows" :key="row.join('|')" class="align-top">
                  <td
                    v-for="(cell, index) in row"
                    :key="index"
                    :class="
                      index === 0
                        ? 'px-4 py-2.5 font-mono text-xs whitespace-nowrap'
                        : 'px-4 py-2.5 text-muted-foreground'
                    "
                  >
                    {{ cell }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </section>

    <section id="api" class="grid scroll-mt-8 gap-5">
      <h2 class="text-2xl font-semibold tracking-tight">API</h2>

      <div class="grid gap-8">
        <ApiTable
          v-if="component.api.props.length"
          id="props"
          title="Props"
          :rows="component.api.props"
        />
        <ApiTable
          v-if="component.api.emits.length"
          id="emits"
          title="Emits"
          :rows="component.api.emits"
          :show-default="false"
        />
        <ApiTable
          v-if="component.api.slots.length"
          id="slots"
          title="Slots"
          :rows="component.api.slots"
          :show-default="false"
        />
        <template v-for="table in component.api.configs ?? []" :key="table.id">
          <p v-if="table.description" class="text-sm leading-6 text-muted-foreground">
            {{ table.description }}
          </p>
          <ApiTable
            v-if="table.rows.length"
            :id="table.id"
            :title="table.title"
            :rows="table.rows"
            :show-default="table.showDefault"
          />
        </template>
        <ApiTable
          v-if="component.api.expose.length"
          id="expose"
          title="Expose"
          :rows="component.api.expose"
          :show-default="false"
        />
      </div>
    </section>
  </article>
</template>
