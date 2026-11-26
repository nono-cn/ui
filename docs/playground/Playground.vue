<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Button,
  Icon,
  MeterGroup,
  meterGroupLegends,
  meterGroupSizes,
  themeColors,
  type MeterGroupItem,
} from '@nono/ui'
import { dark } from '@docs/components/useDocsTheme'

const gigabytes: Intl.NumberFormatOptions = {
  style: 'unit',
  unit: 'gigabyte',
  maximumFractionDigits: 1,
}

const photos = ref(48)

const storage = computed<MeterGroupItem[]>(() => [
  { label: 'Photos', value: photos.value, color: 'primary', icon: 'image' },
  { label: 'Videos', value: 32, color: 'warning', icon: 'video' },
  { label: 'Music', value: 14, color: 'success', icon: 'audio' },
  { label: 'Documents', value: 6, color: 'info', icon: 'fileText' },
])

const budget: MeterGroupItem[] = [
  { label: 'Rent', value: 40, color: 'primary' },
  { label: 'Food', value: 20, color: 'success' },
  { label: 'Transport', value: 10, color: 'warning' },
  { label: 'Leisure', value: 8, color: 'error' },
]

const tokens: MeterGroupItem[] = [
  { label: 'System prompt', value: 12, color: '#6366f1' },
  { label: 'Messages', value: 38, color: '#0ea5e9' },
  { label: 'Tools', value: 9, color: '#f59e0b' },
]

const uncolored: MeterGroupItem[] = [
  { label: 'Done', value: 45 },
  { label: 'Review', value: 20, color: 'warning' },
]

const overflow: MeterGroupItem[] = [
  { label: 'Planned', value: 70 },
  { label: 'Unplanned', value: 50, color: 'error' },
]

function usedOfTotal(value: number, { max }: { max: number }) {
  return `${value} GB used of ${max} GB`
}
</script>

<template>
  <main class="mx-auto flex max-w-4xl flex-col gap-8 p-8 text-foreground">
    <header class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Playground</h1>
      <Button variant="outline" size="sm" :label="dark ? 'Light' : 'Dark'" @click="dark = !dark" />
    </header>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Basic, max, format and getValueLabel</h2>
      <div class="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          label="-8 GB"
          @click="photos = Math.max(0, photos - 8)"
        />
        <Button variant="outline" size="sm" label="+8 GB" @click="photos += 8" />
        <span class="text-sm text-muted-foreground">photos: {{ photos }} GB</span>
      </div>
      <MeterGroup :items="budget" label="Monthly budget" show-value />
      <MeterGroup
        :items="storage"
        :max="128"
        :format="gigabytes"
        :get-value-label="usedOfTotal"
        locale="es-ES"
        label="Storage (es-ES)"
        show-value
      />
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Legend</h2>
      <MeterGroup
        v-for="legend in meterGroupLegends"
        :key="legend"
        :items="budget"
        :legend="legend"
        :label="`legend: ${legend}`"
        show-value
      />
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Separated</h2>
      <MeterGroup
        :items="storage"
        :max="128"
        :format="gigabytes"
        size="lg"
        separated
        label="Storage"
      />
      <MeterGroup :items="budget" size="xl" separated legend="inline" aria-label="Budget" />
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Color and custom colors</h2>
      <MeterGroup
        v-for="color in themeColors"
        :key="color"
        :items="uncolored"
        :color="color"
        :label="color"
        legend="inline"
        show-value
      />
      <MeterGroup :items="tokens" label="Context window" show-value />
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Size</h2>
      <MeterGroup
        v-for="size in meterGroupSizes"
        :key="size"
        :items="storage"
        :max="128"
        :format="gigabytes"
        :size="size"
        :label="size"
        legend="inline"
        show-value
      />
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Orientation and overflow</h2>
      <div class="flex h-56 gap-10">
        <MeterGroup :items="budget" orientation="vertical" label="Budget" show-value />
        <MeterGroup
          :items="storage"
          :max="128"
          :format="gigabytes"
          orientation="vertical"
          size="xl"
          separated
          label="Storage"
          show-value
        />
      </div>
      <MeterGroup :items="overflow" label="Capacity" show-value />
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Slots and ui</h2>
      <MeterGroup
        :items="storage"
        :max="128"
        :format="gigabytes"
        show-value
        :ui="{
          root: () => ({ class: 'rounded-lg border p-4' }),
          track: () => ({ class: 'h-3' }),
          segment: ({ index }) => ({ title: `Segment ${index + 1}` }),
          itemLabel: ({ percent }) => ({ class: percent > 30 ? 'font-semibold' : '' }),
        }"
      >
        <template #label="{ max }">
          <span class="flex items-center gap-1.5">
            <Icon name="folder" class="size-4" /> Drive of {{ max }} GB
          </span>
        </template>
        <template #value="{ value, max }">{{ max - value }} GB free</template>
        <template #item-leading="{ index }">
          <span class="text-xs tabular-nums text-muted-foreground">{{ index + 1 }}.</span>
        </template>
        <template #item-label="{ item }">
          <strong>{{ item.label }}</strong>
        </template>
        <template #item-value="{ text, percent }">
          {{ text }} · {{ Math.round(percent) }}%
        </template>
      </MeterGroup>
    </section>
  </main>
</template>
