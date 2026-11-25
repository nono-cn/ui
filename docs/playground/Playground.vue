<script setup lang="ts">
import { onScopeDispose, ref } from 'vue'
import {
  Button,
  ProgressCircular,
  progressCircularSizes,
  themeColors,
  type GaugeLabelDetails,
} from '@nono/ui'
import { dark } from '@docs/components/useDocsTheme'

const value = ref(40)
const running = ref(false)
let timer: ReturnType<typeof setInterval> | undefined

function stop() {
  clearInterval(timer)
  running.value = false
}

function run() {
  if (running.value) return stop()
  if (value.value >= 100) value.value = 0
  running.value = true
  timer = setInterval(() => {
    value.value = Math.min(100, value.value + 2)
    if (value.value >= 100) stop()
  }, 80)
}

onScopeDispose(stop)

const indeterminate = ref(false)

const files = ref(3)

const thicknesses = [1, 4, 8, 12, 16, 20, 25, 40, -5]

const remaining = (current: number) => `${Math.ceil((100 - current) / 10)}m`

const filesLabel = (current: number | null, details: GaugeLabelDetails) =>
  `${current} of ${details.max} files, ${details.formatted}`
</script>

<template>
  <main class="mx-auto flex max-w-3xl flex-col gap-8 p-8 text-foreground">
    <header class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Playground</h1>
      <Button variant="outline" size="sm" :label="dark ? 'Light' : 'Dark'" @click="dark = !dark" />
    </header>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Controls</h2>
      <div class="flex flex-wrap items-center gap-3">
        <input
          v-model.number="value"
          type="range"
          min="-20"
          max="120"
          aria-label="Value"
          class="w-48"
        />
        <span class="w-10 text-sm text-muted-foreground tabular-nums">{{ value }}</span>
        <Button size="sm" variant="outline" :label="running ? 'Stop' : 'Run'" @click="run" />
        <Button size="sm" variant="outline" label="0" @click="value = 0" />
        <Button size="sm" variant="outline" label="100" @click="value = 100" />
        <Button
          size="sm"
          :variant="indeterminate ? 'solid' : 'outline'"
          label="Indeterminate"
          @click="indeterminate = !indeterminate"
        />
      </div>
      <p class="text-xs text-muted-foreground">
        Every ring below that follows the controls uses this value. The range goes past 0 and 100 to
        check clamping.
      </p>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Basic · label and showValue</h2>
      <div class="flex flex-wrap items-start gap-6">
        <ProgressCircular :value="indeterminate ? null : value" label="Exporting" show-value />
        <ProgressCircular :value="indeterminate ? null : value" show-value aria-label="Value" />
        <ProgressCircular :value="indeterminate ? null : value" label="Label only" />
        <ProgressCircular :value="indeterminate ? null : value" aria-label="Ring only" />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Status · indeterminate, progressing, complete</h2>
      <div class="flex flex-wrap items-start gap-6">
        <ProgressCircular :value="null" label="indeterminate" show-value />
        <ProgressCircular :value="0" label="zero" show-value />
        <ProgressCircular :value="50" label="progressing" show-value />
        <ProgressCircular :value="100" label="complete" show-value />
        <ProgressCircular :value="150" label="above max" show-value />
        <ProgressCircular :value="-10" label="below min" show-value />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Size</h2>
      <div class="flex flex-wrap items-start gap-6">
        <ProgressCircular
          v-for="size in progressCircularSizes"
          :key="size"
          :value="indeterminate ? null : value"
          :size="size"
          :label="size"
          show-value
        />
      </div>
      <div class="flex flex-wrap items-start gap-6">
        <ProgressCircular
          v-for="size in progressCircularSizes"
          :key="size"
          :value="null"
          :size="size"
          :aria-label="`Indeterminate ${size}`"
        />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Thickness (out of range values are clamped to 1–25)</h2>
      <div class="flex flex-wrap items-start gap-6">
        <ProgressCircular
          v-for="thickness in thicknesses"
          :key="thickness"
          :value="indeterminate ? null : value"
          :thickness="thickness"
          size="lg"
          :label="String(thickness)"
          show-value
        />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Color</h2>
      <div class="flex flex-wrap items-start gap-6">
        <ProgressCircular
          v-for="color in themeColors"
          :key="color"
          :value="indeterminate ? null : value"
          :color="color"
          :label="color"
          show-value
        />
        <ProgressCircular
          :value="indeterminate ? null : value"
          color="#6366f1"
          label="#6366f1"
          show-value
        />
        <ProgressCircular
          :value="indeterminate ? null : value"
          color="oklch(70% 0.2 30)"
          label="oklch"
          show-value
        />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Inverted</h2>
      <div class="flex flex-wrap items-start gap-6">
        <ProgressCircular
          :value="indeterminate ? null : value"
          inverted
          label="inverted"
          show-value
        />
        <ProgressCircular :value="null" inverted label="inverted · null" />
        <div dir="rtl">
          <ProgressCircular :value="indeterminate ? null : value" label="rtl" show-value />
        </div>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Min and max</h2>
      <div class="flex items-center gap-2">
        <Button size="sm" variant="outline" label="−" @click="files = Math.max(0, files - 1)" />
        <Button size="sm" variant="outline" label="+" @click="files = Math.min(5, files + 1)" />
      </div>
      <div class="flex flex-wrap items-start gap-6">
        <ProgressCircular :value="files" :max="5" label="max 5" show-value />
        <ProgressCircular :value="files" :min="1" :max="5" label="min 1, max 5" show-value />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Format and locale</h2>
      <div class="flex flex-wrap items-start gap-6">
        <ProgressCircular
          :value="2.4"
          :max="8"
          :format="{ style: 'unit', unit: 'gigabyte', maximumFractionDigits: 1 }"
          size="xl"
          label="Unit (gigabyte)"
          show-value
        />
        <ProgressCircular
          :value="indeterminate ? null : value"
          :format="{ style: 'percent', minimumFractionDigits: 1 }"
          size="xl"
          label="One decimal"
          show-value
        />
        <ProgressCircular
          :value="indeterminate ? null : value"
          :format="remaining"
          size="lg"
          label="Function"
          show-value
        />
        <ProgressCircular
          :value="indeterminate ? null : value"
          locale="fr-FR"
          label="fr-FR"
          show-value
        />
        <ProgressCircular
          :value="indeterminate ? null : value"
          locale="ar-EG"
          label="ar-EG"
          show-value
        />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">getValueLabel (inspect aria-valuetext)</h2>
      <ProgressCircular
        :value="files"
        :max="5"
        :get-value-label="filesLabel"
        label="Uploading files"
        show-value
      />
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Slots</h2>
      <div class="flex flex-wrap items-start gap-6">
        <ProgressCircular :value="indeterminate ? null : value" size="xl" show-value>
          <template #label="{ status }">
            Deploying <span class="text-muted-foreground">· {{ status }}</span>
          </template>
          <template #value="{ text, status }">
            {{ status === 'complete' ? 'Done' : status === 'indeterminate' ? '…' : text }}
          </template>
        </ProgressCircular>
        <ProgressCircular :value="files" :max="5" size="xl" aria-label="Files">
          <template #value="{ value: current, max }">{{ current }}/{{ max }}</template>
        </ProgressCircular>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">ui and class</h2>
      <div class="flex flex-wrap items-start gap-6">
        <ProgressCircular
          :value="indeterminate ? null : value"
          size="xl"
          label="Muted track, success on complete"
          show-value
          :ui="{
            track: () => ({ class: 'stroke-muted' }),
            indicator: ({ status }) => ({
              class: status === 'complete' ? 'stroke-success' : '',
            }),
            value: ({ status }) => ({ class: status === 'complete' ? 'text-success' : '' }),
          }"
        />
        <ProgressCircular
          :value="indeterminate ? null : value"
          class="rounded-lg border p-3"
          label="class on the root"
          :ui="{ svg: () => ({ class: 'size-24' }) }"
          show-value
        />
      </div>
    </section>
  </main>
</template>
