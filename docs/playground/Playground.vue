<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Avatar,
  Button,
  Timeline,
  themeColors,
  timelineAligns,
  timelineSizes,
  type TimelineAlign,
  type AvatarProps,
  type TimelineExpose,
  type TimelineItem,
} from '@nono/ui'
import { dark } from '@docs/components/useDocsTheme'

const steps: TimelineItem[] = [
  {
    value: 'ordered',
    date: '2026-03-02T09:00:00Z',
    label: 'Order placed',
    description: 'Paid by card.',
  },
  { value: 'packed', date: '2026-03-03T14:30:00Z', label: 'Packed' },
  {
    value: 'shipped',
    date: '2026-03-04T08:15:00Z',
    label: 'Shipped',
    description: 'Handed to the carrier.',
  },
  { value: 'delivered', label: 'Delivered' },
]

const project: TimelineItem[] = [
  { value: 'kickoff', label: 'Kickoff', description: 'Scope agreed.', icon: 'fileText' },
  { value: 'design', label: 'Design', description: 'Mockups.', icon: 'image' },
  { value: 'build', label: 'Build', description: 'Features and tests.', icon: 'folderOpen' },
  { value: 'launch', label: 'Launch', description: 'Released.', icon: 'upload' },
]

const activity: TimelineItem[] = [
  { date: 'Just now', label: 'Ana commented' },
  { date: '2 hours ago', label: 'Luis approved' },
  { date: 'Yesterday', label: 'Eva opened the request' },
]

const avatars: AvatarProps[] = [
  { text: 'AR', color: 'info' },
  { text: 'LG', color: 'success' },
  { text: 'EM' },
]

const weeks = ['Week 1', 'Week 2-3', 'Week 4-7', 'Week 8']
const align = ref<TimelineAlign>('alternate')

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
      <Timeline :items="activity" feed aria-label="Activity">
        <template #marker="{ index }">
          <Avatar v-bind="avatars[index]" size="sm" />
        </template>
      </Timeline>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Align</h2>
      <div class="flex flex-wrap gap-2">
        <Button
          v-for="option in timelineAligns"
          :key="option"
          :variant="align === option ? 'solid' : 'outline'"
          size="sm"
          :label="option"
          @click="align = option"
        />
      </div>
      <Timeline :items="steps" :value="value" :align="align" aria-label="Order" />
      <Timeline :items="project" value="build" :align="align" aria-label="Project">
        <template #opposite="{ index }">
          <span class="text-muted-foreground">{{ weeks[index] }}</span>
        </template>
      </Timeline>
      <Timeline
        :items="steps"
        :value="value"
        :align="align"
        orientation="horizontal"
        aria-label="Order"
      />
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Content</h2>
      <Timeline
        :loop="true"
        :items="steps"
        :value="value"
        :date-options="{ dateStyle: 'medium', timeZone: 'UTC' }"
        aria-label="Order"
      >
        <template #content="{ item, status }">
          <div v-if="status === 'current'" class="mt-2 flex gap-2">
            <Button size="sm" label="Track package" />
            <Button variant="outline" size="sm" label="Contact carrier" />
          </div>
          <Button
            v-else-if="status === 'complete' && item.value === 'ordered'"
            class="mt-2 self-start"
            variant="plain"
            size="sm"
            label="Download invoice"
          />
        </template>
      </Timeline>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Slots and ui</h2>
      <Timeline
        :items="project"
        value="build"
        aria-label="Project"
        :ui="{
          label: ({ status }) => ({ class: status === 'current' ? 'text-primary' : '' }),
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
