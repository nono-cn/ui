<script setup lang="ts">
import { ref } from 'vue'
import { Bubble, bubbleVariantNames, Button, Link, Popover, themeColors } from '@nono/ui'
import { dark } from '@docs/components/useDocsTheme'

const replies = ['Tomorrow at 10', 'Friday afternoon', 'Next week']
const picked = ref('')
const likes = ref(2)
const expanded = ref(false)
const lastAction = ref('')
const messageActions = ['Reply', 'Copy', 'Delete']
const lastClicked = ref('')
const clicks = ref(0)
const retryStatus = ref('Not sent')

function press(label: string) {
  lastClicked.value = label
  clicks.value++
}

async function retry() {
  retryStatus.value = 'Sending...'
  await new Promise((resolve) => setTimeout(resolve, 1500))
  retryStatus.value = 'Sent'
}

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
        <div class="flex flex-col gap-1">
          <Bubble align="end" text="Let me check my calendar." />
          <Bubble
            align="end"
            text="Any of these work for me:"
            reactions-align="start"
            :ui="{ reactions: () => ({ role: 'img', 'aria-label': 'Reactions: thumbs up' }) }"
          >
            <template #reactions>👍</template>
          </Bubble>
        </div>
        <div class="flex flex-wrap justify-end gap-2">
          <Bubble
            v-for="reply in replies"
            :key="reply"
            class="m-0"
            variant="outline"
            interactive
            :text="reply"
            @click="picked = reply"
          />
        </div>
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
      <h2 class="font-medium">Interactive</h2>
      <p class="text-sm text-muted-foreground">
        Last clicked: <strong>{{ lastClicked || 'none' }}</strong> · {{ clicks }} clicks
      </p>

      <h3 class="text-sm font-medium">Variants</h3>
      <div class="flex flex-wrap items-center gap-2">
        <Bubble
          v-for="variant in bubbleVariantNames"
          :key="variant"
          class="m-0"
          :variant="variant"
          interactive
          :text="variant"
          @click="press(variant)"
        />
      </div>

      <h3 class="text-sm font-medium">Colors (soft)</h3>
      <div class="flex flex-wrap gap-2">
        <Bubble
          v-for="color in [...themeColors, '#ff00ff']"
          :key="color"
          class="m-0"
          variant="soft"
          :color="color"
          interactive
          :text="color"
          @click="press(color)"
        />
      </div>

      <h3 class="text-sm font-medium">Retry</h3>
      <div class="flex max-w-md flex-col gap-2">
        <Bubble
          align="end"
          variant="soft"
          color="error"
          interactive
          text="The message failed. Tap to retry."
          @click="retry"
        />
        <p class="text-end text-sm text-muted-foreground">{{ retryStatus }}</p>
      </div>

      <h3 class="text-sm font-medium">With rich text and reactions</h3>
      <div class="flex max-w-md flex-col gap-4">
        <Bubble variant="outline" color="neutral" interactive @click="press('rich text')">
          Run <code class="font-mono text-xs">npm install</code> and <strong>push again</strong>.
          <template #reactions>👍 2</template>
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
        <Bubble variant="soft" color="neutral" text="Bottom end (default)">
          <template #reactions>👀 🚀 +2</template>
        </Bubble>
        <Bubble align="end" text="Top start" reactions-side="top" reactions-align="start">
          <template #reactions>🎉 👏</template>
        </Bubble>
        <Bubble color="error" variant="soft" text="The deploy failed on step 3.">
          <template #reactions>
            <Button label="Retry" size="xs" radius="full" variant="plain" color="error" />
          </template>
        </Bubble>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Slots and show more</h2>
      <div class="flex max-w-md flex-col gap-4">
        <Bubble variant="outline" color="neutral">
          <p>
            Run <code class="font-mono text-xs">npm install</code> and <strong>push again</strong>.
          </p>
        </Bubble>
        <Bubble align="end" variant="outline">
          <Link href="#report" label="Open the report" target="_blank" rel="noopener" />
        </Bubble>
        <Bubble align="end" variant="solid" color="error" text="The deploy failed on step 3.">
          <Button label="Retry" />
        </Bubble>
        <Bubble variant="soft" color="neutral">
          <div>
            <p>{{ expanded ? answer : `${answer.slice(0, 80)}...` }}</p>
            <Button
              variant="link"
              size="xs"
              color="neutral"
              class="px-0"
              :label="expanded ? 'Show less' : 'Show more'"
              @click="expanded = !expanded"
            />
          </div>
        </Bubble>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">Popover</h2>
      <div class="flex max-w-md flex-col gap-4">
        <Popover side="top" align="start">
          <Bubble
            variant="soft"
            color="neutral"
            text="Press this message to see its actions."
            interactive
          />
          <template #content="{ close }">
            <div class="flex flex-col">
              <Button
                v-for="action in messageActions"
                :key="action"
                variant="plain"
                size="sm"
                :color="action === 'Delete' ? 'error' : 'neutral'"
                :label="action"
                @click="
                  () => {
                    lastAction = action
                    close()
                  }
                "
              />
            </div>
          </template>
        </Popover>
        <p v-if="lastAction" class="text-sm text-muted-foreground">Last action: {{ lastAction }}</p>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">RTL and ui</h2>
      <div class="flex max-w-md flex-col gap-4" dir="rtl">
        <Bubble variant="soft" color="neutral" text="مرحبا">
          <template #reactions>👋</template>
        </Bubble>
        <Bubble align="end" text="أهلا" />
      </div>
      <Bubble
        text="Custom ui"
        :ui="{
          root: () => ({ class: 'max-w-xs' }),
          content: () => ({ class: 'italic shadow-md' }),
          reactions: () => ({ class: 'bg-primary text-primary-foreground' }),
        }"
      >
        <template #reactions>✨</template>
      </Bubble>
    </section>
  </main>
</template>
