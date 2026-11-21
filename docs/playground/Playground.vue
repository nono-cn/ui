<script setup lang="ts">
import { ref } from 'vue'
import { Button, Input, Switch, Toggle } from '@nono/ui'
import { dark } from '@docs/components/useDocsTheme'

const text = ref('Hello')
const pressed = ref(false)
const checked = ref(true)
</script>

<template>
  <main class="mx-auto flex max-w-3xl flex-col gap-8 p-8 text-foreground">
    <header class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Playground</h1>
      <Button variant="outline" size="sm" :label="dark ? 'Light' : 'Dark'" @click="dark = !dark" />
    </header>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Input</h2>
      <Input
        v-model="text"
        clearable
        highlight
        leading-icon="search"
        :ui="{ input: () => ({ class: 'font-mono', title: 'playground' }) }"
      />
      <p class="text-sm text-muted-foreground">Value: {{ text }}</p>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Toggle</h2>
      <div class="flex gap-2">
        <Toggle v-model="pressed" label="Bold" />
        <Toggle
          variant="plain"
          label="Italic"
          leading-icon="star"
          :ui="{
            leadingIcon: () => ({
              class: 'font-mono',
              'stroke-width': 1,
              title: 'playground',
              'aria-hidden': 'false',
            }),
          }"
        />
        <Toggle variant="solid" color="primary" leading-icon="star" aria-label="Star" size="icon" />
      </div>
      <p class="text-sm text-muted-foreground">Bold pressed: {{ pressed }}</p>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Switch</h2>
      <Switch v-model="checked" aria-label="Notifications" />
    </section>
  </main>
</template>
