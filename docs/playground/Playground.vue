<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import {
  Button,
  Link,
  ToggleGroup,
  type ToggleGroupItem,
  type ToggleGroupUi,
  type ToggleGroupValueChangeDetails,
} from '@nono/ui'
import { dark } from '@docs/components/useDocsTheme'

const periods: ToggleGroupItem[] = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
]

const filterNames: Record<string, string> = {
  favorite: 'Favorites',
  starred: 'Starred',
  saved: 'Saved',
}

const filterUi: ToggleGroupUi = {
  item: ({ item }) => ({
    'aria-label': filterNames[item.value],
    title: filterNames[item.value],
  }),
}

const boldWhenPressed: ToggleGroupUi = {
  item: ({ pressed }) => ({ class: pressed ? 'font-bold' : 'font-normal' }),
}

const filters: ToggleGroupItem[] = [
  { value: 'favorite', icon: 'heart' },
  { value: 'starred', icon: 'star' },
  { value: 'saved', icon: 'save' },
]

const views: ToggleGroupItem[] = [
  { value: 'files', label: 'Files', icon: 'file' },
  { value: 'folders', label: 'Folders', icon: 'folder' },
  { value: 'images', label: 'Images', icon: 'image' },
  { value: 'videos', label: 'Videos', icon: 'video', disabled: true },
]

const period = ref(['week'])
const active = ref(['favorite'])
const view = ref(['files'])
const locked = ref(['day'])
const log = ref<string[]>([])

const group = useTemplateRef<InstanceType<typeof ToggleGroup>>('group')

function onValueChange(value: string[], details: ToggleGroupValueChangeDetails) {
  if (value.includes('month')) details.cancel()
  log.value = [
    `${details.reason}: [${value.join(', ')}]${value.includes('month') ? ' (canceled)' : ''}`,
    ...log.value,
  ].slice(0, 5)
}
</script>

<template>
  <a href="https://example.com" target="_blank">asdadas</a>

  <main class="mx-auto flex max-w-3xl flex-col gap-8 p-8 text-foreground">
    <header class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Playground</h1>
      <Button variant="outline" size="sm" :label="dark ? 'Light' : 'Dark'" @click="dark = !dark" />
    </header>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Link</h2>

      <div class="flex gap-2">
        <Link
          trailing-icon="user"
          href="https://nono-ui.com"
          target="_blank"
          variant="outline"
          size="xl"
        />
        <Link
          trailing-icon="user"
          to="https://www.youtube.com/watch?v=WsWXequbzQ8&list=RDFHDw3Lg7X3o&index=6"
          target="_blank"
          variant="subtle"
          size="xl"
        />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">ToggleGroup · single, not deselectable</h2>
      <ToggleGroup v-model="period" :items="periods" :deselectable="false" aria-label="Period" />
      <p class="text-sm text-muted-foreground">value: {{ period }}</p>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">ToggleGroup · multiple, icons, aria-label from ui.item</h2>
      <ToggleGroup v-model="active" :items="filters" multiple aria-label="Filters" :ui="filterUi" />
      <p class="text-sm text-muted-foreground">value: {{ active }}</p>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">ToggleGroup · attached, outline / solid primary</h2>
      <ToggleGroup
        v-model="view"
        :items="views"
        attached
        :deselectable="false"
        variant="outline"
        active-variant="solid"
        active-color="primary"
        aria-label="View"
      />
      <ToggleGroup
        :items="views"
        attached
        orientation="vertical"
        variant="outline"
        active-variant="soft"
        active-color="success"
        size="sm"
        class="w-40"
        aria-label="View"
      />
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">ToggleGroup · sizes and radius</h2>
      <ToggleGroup
        v-for="size in ['xs', 'sm', 'md', 'lg', 'xl'] as const"
        :key="size"
        :items="periods"
        :default-value="['day']"
        :size="size"
        radius="full"
        variant="outline"
        active-variant="subtle"
        aria-label="Period"
        :color="'#ef4444'"
        :active-color="'#ef4444'"
      />
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">ToggleGroup · item slot and ui.item state</h2>
      <ToggleGroup
        :items="views"
        :default-value="['files']"
        multiple
        aria-label="View"
        :ui="boldWhenPressed"
      >
        <template #item="{ item, index, pressed, disabled }">
          {{ index + 1 }}. {{ item.label }}{{ pressed ? ' ✓' : '' }}{{ disabled ? ' (off)' : '' }}
        </template>
      </ToggleGroup>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">ToggleGroup · disabled group</h2>
      <ToggleGroup :items="periods" :model-value="['week']" disabled aria-label="Period" />
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">ToggleGroup · valueChange (Month is canceled) and expose</h2>
      <ToggleGroup
        ref="group"
        v-model="locked"
        :items="periods"
        multiple
        aria-label="Period"
        @value-change="onValueChange"
      />
      <div class="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          label="Select all"
          @click="group?.setValue(['day', 'week'])"
        />
        <Button size="sm" variant="outline" label="Clear" @click="group?.setValue([])" />
        <Button size="sm" variant="outline" label="Toggle week" @click="group?.toggle('week')" />
        <Button size="sm" variant="outline" label="Focus" @click="group?.focus()" />
      </div>
      <p class="text-sm text-muted-foreground">value: {{ locked }}</p>
      <ul class="text-xs text-muted-foreground">
        <li v-for="entry in log" :key="entry">{{ entry }}</li>
      </ul>
    </section>
  </main>
</template>
