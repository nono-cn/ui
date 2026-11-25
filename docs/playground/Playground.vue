<script setup lang="ts">
import { computed, onScopeDispose, ref } from 'vue'
import {
  Button,
  Progress,
  progressAnimations,
  progressSizes,
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

const insideSteps = [0, 2, 5, 10, 25, 50, 75, 90, 98, 100]
const insideNumber = ref(50)
const insideNull = ref(false)
const insideValue = computed(() => (insideNull.value ? null : insideNumber.value))

const remaining = (current: number) => `${Math.ceil((100 - current) / 10)} min left`

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
        Every bar below that follows the controls uses this value. The range goes past 0 and 100 to
        check clamping.
      </p>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Basic · label and showValue</h2>
      <Progress :value="indeterminate ? null : value" label="Exporting video" show-value />
      <Progress :value="indeterminate ? null : value" show-value aria-label="Value only" />
      <Progress :value="indeterminate ? null : value" label="Label only" />
      <Progress :value="indeterminate ? null : value" aria-label="Bar only" />
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Status · indeterminate, progressing, complete</h2>
      <Progress :value="null" label="indeterminate" show-value />
      <Progress :value="50" label="progressing" show-value />
      <Progress :value="100" label="complete" show-value />
      <Progress :value="150" label="value above max (clamped)" show-value />
      <Progress :value="-10" label="value below min (clamped)" show-value />
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Indeterminate · animation</h2>
      <Progress
        v-for="animation in progressAnimations"
        :key="animation"
        :label="animation"
        :animation="animation"
      />
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Size</h2>
      <Progress
        v-for="size in progressSizes"
        :key="size"
        :value="indeterminate ? null : value"
        :size="size"
        :label="size"
        show-value
      />
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Color</h2>
      <Progress
        v-for="color in themeColors"
        :key="color"
        :value="indeterminate ? null : value"
        :color="color"
        :label="color"
      />
      <Progress :value="indeterminate ? null : value" color="#6366f1" label="#6366f1" />
      <Progress
        :value="indeterminate ? null : value"
        color="oklch(70% 0.2 30)"
        label="oklch(70% 0.2 30)"
      />
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">valuePosition · inside</h2>
      <div class="flex flex-wrap items-center gap-3">
        <input
          v-model.number="insideNumber"
          type="range"
          min="-10"
          max="110"
          aria-label="Inside value"
          class="w-48"
        />
        <input
          v-model.number="insideNumber"
          type="number"
          aria-label="Inside value as a number"
          class="w-20 rounded-md border border-input bg-background px-2 py-1 text-sm"
        />
        <Button
          size="sm"
          :variant="insideNull ? 'solid' : 'outline'"
          label="null"
          @click="insideNull = !insideNull"
        />
      </div>
      <div class="flex flex-wrap gap-1">
        <Button
          v-for="step in insideSteps"
          :key="step"
          size="sm"
          :variant="!insideNull && insideNumber === step ? 'solid' : 'outline'"
          :label="String(step)"
          @click="((insideNull = false), (insideNumber = step))"
        />
      </div>
      <Progress
        v-for="size in progressSizes"
        :key="size"
        :value="insideValue"
        :size="size"
        :label="`inside · ${size}`"
        show-value
        value-position="inside"
      />
      <Progress
        :value="insideValue"
        inverted
        label="inside · inverted"
        show-value
        value-position="inside"
      />
      <Progress
        :value="insideValue"
        color="warning"
        label="inside · warning"
        show-value
        value-position="inside"
      />
      <Progress
        :value="insideValue"
        color="#fde047"
        label="inside · light custom color (dark contrast text)"
        show-value
        value-position="inside"
      />
      <Progress
        :value="insideValue"
        aria-label="Inside without label"
        show-value
        value-position="inside"
        size="xl"
      />
      <Progress :value="insideValue" aria-label="Inside slot" value-position="inside" size="xl">
        <template #value="{ value: current, min, max }"
          >{{ current }} / {{ max }} (min {{ min }})</template
        >
      </Progress>
      <div dir="rtl">
        <Progress :value="insideValue" label="inside · rtl" show-value value-position="inside" />
      </div>
      <div class="flex h-40 gap-6">
        <Progress
          orientation="vertical"
          :value="insideValue"
          aria-label="Vertical ignores inside"
          show-value
          value-position="inside"
        />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Inverted</h2>
      <Progress :value="indeterminate ? null : value" inverted label="inverted" show-value />
      <Progress
        v-for="animation in progressAnimations"
        :key="animation"
        :value="null"
        inverted
        :animation="animation"
        :label="`inverted · ${animation}`"
      />
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Vertical</h2>
      <div class="flex h-48 items-stretch gap-6">
        <Progress
          v-for="size in progressSizes"
          :key="size"
          orientation="vertical"
          :size="size"
          :value="indeterminate ? null : value"
          :aria-label="`Vertical ${size}`"
          show-value
        />
        <Progress
          orientation="vertical"
          inverted
          :value="indeterminate ? null : value"
          aria-label="Vertical inverted"
          show-value
        />
        <Progress
          v-for="animation in progressAnimations"
          :key="animation"
          orientation="vertical"
          :animation="animation"
          :aria-label="`Vertical ${animation}`"
        />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Min and max</h2>
      <div class="flex items-center gap-2">
        <Button size="sm" variant="outline" label="−" @click="files = Math.max(0, files - 1)" />
        <Button size="sm" variant="outline" label="+" @click="files = Math.min(5, files + 1)" />
      </div>
      <Progress :value="files" :max="5" label="Files (max 5)" show-value />
      <Progress :value="files" :min="1" :max="5" label="Files (min 1, max 5)" show-value />
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Format</h2>
      <Progress
        :value="2.4"
        :max="8"
        :format="{ style: 'unit', unit: 'gigabyte', maximumFractionDigits: 1 }"
        label="Unit (gigabyte)"
        show-value
      />
      <Progress
        :value="indeterminate ? null : value"
        :format="{ style: 'percent', minimumFractionDigits: 1 }"
        label="Percent with one decimal"
        show-value
      />
      <Progress
        :value="indeterminate ? null : value"
        :format="remaining"
        label="Function"
        show-value
      />
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Locale</h2>
      <Progress
        :value="2.4"
        :max="8"
        locale="en"
        :format="{ style: 'unit', unit: 'gigabyte', maximumFractionDigits: 1 }"
        label="en"
        show-value
      />
      <Progress
        :value="2.4"
        :max="8"
        locale="de-DE"
        :format="{ style: 'unit', unit: 'gigabyte', maximumFractionDigits: 1 }"
        label="de-DE"
        show-value
      />
      <Progress
        :value="indeterminate ? null : value"
        locale="fr-FR"
        label="fr-FR percent"
        show-value
      />
      <Progress
        :value="indeterminate ? null : value"
        locale="ar-EG"
        label="ar-EG percent"
        show-value
      />
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">getValueLabel (inspect aria-valuetext)</h2>
      <Progress
        :value="files"
        :max="5"
        :get-value-label="filesLabel"
        label="Uploading files"
        show-value
      />
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Slots</h2>
      <Progress :value="indeterminate ? null : value" show-value>
        <template #label="{ status }">
          Deploying <span class="text-muted-foreground">· {{ status }}</span>
        </template>
        <template #value="{ text, percent, status }">
          {{ status === 'complete' ? 'Done!' : status === 'indeterminate' ? '…' : text }}
          <span v-if="percent !== null" class="text-xs">({{ Math.round(percent) }})</span>
        </template>
      </Progress>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">ui and class</h2>
      <Progress
        :value="indeterminate ? null : value"
        label="Square track, thick and striped"
        show-value
        :ui="{
          track: () => ({ class: 'h-4 rounded-none' }),
          indicator: ({ status }) => ({
            class: status === 'complete' ? 'rounded-none bg-success' : 'rounded-none',
          }),
          value: ({ status }) => ({ class: status === 'complete' ? 'text-success' : '' }),
        }"
      />
      <Progress
        :value="indeterminate ? null : value"
        class="max-w-xs"
        label="class on the root (max-w-xs)"
        show-value
      />
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">RTL</h2>
      <div dir="rtl" class="flex flex-col gap-3">
        <Progress :value="indeterminate ? null : value" label="rtl" show-value />
        <Progress
          :value="indeterminate ? null : value"
          inverted
          label="rtl · inverted"
          show-value
        />
        <Progress :value="null" label="rtl · carousel" />
        <Progress :value="null" animation="elastic" label="rtl · elastic" />
      </div>
    </section>
  </main>
</template>
