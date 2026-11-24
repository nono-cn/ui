<script setup lang="ts">
import { ref } from 'vue'
import {
  Avatar,
  Badge,
  Button,
  FormField,
  Input,
  Kbd,
  Popover,
  Textarea,
  popoverAligns,
  popoverSides,
  type PopoverDismissAttemptDetails,
  type PopoverExpose,
  type PopoverModal,
  type PopoverOpenChangeDetails,
  type PopoverUi,
} from '@nono/ui'
import { dark } from '@docs/components/useDocsTheme'

const radii = ['none', 'sm', 'md', 'lg', 'full', 0, 12, '1.5rem'] as const
const modals: PopoverModal[] = [false, 'trap-focus', true]

const open = ref(false)

const log = ref<string[]>([])
function record(entry: string) {
  log.value = [entry, ...log.value].slice(0, 8)
}
function onOpenChange(value: boolean, details: PopoverOpenChangeDetails) {
  record(`openChange → ${value} (${details.reason})`)
}

const cancelOutside = ref(true)
function onGuardedChange(value: boolean, details: PopoverOpenChangeDetails) {
  if (!value && cancelOutside.value && details.reason === 'outside-press') details.cancel()
}

const draft = ref('')
const dismissLog = ref<string[]>([])
function onDismissAttempt(details: PopoverDismissAttemptDetails) {
  dismissLog.value = [`dismissAttempt (${details.reason})`, ...dismissLog.value].slice(0, 5)
}

function discard(close: () => void) {
  draft.value = ''
  close()
}

const exposed = ref<PopoverExpose | null>(null)

const anchor = ref<HTMLElement | null>(null)

const container = ref<HTMLElement | null>(null)

const name = ref('Ada Lovelace')
const saved = ref<string | null>(null)
function save(close: () => void) {
  saved.value = name.value
  close()
}

const styled: PopoverUi = {
  content: ({ open: isOpen }) => ({
    class: isOpen ? 'border-primary' : '',
    'aria-label': 'Styled',
  }),
  label: () => ({ class: 'text-primary' }),
  description: () => ({ class: 'italic' }),
  arrow: () => ({ class: 'bg-muted' }),
}
</script>

