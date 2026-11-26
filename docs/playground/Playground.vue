<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Button,
  Timeline,
  themeColors,
  timelineSizes,
  type TimelineExpose,
  type TimelineItem,
} from '@nono/ui'
import { dark } from '@docs/components/useDocsTheme'

const steps: TimelineItem[] = [
  {
    value: 'ordered',
    date: '2026-03-02T09:00:00Z',
    title: 'Order placed',
    description: 'Paid by card.',
  },
  { value: 'packed', date: '2026-03-03T14:30:00Z', title: 'Packed' },
  {
    value: 'shipped',
    date: '2026-03-04T08:15:00Z',
    title: 'Shipped',
    description: 'Handed to the carrier.',
  },
  { value: 'delivered', title: 'Delivered' },
]

const project: TimelineItem[] = [
  { value: 'kickoff', title: 'Kickoff', description: 'Scope agreed.', icon: 'fileText' },
  { value: 'design', title: 'Design', description: 'Mockups.', icon: 'image' },
  { value: 'build', title: 'Build', description: 'Features and tests.', icon: 'folderOpen' },
  { value: 'launch', title: 'Launch', description: 'Released.', icon: 'upload' },
]

const activity: TimelineItem[] = [
  { date: 'Just now', title: 'Ana commented', avatar: { text: 'AR', color: 'info' } },
  { date: '2 hours ago', title: 'Luis approved', avatar: { text: 'LG', color: 'success' } },
  { date: 'Yesterday', title: 'Eva opened the request', avatar: { text: 'EM' } },
]

const current = ref(1)
const value = computed(() => steps[current.value]?.value)
const timeline = ref<TimelineExpose>()
</script>

<template>
  <main class="mx-auto flex max-w-4xl flex-col gap-8 p-8 text-foreground">
    <header class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Playground</h1>
      <Button variant="outline" size="sm" :label="dark ? 'Light' : 'Dark'" @click="dark = !dark" />
    </header>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Value</h2>
      <div class="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          label="Back"
          :disabled="current === 0"
          @click="current--"
        />
        <Button
          variant="outline"
          size="sm"
          label="Next"
          :disabled="current === steps.length - 1"
          @click="current++"
        />
        <Button variant="plain" size="sm" label="Focus current" @click="timeline?.focus(value)" />
      </div>
      <Timeline
        ref="timeline"
        :items="steps"
        :value="value"
        :date-options="{ dateStyle: 'medium', timeZone: 'UTC' }"
        aria-label="Order"
      />
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Reverse</h2>
      <Timeline :items="steps" value="packed" reverse aria-label="Order" />
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Horizontal</h2>
      <Timeline :items="steps" :value="value" orientation="horizontal" aria-label="Order" />
      <Timeline :items="project" value="design" orientation="horizontal" aria-label="Project" />
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Color</h2>
      <div class="grid grid-cols-2 gap-6 sm:grid-cols-4">
        <Timeline
          v-for="color in [...themeColors, '#6366f1']"
          :key="color"
          :items="project"
          value="build"
          :color="color"
          :aria-label="color"
        />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Size</h2>
      <div class="grid grid-cols-2 gap-6 sm:grid-cols-5">
        <Timeline
          v-for="size in timelineSizes"
          :key="size"
          :items="project"
          value="design"
          :size="size"
          :aria-label="size"
        />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Activity feed</h2>
      <Timeline :items="activity" feed aria-label="Activity" />
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Slots and ui</h2>
      <Timeline
        :items="project"
        value="build"
        aria-label="Project"
        :ui="{
          title: ({ status }) => ({ class: status === 'current' ? 'text-primary' : '' }),
          connector: () => ({ class: 'bg-transparent border-s-2 border-dashed w-0' }),
        }"
      >
        <template #marker="{ index }">
          <span class="text-xs font-semibold">{{ index + 1 }}</span>
        </template>
        <template #description="{ item, status }">
          {{ item.description }}
          <span v-if="status === 'current'" class="text-xs text-primary">In progress</span>
        </template>
      </Timeline>
    </section>
  </main>
</template>
