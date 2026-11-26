<script setup lang="ts">
import { ref } from 'vue'
import {
  Button,
  ButtonGroup,
  buttonSizes,
  buttonVariantNames,
  themeColors,
  themeRadii,
} from '@nono/ui'
import { dark } from '@docs/components/useDocsTheme'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const fail = () => wait(1500).then(() => Promise.reject(new Error('Failed')))

const clicks = ref(0)
const pendingDisabled = ref(false)
</script>

<template>
  <main class="mx-auto flex max-w-4xl flex-col gap-8 p-8 text-foreground">
    <header class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Playground</h1>
      <Button variant="outline" size="sm" :label="dark ? 'Light' : 'Dark'" @click="dark = !dark" />
    </header>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Variant × color</h2>
      <div v-for="variant in buttonVariantNames" :key="variant" class="flex flex-wrap gap-2">
        <Button
          v-for="color in themeColors"
          :key="color"
          :variant="variant"
          :color="color"
          :label="`${variant} ${color}`"
        />
        <Button :variant="variant" color="#6366f1" label="#6366f1" />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Size</h2>
      <div class="flex flex-wrap items-center gap-2">
        <Button v-for="size in buttonSizes" :key="size" :size="size" :label="size" icon="plus" />
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <Button
          v-for="size in buttonSizes"
          :key="size"
          :size="size"
          :label="size"
          trailing-icon="chevronDown"
        />
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <Button v-for="size in buttonSizes" :key="size" :size="size" :label="size" />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Radius</h2>
      <div class="flex flex-wrap items-center gap-2">
        <Button v-for="radius in themeRadii" :key="radius" :radius="radius" :label="radius" />
        <Button :radius="12" label="12" />
        <Button radius="0.25rem" label="0.25rem" />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Icons</h2>
      <div class="flex flex-wrap items-center gap-2">
        <Button icon="plus" label="Leading" />
        <Button trailing-icon="chevronDown" label="Trailing" />
        <Button icon="search" trailing-icon="chevronRight" label="Both" />
        <Button variant="outline" icon="trash2" color="error" label="Delete" />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Icon only (square)</h2>
      <div v-for="variant in buttonVariantNames" :key="variant" class="flex flex-wrap gap-2">
        <Button
          v-for="size in buttonSizes"
          :key="size"
          :variant="variant"
          :size="size"
          icon="heart"
          :aria-label="`Like ${size}`"
        />
        <Button :variant="variant" trailing-icon="chevronDown" aria-label="Open" />
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <Button icon="plus" label="Square forced" square />
        <Button icon="plus" :square="false" aria-label="Not square" />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Block and truncate</h2>
      <Button block icon="save" label="Block" />
      <div class="w-48">
        <Button
          block
          icon="file"
          trailing-icon="chevronDown"
          label="A very long label that should be truncated"
        />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Pending · return a Promise from @click</h2>
      <div class="flex flex-wrap items-center gap-2">
        <Button label="Save" @click="() => wait(2000)" />
        <Button icon="save" label="With icon" @click="() => wait(2000)" />
        <Button
          trailing-icon="chevronRight"
          variant="outline"
          label="Trailing"
          @click="() => wait(2000)"
        />
        <Button icon="save" aria-label="Save" @click="() => wait(2000)" />
        <Button label="Rejects" color="error" @click="fail" />
        <Button
          label="Announce Saving"
          pending-announcement="Saving"
          variant="soft"
          @click="() => wait(3000)"
        />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Disabled</h2>
      <div class="flex flex-wrap items-center gap-2">
        <Button
          v-for="variant in buttonVariantNames"
          :key="variant"
          :variant="variant"
          :label="variant"
          disabled
        />
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <Button label="Focusable when disabled" disabled focusable-when-disabled />
        <Button
          :label="pendingDisabled ? 'Disabled' : 'Enabled'"
          :disabled="pendingDisabled"
          @click="clicks++"
        />
        <Button
          variant="outline"
          label="Toggle disabled"
          @click="pendingDisabled = !pendingDisabled"
        />
        <span class="text-sm text-muted-foreground tabular-nums">{{ clicks }} clicks</span>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Type in a form</h2>
      <form class="flex flex-wrap items-center gap-2" @submit.prevent="clicks++">
        <Button type="submit" label="Submit" />
        <Button type="reset" variant="outline" label="Reset" />
        <Button variant="plain" label="Button (no submit)" />
      </form>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Slots</h2>
      <div class="flex flex-wrap items-center gap-2">
        <Button>Default slot</Button>
        <Button label="Leading">
          <template #leading>
            <span class="size-2 rounded-full bg-current" />
          </template>
        </Button>
        <Button label="Trailing" variant="outline">
          <template #trailing>
            <span class="rounded-sm bg-current/15 px-1 text-xs">⌘K</span>
          </template>
        </Button>
        <Button icon="save" label="Custom loading" @click="() => wait(2000)">
          <template #loading>
            <span class="text-xs">…</span>
          </template>
        </Button>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">ui and class</h2>
      <div class="flex flex-wrap items-center gap-2">
        <Button
          icon="star"
          trailing-icon="chevronDown"
          label="Every ui key"
          :ui="{
            root: () => ({ class: 'shadow-lg', label: 'xd', disabled: true }),
            icon: () => ({ class: 'text-warning' }),
            label: () => ({ class: 'uppercase tracking-wide' }),
            trailingIcon: () => ({ class: 'rotate-180' }),
            loadingIcon: () => ({ class: 'text-warning' }),
          }"
          @click="() => wait(2000)"
        />
        <Button class="rounded-none" label="class on the root" />
        <Button
          label="Hidden label on mobile"
          icon="plus"
          :ui="{ label: () => ({ class: 'sr-only sm:not-sr-only' }) }"
        />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">ButtonGroup</h2>
      <ButtonGroup>
        <Button variant="outline" label="Left" />
        <Button variant="outline" label="Center" />
        <Button variant="outline" icon="chevronDown" aria-label="More" />
      </ButtonGroup>
      <ButtonGroup size="sm">
        <Button label="Group sm" />
        <Button icon="plus" aria-label="Add" />
      </ButtonGroup>
      <ButtonGroup orientation="vertical">
        <Button variant="subtle" label="Top" />
        <Button variant="subtle" label="Bottom" />
      </ButtonGroup>
    </section>
  </main>
</template>
