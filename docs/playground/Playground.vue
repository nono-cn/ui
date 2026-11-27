<script setup lang="ts">
import { createLocalStorage, createPreference } from '@ui-sdk/core'
import { usePreference } from '@ui-sdk/vue/preferences'
import { computed, reactive, ref } from 'vue'
import {
  Alert,
  App,
  Button,
  ButtonGroup,
  buttonSizes,
  buttonVariantNames,
  type AppDefaults,
  type ButtonSize,
  type ButtonVariant,
} from '@nono/ui'
import { dark } from '@docs/components/useDocsTheme'

const colors = ['primary', 'secondary', 'neutral', 'success', 'warning', 'error', 'info', '#6366f1']
const radii = ['none', 'sm', 'md', 'lg', 'full']

const button = reactive({
  variant: 'soft' as ButtonVariant,
  color: 'primary',
  size: 'md' as ButtonSize,
  radius: 'full',
  block: false,
  withUi: true,
})

const defaults = computed<AppDefaults>(() => ({
  button: {
    variant: button.variant,
    color: button.color,
    size: button.size,
    radius: button.radius,
    block: button.block,
    ui: button.withUi ? { root: () => ({ class: 'shadow-md px-8' }) } : undefined,
  },
}))

const density = createPreference({
  values: ['comfortable', 'compact'],
  defaultValue: 'comfortable',
  attribute: 'data-density',
  storage: createLocalStorage('playground-density'),
})
const densityState = usePreference(density)

const clicks = ref(0)
</script>

<template>
  <App :defaults="defaults" :preferences="[density]">
    <main class="mx-auto flex max-w-4xl flex-col gap-8 p-8 text-foreground">
      <header class="flex items-center justify-between">
        <h1 class="text-2xl font-semibold">Playground: App</h1>
        <Button
          variant="outline"
          color="neutral"
          size="sm"
          radius="md"
          :label="dark ? 'Light' : 'Dark'"
          @click="dark = !dark"
        />
      </header>

      <section class="flex flex-col gap-3 rounded-lg border p-4">
        <h2 class="font-medium">Button defaults</h2>
        <div class="flex flex-wrap items-center gap-4 text-sm">
          <label class="flex items-center gap-2">
            variant
            <select v-model="button.variant" class="rounded border bg-background px-2 py-1">
              <option v-for="variant in buttonVariantNames" :key="variant">{{ variant }}</option>
            </select>
          </label>
          <label class="flex items-center gap-2">
            color
            <select v-model="button.color" class="rounded border bg-background px-2 py-1">
              <option v-for="color in colors" :key="color">{{ color }}</option>
            </select>
          </label>
          <label class="flex items-center gap-2">
            size
            <select v-model="button.size" class="rounded border bg-background px-2 py-1">
              <option v-for="size in buttonSizes" :key="size">{{ size }}</option>
            </select>
          </label>
          <label class="flex items-center gap-2">
            radius
            <select v-model="button.radius" class="rounded border bg-background px-2 py-1">
              <option v-for="radius in radii" :key="radius">{{ radius }}</option>
            </select>
          </label>
          <label class="flex items-center gap-2">
            <input v-model="button.block" type="checkbox" /> block
          </label>
          <label class="flex items-center gap-2">
            <input v-model="button.withUi" type="checkbox" /> ui (shadow-md px-8)
          </label>
        </div>
        <pre class="overflow-auto rounded bg-muted p-3 text-xs">{{ defaults }}</pre>
      </section>

      <section class="flex flex-col gap-3">
        <h2 class="font-medium">From App only</h2>
        <div class="flex flex-wrap items-center gap-2">
          <Button label="Save" @click="clicks++" />
          <Button label="With icon" icon="plus" />
          <Button icon="star" aria-label="Favorite" />
          <span class="text-sm text-muted-foreground">clicks: {{ clicks }}</span>
        </div>
      </section>

      <section class="flex flex-col gap-3">
        <h2 class="font-medium">Own props win</h2>
        <div class="flex flex-wrap items-center gap-2">
          <Button label="variant=outline" variant="outline" />
          <Button label="color=error" color="error" />
          <Button label="size=xs" size="xs" />
          <Button label="radius=none" radius="none" />
          <Button label=":block=false" :block="false" />
        </div>
      </section>

      <section class="flex flex-col gap-3">
        <h2 class="font-medium">ui composition</h2>
        <p class="text-sm text-muted-foreground">
          App ui adds shadow-md px-8; this Button adds italic px-2. Expected: shadow, italic, px-2.
        </p>
        <div class="flex flex-wrap items-center gap-2">
          <Button label="Composed ui" :ui="{ root: () => ({ class: 'italic px-2' }) }" />
        </div>
      </section>

      <section class="flex flex-col gap-3">
        <h2 class="font-medium">ButtonGroup size wins over App</h2>
        <ButtonGroup>
          <Button label="Copy" />
          <Button label="Paste" />
          <Button label="Cut (size=lg)"  />
        </ButtonGroup>
      </section>

      <section class="flex flex-col gap-3">
        <h2 class="font-medium">Nested App</h2>
        <p class="text-sm text-muted-foreground">
          Inner App sets variant=outline and color=neutral; the rest comes from the outer App.
        </p>
        <App :defaults="{ button: { variant: 'outline', color: 'neutral' } }">
          <div class="flex flex-wrap items-center gap-2">
            <Button label="Nested" />
            <Button label="Nested with icon" trailing-icon="chevronRight" />
          </div>
        </App>
      </section>

      <section class="flex flex-col gap-3">
        <h2 class="font-medium">Alert close button</h2>
        <p class="text-sm text-muted-foreground">
          Alert passes size, radius and variant explicitly, so only the App ui reaches it.
        </p>
        <Alert label="Heads up" description="The close button keeps its own props." closable />
      </section>

      <section class="flex flex-col gap-3">
        <h2 class="font-medium">Preference (data-density, localStorage)</h2>
        <div class="flex flex-wrap items-center gap-2">
          <ButtonGroup>
            <Button
              v-for="value in ['comfortable', 'compact']"
              :key="value"
              :label="value"
              :variant="densityState.value === value ? 'solid' : 'outline'"
              @click="density.set(value)"
            />
          </ButtonGroup>
          <span class="text-sm text-muted-foreground">
            value: {{ densityState.value }} (reload to see it restored)
          </span>
        </div>
        <div class="density-demo flex flex-col rounded-lg border">
          <div v-for="row in 3" :key="row" class="border-b last:border-b-0">Row {{ row }}</div>
        </div>
      </section>
    </main>
  </App>
</template>

<style scoped>
.density-demo > div {
  padding: 1rem;
}

[data-density='compact'] .density-demo > div {
  padding: 0.25rem 1rem;
}
</style>
