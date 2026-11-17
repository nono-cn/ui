import type { Component } from 'vue'

export interface ApiTableRow {
  name: string
  type: string
  typeLink?: string
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

export interface ComponentApiConfig {
  props: ApiTableRow[]
  emits: ApiTableRow[]
  slots: ApiTableRow[]
  configs?: ApiTableConfig[]
  expose: ApiTableRow[]
}

export type ExampleState = Record<string, string>

export type ExampleProps = Record<string, string | number | boolean>

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
}

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
  usage: ComponentExampleConfig[]
  examples: ComponentExampleConfig[]
  accessibility: ComponentAccessibilityConfig[]
  api: ComponentApiConfig
}
