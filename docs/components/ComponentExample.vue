<script setup lang="ts">
import { Check, Clipboard, RotateCcw } from 'lucide'
import { computed, onBeforeUnmount, reactive, ref } from 'vue'
import type {
  ComponentDocConfig,
  ComponentExampleConfig,
  ExampleState,
} from '@docs/config/component-docs'
import DocsIcon from '@docs/components/DocsIcon.vue'
import ExampleColorControl from '@docs/components/controls/ExampleColorControl.vue'
import ExampleSelectControl from '@docs/components/controls/ExampleSelectControl.vue'

const props = defineProps<{
  component: ComponentDocConfig
  example: ComponentExampleConfig
}>()

const controls = computed(() => props.example.controls ?? [])

function initialState(): ExampleState {
  return Object.fromEntries(controls.value.map((control) => [control.key, control.default]))
}

const state = reactive<ExampleState>(initialState())
const exampleProps = computed(() => props.example.props(state))
const visibleControls = computed(() =>
  controls.value.filter((control) => control.visible?.(state) ?? true),
)
const code = computed(() => {
  const name = props.component.title
  const attributes = Object.entries(exampleProps.value)
    .map(([key, value]) =>
      typeof value === 'string' ? ` ${key}="${value}"` : ` :${key}="${value}"`,
    )
    .join('')

  return `<script setup lang="ts">
import { ${name} } from '@nono/ui/vue'
<${'/'}script>

<template>
  <${name}${attributes} />
</template>`
})

function reset() {
  Object.assign(state, initialState())
}

const copied = ref(false)
let copyTimer: ReturnType<typeof setTimeout> | undefined

async function copyCode() {
  if (!navigator.clipboard) return

  await navigator.clipboard.writeText(code.value)
  copied.value = true
  clearTimeout(copyTimer)
  copyTimer = setTimeout(() => (copied.value = false), 1600)
}

onBeforeUnmount(() => clearTimeout(copyTimer))
</script>

<template>
  <article class="w-full max-w-full min-w-0 overflow-hidden rounded-xl border text-card-foreground">
    <header class="flex flex-wrap items-start justify-between gap-3 border-b p-4 sm:p-5">
      <div class="grid gap-1">
        <h3 class="font-semibold">{{ example.title }}</h3>
        <p class="text-sm text-muted-foreground">{{ example.description }}</p>
      </div>
      <button
        v-if="controls.length"
        type="button"
        class="inline-flex items-center gap-1.5 rounded-md border bg-background px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
        @click="reset"
      >
        <DocsIcon :icon="RotateCcw" :size="14" />
        Reset
      </button>
    </header>

    <div v-if="controls.length" class="border-b bg-muted/20 px-4 py-4 sm:px-5">
      <div class="flex flex-wrap gap-4">
        <template v-for="control in visibleControls" :key="control.key">
          <ExampleSelectControl
            v-if="control.type === 'select'"
            v-model="state[control.key]!"
            :label="control.label"
            :options="control.options ?? []"
          />
          <ExampleColorControl v-else v-model="state[control.key]!" :label="control.label" />
        </template>
      </div>
    </div>

    <div class="grid min-h-36 w-full max-w-full min-w-0 place-items-center p-8 sm:min-h-44">
      <component :is="component.component" v-bind="exampleProps" />
    </div>

    <div class="relative min-w-0 border-t bg-muted/40">
      <button
        type="button"
        class="absolute top-3 right-3 inline-flex size-8 items-center justify-center rounded-md border bg-background text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        :aria-label="copied ? 'Code copied' : 'Copy code'"
        :title="copied ? 'Copied' : 'Copy code'"
        @click="copyCode"
      >
        <DocsIcon :icon="copied ? Check : Clipboard" />
      </button>
      <div class="w-full max-w-full min-w-0 overflow-x-auto">
        <pre
          class="m-0 w-max min-w-full p-4 pr-14 text-sm leading-6 whitespace-pre"
        ><code>{{ code }}</code></pre>
      </div>
    </div>
  </article>
</template>
