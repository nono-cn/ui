<script setup lang="ts">
import { ref } from 'vue'
import {
  Accordion,
  accordionIndicatorPositions,
  accordionIndicators,
  accordionSizes,
  accordionVariantNames,
  Badge,
  Button,
  Icon,
  themeColors,
  type AccordionExpose,
  type AccordionItem,
} from '@nono/ui'
import { dark } from '@docs/components/useDocsTheme'

const faq: AccordionItem[] = [
  {
    value: 'shipping',
    label: 'What are your shipping options?',
    content: 'Standard shipping takes 5 to 7 days and express 2 to 3. Orders over 50 € ship free.',
  },
  {
    value: 'returns',
    label: 'What is your return policy?',
    content: 'Return any unused item in its original packaging within 30 days.',
  },
  {
    value: 'support',
    label: 'How can I reach support?',
    content: 'Write to us by email or chat. We answer within 24 hours on business days.',
  },
]

const settings: AccordionItem[] = [
  { value: 'profile', label: 'Profile', icon: 'user', content: 'Name, photo and email.' },
  {
    value: 'favorites',
    label: 'Favorites',
    icon: 'star',
    trailingIcon: 'warning',
    content: 'Two of your saved searches no longer return results.',
  },
  { value: 'security', label: 'Security', icon: 'lock', content: 'Password and two-factor.' },
]

const counts: Record<string, number> = { profile: 0, favorites: 2, security: 1 }

const plans: AccordionItem[] = [
  { value: 'free', label: 'Free', slot: 'free' },
  { value: 'pro', label: 'Pro', slot: 'pro' },
  { value: 'team', label: 'Team (coming soon)', disabled: true, content: 'Coming soon.' },
]

const unnamed: AccordionItem[] = [
  { label: 'First, without value', content: 'Identified by its index: 0.' },
  { label: 'Second, without value', content: 'Identified by its index: 1.' },
]

const value = ref<string[]>(['returns'])
const accordion = ref<AccordionExpose>()
const lastChange = ref('')
const draft = ref('')
</script>

<template>
  <main class="mx-auto flex max-w-4xl flex-col gap-8 p-8 text-foreground">
    <header class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Playground</h1>
      <Button variant="outline" size="sm" :label="dark ? 'Light' : 'Dark'" @click="dark = !dark" />
    </header>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">v-model, multiple and expose</h2>
      <div class="flex flex-wrap items-center gap-2">
        <Button variant="outline" size="sm" label="Open all" @click="accordion?.openAll()" />
        <Button variant="outline" size="sm" label="Close all" @click="accordion?.closeAll()" />
        <Button
          variant="outline"
          size="sm"
          label="Toggle support"
          @click="accordion?.toggle('support')"
        />
        <Button variant="plain" size="sm" label="Focus" @click="accordion?.focus()" />
        <span class="text-sm text-muted-foreground">value: {{ value }}</span>
      </div>
      <Accordion
        ref="accordion"
        v-model="value"
        multiple
        :items="faq"
        @value-change="(next, details) => (lastChange = `${next} (${details.reason})`)"
      />
      <span class="text-sm text-muted-foreground">last change: {{ lastChange || '-' }}</span>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Variants</h2>
      <div class="grid gap-6 sm:grid-cols-2">
        <div v-for="variant in accordionVariantNames" :key="variant" class="flex flex-col gap-2">
          <span class="text-sm text-muted-foreground">{{ variant }}</span>
          <Accordion :items="faq" :variant="variant" :default-value="['shipping']" />
        </div>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Indicators</h2>
      <div class="grid gap-6 sm:grid-cols-2">
        <template v-for="indicator in accordionIndicators" :key="indicator">
          <div
            v-for="position in accordionIndicatorPositions"
            :key="position"
            class="flex flex-col gap-2"
          >
            <span class="text-sm text-muted-foreground">{{ indicator }} / {{ position }}</span>
            <Accordion
              :items="faq"
              variant="outline"
              :indicator="indicator"
              :indicator-position="position"
              :default-value="['shipping']"
            />
          </div>
        </template>
        <div class="flex flex-col gap-2" dir="rtl">
          <span class="text-sm text-muted-foreground">rtl chevron / start</span>
          <Accordion :items="faq" variant="outline" indicator-position="start" />
        </div>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Sizes</h2>
      <div class="flex flex-col gap-4">
        <Accordion
          v-for="size in accordionSizes"
          :key="size"
          :items="settings"
          variant="separated"
          :size="size"
          :default-value="['profile']"
        />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Colors and radius (focus ring)</h2>
      <div class="grid gap-4 sm:grid-cols-2">
        <Accordion
          v-for="color in [...themeColors, '#6366f1']"
          :key="color"
          :items="faq.slice(0, 2)"
          variant="separated"
          :color="color"
          :radius="color === 'primary' ? 'none' : color === 'secondary' ? 'xl' : 8"
        />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Single, not collapsible</h2>
      <Accordion :items="faq" :collapsible="false" :default-value="['shipping']" />
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Disabled</h2>
      <Accordion :items="plans" variant="outline" disabled />
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Leading, label, trailing and indicator slots</h2>
      <Accordion :items="settings" variant="outline">
        <template #leading="{ item, open }">
          <Icon :name="item.icon!" :class="open ? 'text-primary' : 'text-muted-foreground'" />
        </template>
        <template #label="{ item, index }">
          <strong>{{ index + 1 }}.</strong> {{ item.label }}
        </template>
        <template #trailing="{ value: key, open }">
          <Badge
            v-if="counts[key]"
            :label="String(counts[key])"
            size="sm"
            :variant="open ? 'solid' : 'soft'"
          />
        </template>
        <template #indicator="{ open }">
          <span class="text-xs text-muted-foreground">{{ open ? 'Hide' : 'Show' }}</span>
        </template>
      </Accordion>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Item slots and content slot</h2>
      <Accordion :items="plans" variant="separated" :default-value="['pro']">
        <template #item-free>
          <p>Up to 3 projects. <strong>0 € / month</strong></p>
        </template>
        <template #item-pro>
          <div class="flex items-center gap-3">
            Unlimited projects. <strong>12 € / month</strong>
            <Button size="sm" label="Upgrade" />
          </div>
        </template>
      </Accordion>
      <Accordion :items="faq" variant="soft">
        <template #content="{ item, index }">
          <p>
            <strong>#{{ index }}</strong> {{ item.content }}
          </p>
        </template>
      </Accordion>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Items without value</h2>
      <Accordion :items="unnamed" :default-value="['1']" />
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Keep mounted and hidden until found</h2>
      <Accordion
        :items="faq.slice(0, 1).concat({ value: 'draft', label: 'Draft', slot: 'draft' })"
        keep-mounted
      >
        <template #item-draft>
          <input
            v-model="draft"
            class="rounded border px-2 py-1"
            placeholder="Close me and reopen"
          />
        </template>
      </Accordion>
      <Accordion :items="faq" hidden-until-found variant="outline" />
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">ui</h2>
      <Accordion
        :items="faq"
        variant="separated"
        :ui="{
          root: () => ({ class: 'gap-4' }),
          item: ({ open }) => ({ class: open ? 'border-primary' : '' }),
          trigger: ({ open }) => ({ class: open ? 'text-primary' : '' }),
          label: () => ({ class: 'uppercase tracking-wide' }),
          indicatorIcon: ({ open }) => ({ class: open ? 'text-primary' : '' }),
          body: () => ({ class: 'text-foreground' }),
        }"
      />
    </section>
  </main>
</template>
