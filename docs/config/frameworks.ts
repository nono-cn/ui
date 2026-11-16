import type { ExampleProps } from '@docs/config/component-docs'

export const frameworks = [
  { id: 'vue', label: 'Vue' },
  { id: 'react', label: 'React' },
  { id: 'svelte', label: 'Svelte' },
  { id: 'solid', label: 'Solid' },
  { id: 'web', label: 'Web Components' },
] as const

export type Framework = (typeof frameworks)[number]['id']

export function importPath(framework: Framework) {
  return `@nono/ui/${framework}`
}

function kebab(value: string) {
  return value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
}

function attributes(props: ExampleProps, format: (name: string, value: unknown) => string) {
  return Object.entries(props)
    .map(([name, value]) => ` ${format(name, value)}`)
    .join('')
}

function jsxAttribute(name: string, value: unknown) {
  return typeof value === 'string' ? `${name}="${value}"` : `${name}={${value}}`
}

const snippets: Record<Framework, (component: string, props: ExampleProps) => string> = {
  vue: (component, props) => `<script setup lang="ts">
import { ${component} } from '${importPath('vue')}'
</script>

<template>
  <${component}${attributes(props, (name, value) =>
    typeof value === 'string' ? `${name}="${value}"` : `:${name}="${value}"`,
  )} />
</template>`,
  react: (component, props) => `import { ${component} } from '${importPath('react')}'

export function Example() {
  return <${component}${attributes(props, jsxAttribute)} />
}`,
  svelte: (component, props) => `<script lang="ts">
  import { ${component} } from '${importPath('svelte')}'
</script>

<${component}${attributes(props, jsxAttribute)} />`,
  solid: (component, props) => `import { ${component} } from '${importPath('solid')}'

export function Example() {
  return <${component}${attributes(props, jsxAttribute)} />
}`,
  web: (component, props) => {
    const tag = `nono${kebab(component)}`
    return `<script type="module">
  import '${importPath('web')}'
</script>

<${tag}${attributes(props, (name, value) => `${kebab(name)}="${value}"`)}></${tag}>`
  },
}

export function snippet(framework: Framework, component: string, props: ExampleProps) {
  return snippets[framework](component, props)
}
