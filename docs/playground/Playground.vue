<script setup lang="ts">
import { ref } from 'vue'
import { AspectRatio, Button } from '@nono/ui'
import landscapeImage from '@docs/assets/landscape.svg'
import { dark } from '@docs/components/useDocsTheme'

const ratios = [
  { label: '21 / 9', value: 21 / 9 },
  { label: '16 / 9', value: 16 / 9 },
  { label: '4 / 3', value: 4 / 3 },
  { label: '1', value: 1 },
  { label: '3 / 4', value: 3 / 4 },
  { label: '9 / 16', value: 9 / 16 },
]

const ratio = ref(16 / 9)
</script>

<template>
  <main class="mx-auto flex max-w-4xl flex-col gap-8 p-8 text-foreground">
    <header class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Playground</h1>
      <Button variant="outline" size="sm" :label="dark ? 'Light' : 'Dark'" @click="dark = !dark" />
    </header>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Reactive ratio</h2>
      <div class="flex flex-wrap items-center gap-2">
        <Button
          v-for="option in ratios"
          :key="option.label"
          size="sm"
          :variant="ratio === option.value ? 'solid' : 'outline'"
          :label="option.label"
          @click="ratio = option.value"
        />
      </div>
      <AspectRatio :ratio="ratio" class="w-full max-w-md">
        <img
          :src="landscapeImage"
          alt="Mountains at sunset"
          class="size-full rounded-md object-cover"
        />
      </AspectRatio>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Ratios</h2>
      <div class="flex flex-wrap items-start gap-4">
        <figure v-for="option in ratios" :key="option.label" class="flex w-40 flex-col gap-1">
          <AspectRatio :ratio="option.value">
            <img :src="landscapeImage" alt="" class="size-full rounded-md object-cover" />
          </AspectRatio>
          <figcaption class="text-sm text-muted-foreground">{{ option.label }}</figcaption>
        </figure>
      </div>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Rounded and clipped</h2>
      <AspectRatio :ratio="4 / 3" class="w-full max-w-sm overflow-hidden rounded-xl">
        <img :src="landscapeImage" alt="" class="size-full object-cover" />
      </AspectRatio>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Taller content overflows</h2>
      <AspectRatio :ratio="3" class="w-full max-w-sm rounded-lg border">
        <div class="h-48 rounded-lg bg-primary/20 p-2 text-sm">Content 192px tall in a 3:1 box</div>
      </AspectRatio>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Invalid ratio falls back to 1</h2>
      <AspectRatio :ratio="0" class="w-40 rounded-lg bg-muted" />
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">ui</h2>
      <AspectRatio
        :ratio="16 / 9"
        class="w-full max-w-md"
        :ui="{ root: () => ({ class: 'rounded-2xl bg-muted p-4', 'aria-label': 'Cover' }) }"
      >
        <img :src="landscapeImage" alt="" class="size-full rounded-lg object-cover" />
      </AspectRatio>
    </section>
  </main>
</template>
