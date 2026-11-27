import type { Component } from 'vue'

export interface ApiTableRow {
  name: string
  type: string
  typeLink?: string
  typePre?: boolean
  default?: string
  description: string
  required?: boolean
}

export interface ApiTableConfig {
  id: string
  title: string
  rows: ApiTableRow[]
  description?: string
  showDefault?: boolean
}

export interface UiTableRow {
  node: string
  tag: string
  state?: string
  stateLink?: string
  kept?: string
}

export interface ComponentApiConfig {
  props: ApiTableRow[]
  emits: ApiTableRow[]
  slots: ApiTableRow[]
  ui?: UiTableRow[]
  configs?: ApiTableConfig[]
  expose: ApiTableRow[]
}

export type ExampleState = Record<string, string>

const exampleSource = Symbol('example-source')

export interface ExampleSource {
  [exampleSource]: string
  value: unknown
}

export function withSource(source: string, value: unknown): ExampleSource {
  return { [exampleSource]: source, value }
}

export function sourceOf(value: unknown): string | undefined {
  return typeof value === 'object' && value !== null && exampleSource in value
    ? (value as ExampleSource)[exampleSource]
    : undefined
}

export function runtimeValue(value: unknown): unknown {
  if (sourceOf(value) !== undefined) return (value as ExampleSource).value
  if (Array.isArray(value)) return value.map(runtimeValue)
  if (typeof value === 'object' && value !== null) {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, runtimeValue(item)]))
  }
  return value
}

export type ExampleValue =
  | string
  | number
  | boolean
  | ExampleValue[]
  | (() => ExampleValue)
  | ExampleSource
  | { [key: string]: ExampleValue }

export type ExampleProps = Record<string, ExampleValue>

export interface ExampleControl {
  key: string
  label: string
  type: 'select' | 'color'
  options?: readonly string[]
  default: string
  visible?: (state: ExampleState) => boolean
}

export interface ExampleHandler {
  event: string
  name: string
  source: string
  handler: (...args: never[]) => unknown
}

export interface ComponentExampleConfig {
  title: string
  description: string
  controls?: ExampleControl[]
  props: (state: ExampleState) => ExampleProps
  handlers?: ExampleHandler[]
  slot?: ExampleSlotContent | ExampleSlotContent[]
}

interface ExampleSlotTarget {
  slot?: string
}

export interface ExampleComponentSlot extends ExampleSlotTarget {
  name: string
  component: Component | string
  props: ExampleProps
}

export interface ExampleTextSlot extends ExampleSlotTarget {
  text: string
}

export type ExampleSlotContent = ExampleComponentSlot | ExampleTextSlot

export interface ComponentAccessibilityConfig {
  title: string
  description: string
  table?: { columns: string[]; rows: string[][] }
}

export interface ComponentDocConfig {
  slug: string
  title: string
  description: string
  component: Component
  slot?: ExampleSlotContent | ExampleSlotContent[]
  usage: ComponentExampleConfig[]
  examples: ComponentExampleConfig[]
  accessibility: ComponentAccessibilityConfig[]
  api: ComponentApiConfig
}
