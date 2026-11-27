<script setup lang="ts">
import { ref } from 'vue'
import { Bubble, BubbleGroup, bubbleVariantNames, Button, themeColors } from '@nono/ui'
import { dark } from '@docs/components/useDocsTheme'

const replies = ['Tomorrow at 10', 'Friday afternoon', 'Next week']
const picked = ref('')
const likes = ref(2)
const expanded = ref(false)

const answer =
  'The build failed because the lockfile was out of date. Run npm install, commit the new lockfile and push again. If it still fails, clear the CI cache: old dependencies can survive between runs and hide the real error.'
</script>

<template>
  <main class="mx-auto flex max-w-4xl flex-col gap-8 p-8 text-foreground">
    <header class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Playground</h1>
      <Button variant="outline" size="sm" :label="dark ? 'Light' : 'Dark'" @click="dark = !dark" />
    </header>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Conversation</h2>
      <div class="flex max-w-md flex-col gap-4 rounded-xl border p-4">
        <Bubble variant="soft" color="neutral" text="Hi! When can we review the release?" />
        <BubbleGroup align="end">
          <Bubble text="Let me check my calendar." />
          <Bubble
            text="Any of these work for me:"
            reactions="👍"
            reactions-align="start"
            :ui="{ reactions: () => ({ role: 'img', 'aria-label': 'Reactions: thumbs up' }) }"
          />
        </BubbleGroup>
        <BubbleGroup align="end">
          <Bubble
            v-for="reply in replies"
            :key="reply"
            variant="soft"
            :text="reply"
            @click="picked = reply"
          />
        </BubbleGroup>
        <Bubble v-if="picked" variant="soft" color="neutral" :text="`${picked} it is.`">
          <template #reactions>
            <Button
              size="xs"
              radius="full"
              variant="plain"
              color="neutral"
              :label="`❤️ ${likes}`"
              @click="likes++"
            />
          </template>
        </Bubble>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Variants and colors</h2>
      <div class="grid gap-6 sm:grid-cols-2">
        <div v-for="variant in bubbleVariantNames" :key="variant" class="flex flex-col gap-2">
          <span class="text-sm text-muted-foreground">{{ variant }}</span>
          <Bubble
            v-for="color in themeColors"
            :key="color"
            :variant="variant"
            :color="color"
            :text="`${color} message`"
          />
        </div>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Reactions</h2>
      <div class="flex max-w-md flex-col gap-4">
        <Bubble variant="soft" color="neutral" text="Bottom end (default)" reactions="👀 🚀 +2" />
        <Bubble
          align="end"
          text="Top start"
          reactions="🎉 👏"
          reactions-side="top"
          reactions-align="start"
        />
        <Bubble color="error" variant="soft" text="The deploy failed on step 3.">
          <template #reactions>
            <Button label="Retry" size="xs" radius="full" variant="plain" color="error" />
          </template>
        </Bubble>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Slot, link, plain and show more</h2>
      <div class="flex max-w-md flex-col gap-4">
        <Bubble variant="outline" color="neutral">
          Run <code class="font-mono text-xs">npm install</code> and <strong>push again</strong>.
        </Bubble>
        <Bubble
          align="end"
          href="#report"
          variant="outline"
          text="Open the report"
          :ui="{ content: () => ({ target: '_blank', rel: 'noopener' }) }"
        />
        <Bubble variant="plain" color="neutral" :text="answer" />
        <Bubble variant="soft" color="neutral">
          <p>{{ expanded ? answer : `${answer.slice(0, 80)}...` }}</p>
          <Button
            variant="link"
            size="xs"
            color="neutral"
            class="px-0"
            :label="expanded ? 'Show less' : 'Show more'"
            @click="expanded = !expanded"
          />
        </Bubble>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">RTL and ui</h2>
      <div class="flex max-w-md flex-col gap-4" dir="rtl">
        <Bubble variant="soft" color="neutral" text="مرحبا" reactions="👋" />
        <Bubble align="end" text="أهلا" />
      </div>
      <Bubble
        text="Custom ui"
        reactions="✨"
        :ui="{
          root: () => ({ class: 'max-w-xs' }),
          content: () => ({ class: 'italic shadow-md' }),
          reactions: () => ({ class: 'bg-primary text-primary-foreground' }),
        }"
      />
    </section>
  </main>
</template>
