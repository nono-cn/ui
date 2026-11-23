<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import {
  Badge,
  Button,
  Link,
  Tooltip,
  tooltipSides,
  type TooltipOpenChangeDetails,
  type TooltipUi,
} from '@nono/ui'
import { dark } from '@docs/components/useDocsTheme'

const aligns = ['start', 'center', 'end'] as const

const highlight: TooltipUi = {
  content: ({ open }) => ({
    class: open ? 'bg-primary font-semibold text-primary-foreground' : '',
  }),
}

const open = ref(false)
const locked = ref(false)
const log = ref<string[]>([])

const tooltip = useTemplateRef<InstanceType<typeof Tooltip>>('tooltip')

function onOpenChange(value: boolean, details: TooltipOpenChangeDetails) {
  if (value && locked.value) details.cancel()
  log.value = [
    `${details.reason}: ${value}${value && locked.value ? ' (canceled)' : ''}`,
    ...log.value,
  ].slice(0, 5)
}
</script>

<template>
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
      <h2 class="font-medium">Tooltip · text and shortcut</h2>
      <div class="flex gap-2">
        <Tooltip text="Save changes">
          <Button variant="outline" label="Save" />
        </Tooltip>
        <Tooltip text="Copy" shortcut="mod+c">
          <Button variant="outline" icon="file" square aria-label="Copy" />
        </Tooltip>
        <Tooltip shortcut="shift+?">
          <Button variant="outline" label="Shortcut only" />
        </Tooltip>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Tooltip · sides with arrow</h2>
      <div class="flex gap-2">
        <Tooltip v-for="side in tooltipSides" :key="side" :text="side" :side="side" arrow>
          <Button variant="outline" :label="side" />
        </Tooltip>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Tooltip · align and offsets</h2>
      <div class="flex gap-2">
        <Tooltip
          v-for="align in aligns"
          :key="align"
          :text="`A longer tooltip aligned to ${align}`"
          side="bottom"
          :align="align"
          :side-offset="12"
        >
          <Button variant="outline" :label="align" />
        </Tooltip>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Tooltip · radius</h2>
      <div class="flex gap-2">
        <Tooltip
          v-for="radius in ['none', 'sm', 'md', 'lg', 'full'] as const"
          :key="radius"
          :text="`radius ${radius}`"
          :radius="radius"
        >
          <Button variant="outline" :label="radius" />
        </Tooltip>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Tooltip · delays, toggleable and closeOnPress</h2>
      <div class="flex gap-2">
        <Tooltip text="Instant" :delay="0" :close-delay="0">
          <Button variant="outline" label="No delay" />
        </Tooltip>
        <Tooltip text="Slow" :delay="1000" :close-delay="500">
          <Button variant="outline" label="1s delay" />
        </Tooltip>
        <Tooltip text="Click toggles me" toggleable>
          <Button variant="outline" label="Toggleable" />
        </Tooltip>
        <Tooltip text="Stays after click" :close-on-press="false">
          <Button variant="outline" label="Keep on press" />
        </Tooltip>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Tooltip · triggers: plain element, link, disabled</h2>
      <div class="flex items-center gap-2">
        <Tooltip text="On a span">
          <span tabindex="0" class="rounded border px-2 py-1 text-sm">Span</span>
        </Tooltip>
        <Tooltip text="Opens nono-ui.com" type="description">
          <Link href="https://nono-ui.com" target="_blank" label="Link" variant="subtle" />
        </Tooltip>
        <Tooltip text="Never shown" disabled>
          <Button variant="outline" label="Disabled tooltip" />
        </Tooltip>
        <Tooltip text="Button is disabled">
          <Button variant="outline" label="Disabled button" disabled />
        </Tooltip>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Tooltip · default slot (trigger state)</h2>
      <div class="flex gap-2">
        <Tooltip text="Trigger knows it is open">
          <template #default="{ open: isOpen }">
            <Button :variant="isOpen ? 'solid' : 'outline'" :label="isOpen ? 'Open' : 'Closed'" />
          </template>
        </Tooltip>
        <Tooltip text="Component with fragment root">
          <Link href="https://nono-ui.com" target="_blank" label="Link trigger" />
        </Tooltip>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Tooltip · content slot</h2>
      <div class="flex gap-2">
        <Tooltip arrow>
          <Button variant="outline" label="Rich content" />
          <template #content>
            <span class="font-semibold">Rich</span>
            <span class="text-muted-foreground">content</span>
          </template>
        </Tooltip>
        <Tooltip shortcut="mod+s">
          <Button variant="outline" label="Content + shortcut" />
          <template #content="{ open: isOpen }">
            <span>Save {{ isOpen ? '·' : '' }}</span>
          </template>
        </Tooltip>
        <Tooltip text="Styled via ui" shortcut="mod+k" :ui="highlight">
          <Button variant="outline" label="ui" />
        </Tooltip>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Tooltip · shortcut slot (replaces the kbd)</h2>
      <div class="flex gap-2">
        <Tooltip text="Search" shortcut="mod+k">
          <Button variant="outline" label="Badge" />
          <template #shortcut="{ text }">
            <Badge size="sm" variant="soft" color="primary" :label="text" />
          </template>
        </Tooltip>
        <Tooltip text="Undo" shortcut="mod+z">
          <Button variant="outline" label="Plain element" :close-on-press="false" />
          <template #shortcut="{ text }">
            <span class="font-mono text-muted-foreground">{{ text }}</span>
          </template>
        </Tooltip>
        <Tooltip text="Copy" shortcut="mod+c" :ui="{ shortcut: () => ({ class: 'text-primary' }) }">
          <Button variant="outline" label="With ui.shortcut" />
          <template #shortcut="{ text }">
            <span>{{ text }}</span>
          </template>
        </Tooltip>
        <Tooltip text="Without shortcut prop the slot does not render">
          <Button variant="outline" label="No shortcut prop" />
          <template #shortcut="{ text }">
            <Badge size="sm" :label="text" />
          </template>
        </Tooltip>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Tooltip · v-model:open, openChange and expose</h2>
      <Tooltip
        ref="tooltip"
        v-model:open="open"
        text="Controlled"
        side="right"
        arrow
        @open-change="onOpenChange"
      >
        <Button variant="outline" label="Controlled" class="self-start" />
      </Tooltip>
      <div class="flex gap-2">
        <Button size="sm" variant="outline" label="Open" @click="tooltip?.setOpen(true)" />
        <Button size="sm" variant="outline" label="Close" @click="tooltip?.close()" />
        <Button size="sm" variant="outline" label="Toggle" @click="tooltip?.toggle()" />
        <Button size="sm" variant="outline" label="Focus" @click="tooltip?.focus()" />
        <Button
          size="sm"
          :variant="locked ? 'solid' : 'outline'"
          :label="locked ? 'Unlock' : 'Lock (cancel open)'"
          @click="locked = !locked"
        />
      </div>
      <p class="text-sm text-muted-foreground">open: {{ open }}</p>
      <ul class="text-xs text-muted-foreground">
        <li v-for="entry in log" :key="entry">{{ entry }}</li>
      </ul>
    </section>
  </main>
</template>
