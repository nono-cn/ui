<script setup lang="ts">
import { Check, Clipboard, RotateCcw } from 'lucide'
import { computed, h, onBeforeUnmount, reactive, ref } from 'vue'
import type {
  ComponentDocConfig,
  ComponentExampleConfig,
  ExampleProps,
  ExampleSlotContent,
  ExampleState,
  ExampleValue,
} from '@docs/config/component-docs'
import { runtimeValue, sourceOf } from '@docs/config/component-docs'
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
const handlers = computed(() => props.example.handlers ?? [])
const exampleBindings = computed(() => ({
  ...(runtimeValue(exampleProps.value) as ExampleProps),
  ...Object.fromEntries(
    handlers.value.map(({ event, handler }) => [
      `on${event[0]!.toUpperCase()}${event.slice(1)}`,
      handler,
    ]),
  ),
}))
const slots = computed<ExampleSlotContent[]>(() => {
  const slot = props.example.slot ?? props.component.slot
  return slot ? [slot].flat() : []
})
const renderedSlots = computed(() => {
  const names = [...new Set(slots.value.map((content) => content.slot ?? 'default'))]
  return Object.fromEntries(
    names.map((slot) => [
      slot,
      () =>
        slots.value
          .filter((content) => (content.slot ?? 'default') === slot)
          .map((content) =>
            'text' in content
              ? content.text
              : h(content.component, runtimeValue(content.props) as ExampleProps),
          ),
    ]),
  )
})
const ExamplePreview = () =>
  h(props.component.component, exampleBindings.value, renderedSlots.value)
const visibleControls = computed(() =>
  controls.value.filter((control) => control.visible?.(state) ?? true),
)
function keyOf(key: string) {
  return /^[A-Za-z_$][\w$]*$/.test(key) ? key : `'${key}'`
}

function literalOf(value: ExampleValue, indent = '  '): string {
  const source = sourceOf(value)
  if (source !== undefined) return source
  if (typeof value === 'string') return `'${value}'`
  if (typeof value === 'function') return `() => (${literalOf(value(), indent)})`
  if (Array.isArray(value)) {
    if (!value.some((item) => typeof item === 'object')) {
      return `[${value.map((item) => literalOf(item, indent)).join(', ')}]`
    }
    const inner = `${indent}  `
    const items = value.map((item) => `\n${inner}${literalOf(item, inner)},`)
    return `[${items.join('')}\n${indent}]`
  }
  if (typeof value !== 'object') return String(value)
  const entries = Object.entries(value).map(
    ([key, item]) => `${keyOf(key)}: ${literalOf(item, indent)}`,
  )
  return `{ ${entries.join(', ')} }`
}

function attributesOf(values: ExampleProps) {
  return Object.entries(values)
    .map(([key, value]) =>
      typeof value === 'string' ? ` ${key}="${value}"` : ` :${key}="${literalOf(value)}"`,
    )
    .join('')
}

const code = computed(() => {
  const name = props.component.title
  const attributes = attributesOf(exampleProps.value)
  const listeners = handlers.value
    .map(({ event, name: handler }) => ` @${event}="${handler}"`)
    .join('')
  const sources = handlers.value.map(({ source }) => `\n${source}\n`).join('')
  const names = slots.value.flatMap((content) => ('name' in content ? [content.name] : []))
  const imports = [...new Set([name, ...names])].sort().join(', ')
  const children = slots.value.map((content) => {
    const markup =
      'text' in content ? content.text : `<${content.name}${attributesOf(content.props)} />`
    if (!content.slot || content.slot === 'default') return `\n    ${markup}`
    return `\n    <template #${content.slot}>\n      ${markup}\n    </template>`
  })
  const element = children.length
    ? `<${name}${attributes}${listeners}>${children.join('')}\n  </${name}>`
    : `<${name}${attributes}${listeners} />`

  return `<script setup lang="ts">
import { ${imports} } from '@nono/ui'
${sources}<${'/'}script>

<template>
  ${element}
</template>`
})

const renderKey = ref(0)

function reset() {
  Object.assign(state, initialState())
  renderKey.value++
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
      <ExamplePreview :key="renderKey" />
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
