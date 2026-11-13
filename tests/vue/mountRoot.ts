import { h, type Component, type VNodeChild } from 'vue'
import { render } from 'vitest-browser-vue'

export interface MountRootOptions {
  component: Component
  props?: Record<string, unknown>
  slots?: Record<string, () => VNodeChild>
  root: string
}

export async function mountRoot(
  { component, props = {}, slots, root }: MountRootOptions,
  extra: Record<string, unknown> = {},
) {
  const screen = await render(() => h(component, { ...props, ...extra }, slots))

  return screen.container.querySelector(root)!
}