<template>
  <main class="mx-auto flex max-w-3xl flex-col gap-8 p-8 text-foreground">
    <header class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Playground</h1>
      <Button variant="outline" size="sm" :label="dark ? 'Light' : 'Dark'" @click="dark = !dark" />
    </header>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Popover · basic, title and description</h2>
      <div class="flex flex-wrap gap-2">
        <Popover label="Share this document" description="Anyone with the link can view it.">
          <Button variant="outline" label="Label + description" />
          <template #content>
            <Input default-value="nono.dev/d/q3-roadmap" read-only aria-label="Link" />
          </template>
        </Popover>
        <Popover label="Only a label">
          <Button variant="outline" label="Label" />
        </Popover>
        <Popover :ui="{ content: () => ({ 'aria-label': 'Bare panel' }) }">
          <Button variant="outline" label="Content only" />
          <template #content>Plain content, named with aria-label through ui.</template>
        </Popover>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Popover · v-model, defaultOpen and events</h2>
      <div class="flex flex-wrap items-center gap-2">
        <Popover
          v-model:open="open"
          label="Controlled"
          description="Bound with v-model:open."
          @open-change="onOpenChange"
          @open-change-complete="(value) => record(`openChangeComplete → ${value}`)"
        >
          <Button variant="outline" label="v-model" />
        </Popover>
        <Button
          variant="soft"
          :label="open ? 'Close from outside' : 'Open from outside'"
          @click="open = !open"
        />
        <Badge :label="`open: ${open}`" variant="soft" />
      </div>
      <ul class="text-xs text-muted-foreground">
        <li v-for="(entry, index) in log" :key="index">{{ entry }}</li>
      </ul>
      <div class="flex items-center gap-2">
        <Popover default-open label="Started open" description="defaultOpen, uncontrolled.">
          <Button variant="outline" label="defaultOpen" />
        </Popover>
      </div>
      <div class="flex items-center gap-2">
        <Popover
          label="Outside press is canceled"
          description="openChange calls details.cancel() for outside-press."
          @open-change="onGuardedChange"
        >
          <Button variant="outline" label="Cancel in openChange" />
        </Popover>
        <label class="flex items-center gap-1 text-sm">
          <input v-model="cancelOutside" type="checkbox" />
          cancel outside-press
        </label>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Popover · side × align</h2>
      <div class="grid grid-cols-3 gap-2">
        <template v-for="side in popoverSides" :key="side">
          <Popover
            v-for="align in popoverAligns"
            :key="`${side}-${align}`"
            :side="side"
            :align="align"
            arrow
            :label="`${side} · ${align}`"
          >
            <Button variant="outline" size="sm" :label="`${side} ${align}`" />
          </Popover>
        </template>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Popover · offsets, arrow and collision</h2>
      <div class="flex flex-wrap gap-2">
        <Popover label="Default gap" description="4px">
          <Button variant="outline" label="No arrow" />
        </Popover>
        <Popover arrow label="With arrow" description="8px by default">
          <Button variant="outline" label="Arrow" />
        </Popover>
        <Popover arrow :side-offset="20" label="sideOffset 20">
          <Button variant="outline" label="sideOffset 20" />
        </Popover>
        <Popover align="start" :align-offset="24" label="alignOffset 24">
          <Button variant="outline" label="alignOffset 24" />
        </Popover>
        <Popover arrow align="start" :arrow-padding="24" label="arrowPadding 24">
          <Button variant="outline" label="arrowPadding" />
        </Popover>
        <Popover side="left" :collision-padding="48" label="collisionPadding 48">
          <Button variant="outline" label="collisionPadding" />
        </Popover>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Popover · radius</h2>
      <div class="flex flex-wrap gap-2">
        <Popover v-for="radius in radii" :key="radius" :radius="radius" :label="`radius ${radius}`">
          <Button variant="outline" size="sm" :label="String(radius)" />
        </Popover>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Popover · your own close buttons with close()</h2>
      <div class="flex flex-wrap gap-2">
        <Popover label="Corner button" description="An icon button placed with classes.">
          <Button variant="outline" label="Corner close" />
          <template #content="{ close }">
            <Button
              icon="x"
              size="xs"
              variant="plain"
              color="neutral"
              aria-label="Close"
              class="absolute end-2 top-2"
              @click="close"
            />
          </template>
        </Popover>
        <Popover label="Edit name">
          <Button variant="outline" :label="saved ? `Saved: ${saved}` : 'Edit name'" />
          <template #content="{ close }">
            <form class="flex flex-col gap-2" @submit.prevent="save(close)">
              <Input v-model="name" aria-label="Name" />
              <div class="flex justify-end gap-2">
                <Button variant="outline" size="sm" label="Cancel" @click="close" />
                <Button type="submit" size="sm" label="Save" />
              </div>
            </form>
          </template>
        </Popover>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Popover · modal</h2>
      <div class="flex flex-wrap gap-2">
        <Popover
          v-for="modal in modals"
          :key="String(modal)"
          :modal="modal"
          :label="`modal: ${modal}`"
          description="Tab around, scroll and click outside."
        >
          <Button variant="outline" :label="`modal ${modal}`" />
          <template #content="{ close }">
            <div class="flex flex-col gap-2">
              <Input placeholder="First" />
              <Input placeholder="Second" />
              <Button size="sm" variant="outline" label="Done" @click="close" />
            </div>
          </template>
        </Popover>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Popover · dismissible false and dismissAttempt</h2>
      <Popover
        :dismissible="!draft"
        label="Draft a note"
        description="While it has text, Escape and outside presses do not close it."
        @dismiss-attempt="onDismissAttempt"
      >
        <Button variant="outline" :label="draft ? 'Unsaved draft' : 'Write a note'" />
        <template #content="{ close }">
          <div class="flex flex-col gap-2">
            <Textarea v-model="draft" placeholder="Type something" />
            <Button size="sm" variant="outline" label="Discard" @click="discard(close)" />
          </div>
        </template>
      </Popover>
      <ul class="text-xs text-muted-foreground">
        <li v-for="(entry, index) in dismissLog" :key="index">{{ entry }}</li>
      </ul>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Popover · openOnHover and delays</h2>
      <div class="flex flex-wrap gap-2">
        <Popover open-on-hover arrow label="Hover" description="delay 300, closeDelay 0">
          <Button variant="outline" label="Default delays" />
        </Popover>
        <Popover
          open-on-hover
          :delay="0"
          :close-delay="300"
          arrow
          label="Instant"
          description="delay 0, closeDelay 300. Cross the gap into it."
        >
          <Button variant="outline" label="Instant" />
          <template #content>
            <Button size="sm" label="Clickable inside" />
          </template>
        </Popover>
        <Popover open-on-hover :delay="1000" label="Slow" description="delay 1000">
          <Button variant="outline" label="Slow" />
        </Popover>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Popover · shortcut and disabled</h2>
      <div class="flex flex-wrap gap-2">
        <Popover shortcut="mod+i" label="Shortcut" description="Press ⌘I / Ctrl+I anywhere.">
          <Button variant="outline" label="mod+i" />
        </Popover>
        <Popover shortcut="mod+shift+k" label="Shortcut in the trigger">
          <template #default="{ shortcut }">
            <Button variant="outline" label="Insert">
              <template #trailing>
                <Kbd size="sm" :label="shortcut" />
              </template>
            </Button>
          </template>
        </Popover>
        <Popover disabled label="Never opens">
          <Button variant="outline" label="disabled" />
        </Popover>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Popover · triggers</h2>
      <div class="flex flex-wrap items-center gap-2">
        <Popover label="Icon button">
          <Button icon="save" variant="outline" aria-label="Save" />
        </Popover>
        <Popover label="Avatar" description="Any component that renders one element.">
          <Avatar alt="Ada Lovelace" aria-label="Ada Lovelace" class="cursor-pointer" />
        </Popover>
        <Popover label="Native button">
          <button class="rounded border px-2 py-1 text-sm">native &lt;button&gt;</button>
        </Popover>
        <Popover label="Slot state">
          <template #default="{ open: isOpen }">
            <Button variant="soft" :label="isOpen ? 'Open' : 'Closed'" />
          </template>
        </Popover>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Popover · focus (initialFocus, finalFocus)</h2>
      <div class="flex flex-wrap gap-2">
        <Popover label="auto" description="First focusable field.">
          <Button variant="outline" label="initialFocus auto" />
          <template #content>
            <Input placeholder="Gets focus" />
          </template>
        </Popover>
        <Popover initial-focus="content" label="content" description="The panel itself.">
          <Button variant="outline" label="initialFocus content" />
          <template #content>
            <Input placeholder="No focus" />
          </template>
        </Popover>
        <Popover initial-focus="#second-field" label="Selector" description="#second-field">
          <Button variant="outline" label="initialFocus selector" />
          <template #content>
            <div class="flex flex-col gap-2">
              <Input placeholder="First" />
              <Input id="second-field" placeholder="Second gets focus" />
            </div>
          </template>
        </Popover>
        <Popover final-focus="#final-target" label="finalFocus" description="Close with Escape.">
          <Button variant="outline" label="finalFocus elsewhere" />
          <template #content>
            <Input placeholder="Escape from here" />
          </template>
        </Popover>
        <Input id="final-target" placeholder="Focus returns here" class="max-w-48" />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Popover · anchor, container and keepMounted</h2>
      <div class="flex flex-wrap items-center gap-2">
        <Popover :anchor="anchor" side="right" arrow label="Anchored" description="To the box.">
          <Button variant="outline" label="Anchor to box" />
        </Popover>
        <div
          ref="anchor"
          class="rounded border border-dashed px-3 py-2 text-xs text-muted-foreground"
        >
          anchor
        </div>
        <Popover :anchor="{ x: 40, y: 40 }" label="Point" description="{ x: 40, y: 40 }">
          <Button variant="outline" label="Anchor to point" />
        </Popover>
        <Popover keep-mounted label="keepMounted" description="Stays in the DOM, hidden.">
          <Button variant="outline" label="keepMounted" />
        </Popover>
      </div>
      <div ref="container" class="relative rounded border p-3">
        <Popover :container="container" label="In container" description="Rendered inside the box.">
          <Button variant="outline" label="container" />
        </Popover>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Popover · expose</h2>
      <div class="flex flex-wrap items-center gap-2">
        <Popover ref="exposed" label="Exposed" description="Driven by the buttons.">
          <Button variant="outline" label="Target" />
        </Popover>
        <Button size="sm" variant="soft" label="setOpen(true)" @click="exposed?.setOpen(true)" />
        <Button size="sm" variant="soft" label="toggle()" @click="exposed?.toggle()" />
        <Button size="sm" variant="soft" label="close()" @click="exposed?.close()" />
        <Button size="sm" variant="soft" label="focus()" @click="exposed?.focus()" />
        <Button
          size="sm"
          variant="soft"
          label="isOpen()"
          @click="record(`isOpen → ${exposed?.isOpen()}`)"
        />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Popover · ui and slots</h2>
      <div class="flex flex-wrap gap-2">
        <Popover :ui="styled" arrow label="Styled" description="Every ui key.">
          <Button variant="outline" label="ui" />
        </Popover>
        <Popover>
          <Button variant="outline" label="label/description slots" />

          <template #content>hola asda asd asd asd asd asd ad ad asddddddddddddddd </template>
        </Popover>
        <Popover :ui="{ content: () => ({ class: 'w-96' }) }" label="Wider" description="w-96">
          <Button variant="outline" label="Custom width" />
        </Popover>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Popover · form inside</h2>
      <Popover label="Dimensions" description="Set the layer size." side="right" align="start">
        <Button variant="outline" label="Dimensions" class="self-start" />
        <template #content>
          <div class="flex flex-col gap-2">
            <FormField label="Width" orientation="horizontal">
              <Input default-value="100%" />
            </FormField>
            <FormField label="Height" orientation="horizontal">
              <Input default-value="25px" />
            </FormField>
          </div>
        </template>
      </Popover>
    </section>
  </main>
</template>
