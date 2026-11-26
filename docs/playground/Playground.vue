<script setup lang="ts">
import { ref } from 'vue'
import {
  Badge,
  Button,
  Tabs,
  tabsSizes,
  tabsVariantNames,
  themeColors,
  type TabsExpose,
  type TabsItem,
} from '@nono/ui'
import { dark } from '@docs/components/useDocsTheme'

const settings: TabsItem[] = [
  { value: 'account', label: 'Account', content: 'Update your name, photo and email address.' },
  { value: 'password', label: 'Password', content: 'Choose a new password of 12 characters.' },
  { value: 'billing', label: 'Billing', content: 'Change your plan and payment method.' },
]

const folders: TabsItem[] = [
  { value: 'inbox', label: 'Inbox', icon: 'folder', content: '3 new messages this morning.' },
  { value: 'starred', label: 'Starred', icon: 'star', content: '12 starred conversations.' },
  { value: 'archive', label: 'Archive', icon: 'fileArchive', content: 'Archived mail stays here.' },
]

const counts: Record<string, number> = { inbox: 3, starred: 12, archive: 0 }

const plans: TabsItem[] = [
  { value: 'free', label: 'Free', slot: 'free' },
  { value: 'pro', label: 'Pro', slot: 'pro' },
  { value: 'team', label: 'Team', disabled: true, content: 'Coming soon.' },
]

const value = ref<string | null>('password')
const tabs = ref<TabsExpose>()
const lastChange = ref('')
</script>

<template>
  <main class="mx-auto flex max-w-4xl flex-col gap-8 p-8 text-foreground">
    <header class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Playground</h1>
      <Button variant="outline" size="sm" :label="dark ? 'Light' : 'Dark'" @click="dark = !dark" />
    </header>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">v-model and expose</h2>
      <div class="flex flex-wrap items-center gap-2">
        <Button
          v-for="item in settings"
          :key="item.value"
          variant="outline"
          size="sm"
          :label="item.label"
          @click="value = item.value"
        />
        <Button variant="plain" size="sm" label="Focus" @click="tabs?.focus()" />
        <span class="text-sm text-muted-foreground">value: {{ value }}</span>
      </div>
      <Tabs
        ref="tabs"
        v-model="value"
        :items="settings"
        :ui="{ list: () => ({ 'aria-label': 'Settings' }) }"
        @value-change="(next, details) => (lastChange = `${next} (${details.reason})`)"
      />
      <span class="text-sm text-muted-foreground">last change: {{ lastChange || '—' }}</span>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Variants and colors</h2>
      <div v-for="variant in tabsVariantNames" :key="variant" class="flex flex-col gap-3">
        <div class="grid gap-4 sm:grid-cols-2">
          <Tabs
            v-for="color in [...themeColors, '#6366f1']"
            :key="color"
            :items="settings"
            :variant="variant"
            :color="color"
            :content="false"
            :ui="{ list: () => ({ 'aria-label': `${variant} ${color}` }) }"
          />
        </div>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Sizes</h2>
      <div v-for="variant in tabsVariantNames" :key="variant" class="flex flex-col gap-3">
        <Tabs
          v-for="size in tabsSizes"
          :key="size"
          :items="folders"
          :variant="variant"
          :size="size"
          :content="false"
          :ui="{ list: () => ({ 'aria-label': `${variant} ${size}` }) }"
        />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Vertical</h2>
      <div class="grid gap-6 sm:grid-cols-2">
        <Tabs
          v-for="variant in tabsVariantNames"
          :key="variant"
          :items="folders"
          :variant="variant"
          orientation="vertical"
          :ui="{ list: () => ({ 'aria-label': `Vertical ${variant}` }) }"
        />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Trailing slot</h2>
      <Tabs :items="folders" variant="link" :ui="{ list: () => ({ 'aria-label': 'Mail' }) }">
        <template #trailing="{ item, selected }">
          <Badge
            v-if="counts[item.value]"
            :label="String(counts[item.value])"
            size="sm"
            :variant="selected ? 'solid' : 'soft'"
          />
        </template>
      </Tabs>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Item slots and disabled</h2>
      <Tabs :items="plans" :ui="{ list: () => ({ 'aria-label': 'Plans' }) }">
        <template #item-free>
          <p class="text-sm">Up to 3 projects. <strong>0 € / month</strong></p>
        </template>
        <template #item-pro>
          <div class="flex items-center gap-3 text-sm">
            Unlimited projects. <strong>12 € / month</strong>
            <Button size="sm" label="Upgrade" />
          </div>
        </template>
      </Tabs>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Manual activation and keep mounted</h2>
      <Tabs
        :items="settings"
        activation="manual"
        keep-mounted
        :ui="{ list: () => ({ 'aria-label': 'Manual' }) }"
      />
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">ui</h2>
      <Tabs
        :items="folders"
        variant="link"
        :ui="{
          list: () => ({ 'aria-label': 'Styled', class: 'w-full' }),
          tab: ({ selected }) => ({ class: selected ? 'font-semibold' : 'opacity-70' }),
          panel: () => ({ class: 'rounded-md border p-4' }),
        }"
      />
    </section>
  </main>
</template>
