<script setup lang="ts">
import { ref } from 'vue'
import { Button, Icon, Marker, markerVariantNames } from '@nono/ui'
import { dark } from '@docs/components/useDocsTheme'

const running = ref(true)
const reverts = ref(0)
</script>

<template>
  <main class="mx-auto flex max-w-4xl flex-col gap-8 p-8 text-foreground">
    <header class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Playground</h1>
      <Button variant="outline" size="sm" :label="dark ? 'Light' : 'Dark'" @click="dark = !dark" />
    </header>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Variants</h2>
      <div class="flex max-w-sm flex-col gap-6">
        <Marker
          v-for="variant in markerVariantNames"
          :key="variant"
          :variant="variant"
          :label="`A ${variant} marker`"
        />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Icons</h2>
      <div class="flex max-w-sm flex-col gap-6">
        <Marker
          v-for="variant in markerVariantNames"
          :key="variant"
          :variant="variant"
          icon="search"
        >
          Explored 4 files
        </Marker>
        <Marker icon="success" label="Syncing completed" class="flex-col items-center" />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Loading and shimmer</h2>
      <div class="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          :label="running ? 'Finish' : 'Run again'"
          @click="running = !running"
        />
      </div>
      <div class="flex max-w-sm flex-col gap-6">
        <Marker
          role="status"
          icon="check"
          :loading="running"
          :label="running ? 'Running tests' : 'Tests passed'"
        />
        <Marker
          role="status"
          variant="separator"
          :loading="running"
          :shimmer="running"
          :label="running ? 'Reading 4 files' : 'Read 4 files'"
        />
        <Marker role="status" shimmer label="Thinking..." />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Links and buttons</h2>
      <div class="flex max-w-sm flex-col gap-6">
        <Marker as="a" href="#links" icon="fileText" label="View the pull request" />
        <Marker as="button" type="button" icon="x" @click="reverts++">
          Revert this change ({{ reverts }})
        </Marker>
        <Marker as="a" href="#links" variant="border" icon="folder" label="Open the workspace" />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Slots and ui</h2>
      <div class="flex max-w-sm flex-col gap-6">
        <Marker variant="border">
          <template #icon>
            <Icon name="star" class="size-4 text-warning" />
          </template>
          Starred by <strong class="text-foreground">Ada</strong>
        </Marker>
        <Marker loading label="Custom loading slot">
          <template #loading>
            <span class="size-2 rounded-full bg-primary" />
          </template>
        </Marker>
        <Marker
          icon="info"
          label="Styled through ui"
          :ui="{
            root: () => ({ class: 'text-primary' }),
            icon: () => ({ class: 'size-5' }),
            label: () => ({ class: 'font-medium uppercase tracking-wide' }),
          }"
        />
        <Marker aria-label="Synced" icon="check" />
      </div>
    </section>
  </main>
</template>
