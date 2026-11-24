<script setup lang="ts">
import { onScopeDispose, ref } from 'vue'
import {
  Button,
  Input,
  Kbd,
  KbdGroup,
  Popover,
  Switch,
  Textarea,
  kbdSizes,
  shortcuts,
  useShortcut,
  type ShortcutInfo,
} from '@nono/ui'
import { dark } from '@docs/components/useDocsTheme'

const notes = ref(0)
const addNote = () => notes.value++
const { ariaKeyshortcuts: noteAria } = useShortcut('n', addNote, { description: 'New note' })

const boldEnabled = ref(true)
const bold = ref(false)
const { text: boldText } = useShortcut(
  () => (boldEnabled.value ? 'mod+b' : null),
  () => (bold.value = !bold.value),
  { description: 'Toggle bold' },
)

const query = ref('')
useShortcut('mod+k', () => document.getElementById('shortcut-search')?.focus(), {
  description: 'Focus the search',
})
useShortcut('escape', () => (query.value = ''), {
  allowInInput: true,
  when: () => query.value !== '',
  description: 'Clear the search',
})

const keyOptions = ['alt+k', 'shift+?', 'mod+alt+j', 'g']
const customKeys = ref(keyOptions[0]!)
const customCount = ref(0)
const { text: customText, ariaKeyshortcuts: customAria } = useShortcut(
  customKeys,
  () => customCount.value++,
  { description: 'Count' },
)

const scopedNote = ref('')
const scopeStatus = ref('Focus the note to turn on its shortcut.')
useShortcut(
  'mod+enter',
  () => (scopeStatus.value = `Saved ${scopedNote.value.trim().length} characters`),
  { scope: 'note', when: () => scopedNote.value.trim() !== '', description: 'Save the note' },
)
onScopeDispose(() => shortcuts.setScope('note', false))
const available = ref<ShortcutInfo[]>([])

const layer = ref<HTMLElement | null>(null)
const layerCount = ref(0)
const { text: layerText } = useShortcut('mod+u', () => layerCount.value++, {
  layer,
  description: 'Only while the popover is open',
})

const kbdShortcuts = [
  'mod+k',
  'mod+shift+p',
  'alt+enter',
  'ctrl+c',
  'escape',
  'enter',
  'tab',
  'space',
  'backspace',
  'shift+arrowup',
  'pagedown',
  '?',
]
</script>

<template>
  <main class="mx-auto flex max-w-3xl flex-col gap-8 p-8 text-foreground">
    <header class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Playground</h1>
      <Button variant="outline" size="sm" :label="dark ? 'Light' : 'Dark'" @click="dark = !dark" />
    </header>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">useShortcut · basic (press N outside a field)</h2>
      <div class="flex items-center gap-3">
        <Button variant="outline" label="New note" :aria-keyshortcuts="noteAria" @click="addNote">
          <template #trailing>
            <Kbd size="sm" shortcut="n" aria-hidden="true" />
          </template>
        </Button>
        <span class="text-sm text-muted-foreground">
          notes: {{ notes }} · aria-keyshortcuts: {{ noteAria }}
        </span>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">useShortcut · on and off (getter returning null)</h2>
      <label class="flex items-center gap-2 text-sm">
        <Switch v-model="boldEnabled" />
        Shortcut on
      </label>
      <p class="text-sm" :class="bold ? 'font-bold' : ''">
        {{ boldEnabled ? `Press ${boldText} to toggle bold.` : `Off: text is "${boldText}".` }}
      </p>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">useShortcut · while typing (allowInInput and when)</h2>
      <Input
        id="shortcut-search"
        v-model="query"
        placeholder="Search"
        aria-label="Search"
        class="max-w-sm"
      >
        <template #trailing>
          <Kbd size="sm" shortcut="mod+k" aria-hidden="true" />
        </template>
      </Input>
      <p class="text-sm text-muted-foreground">
        <Kbd size="sm" shortcut="mod+k" /> focuses it from anywhere, even another field.
        <Kbd size="sm" shortcut="escape" /> clears it while you type, only when it has text.
      </p>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">useShortcut · reactive keys (ref)</h2>
      <div class="flex flex-wrap gap-2">
        <Button
          v-for="keys in keyOptions"
          :key="keys"
          size="sm"
          :variant="customKeys === keys ? 'solid' : 'outline'"
          :label="keys"
          @click="customKeys = keys"
        />
      </div>
      <p class="text-sm text-muted-foreground">
        Press {{ customText }} · count: {{ customCount }} · aria-keyshortcuts: {{ customAria }}
      </p>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">useShortcut · scope and shortcuts.list()</h2>
      <Textarea
        v-model="scopedNote"
        placeholder="Focus here, type, then press mod+enter"
        aria-label="Note"
        class="max-w-sm"
        @focus="shortcuts.setScope('note', true)"
        @blur="shortcuts.setScope('note', false)"
      />
      <p class="text-sm text-muted-foreground">{{ scopeStatus }}</p>
      <Button
        variant="outline"
        size="sm"
        label="Shortcuts available now"
        class="self-start"
        @click="available = shortcuts.list()"
      />
      <ul v-if="available.length" class="flex flex-col gap-1 text-sm">
        <li v-for="item in available" :key="item.keys" class="flex items-center gap-2">
          <Kbd size="sm" :shortcut="item.keys" />
          {{ item.description ?? item.keys }}
          <span v-if="item.scope" class="text-xs text-muted-foreground">({{ item.scope }})</span>
        </li>
      </ul>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">useShortcut · layer (only while the popover is open)</h2>
      <div class="flex items-center gap-3">
        <Popover label="Layer" :description="`Press ${layerText} while this is open.`">
          <Button variant="outline" label="Open popover" />
          <template #content>
            <div ref="layer" class="text-sm">count: {{ layerCount }}</div>
          </template>
        </Popover>
        <span class="text-sm text-muted-foreground">
          {{ layerText }} outside does nothing · count: {{ layerCount }}
        </span>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Kbd · shortcut</h2>
      <div class="flex flex-wrap items-center gap-2">
        <span
          v-for="keys in kbdShortcuts"
          :key="keys"
          class="flex items-center gap-1 text-xs text-muted-foreground"
        >
          <Kbd :shortcut="keys" />
          {{ keys }}
        </span>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <Kbd v-for="size in kbdSizes" :key="size" :size="size" shortcut="mod+k" />
        <Kbd variant="solid" color="primary" shortcut="mod+s" />
        <Kbd variant="outline" shortcut="escape" />
        <Kbd shortcut="" />
        <Kbd>Fn</Kbd>
        <Kbd shortcut="mod+k">slot wins</Kbd>
        <KbdGroup>
          <Kbd shortcut="mod" />
          <Kbd shortcut="shift" />
          <Kbd shortcut="p" />
        </KbdGroup>
      </div>
    </section>
  </main>
</template>
