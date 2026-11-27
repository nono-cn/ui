import { createPreference } from '@ui-sdk/core'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h, nextTick, ref, type VNode } from 'vue'
import { App, Button, ButtonGroup, type AppDefaults, type ButtonProps } from '@nono/ui'

const appDefaults: AppDefaults = {
  button: { variant: 'soft', color: 'error', size: 'lg', radius: 'full', block: true },
}

function rootOf(node: () => VNode) {
  const wrapper = mount({ render: node })
  return wrapper.get('[data-ui="button-root"]')
}

function rendered(props: ButtonProps) {
  const root = rootOf(() => h(Button, { label: 'Save', ...props }))
  return { class: root.classes(), style: root.attributes('style') }
}

function renderedInApp(defaults: AppDefaults | undefined, props: ButtonProps = {}) {
  const root = rootOf(() => h(App, { defaults }, () => h(Button, { label: 'Save', ...props })))
  return { class: root.classes(), style: root.attributes('style') }
}

describe('App', () => {
  it('renders its root with data-ui', () => {
    const wrapper = mount(App, { slots: { default: () => h('p', 'Content') } })
    expect(wrapper.get('[data-ui="app-root"] > p').text()).toBe('Content')
  })

  it('shows its preferences on the root', () => {
    const density = createPreference({
      values: ['comfortable', 'compact'],
      defaultValue: 'compact',
      attribute: 'data-density',
    })
    const wrapper = mount(App, { props: { preferences: [density] } })

    expect(wrapper.get('[data-ui="app-root"]').attributes('data-density')).toBe('compact')
  })

  it('leaves Button defaults alone without defaults', () => {
    expect(renderedInApp(undefined)).toEqual(rendered({}))
  })

  it('gives Button its defaults', () => {
    expect(renderedInApp(appDefaults)).toEqual(rendered(appDefaults.button!))
  })

  it('lets Button props win over its defaults', () => {
    const own: ButtonProps = {
      variant: 'outline',
      color: 'neutral',
      size: 'sm',
      radius: 'none',
      block: false,
    }

    expect(renderedInApp(appDefaults, own)).toEqual(rendered(own))
  })

  it('lets the ButtonGroup size win over its defaults', () => {
    const root = rootOf(() =>
      h(App, { defaults: { button: { size: 'lg' } } }, () =>
        h(ButtonGroup, { size: 'xs' }, () => h(Button, { label: 'Save' })),
      ),
    )
    const inGroup = rootOf(() => h(ButtonGroup, { size: 'xs' }, () => h(Button, { label: 'Save' })))

    expect(root.classes()).toEqual(inGroup.classes())
  })

  it('merges nested defaults over the outer ones', () => {
    const root = rootOf(() =>
      h(App, { defaults: { button: { variant: 'soft', radius: 'full' } } }, () =>
        h(App, { defaults: { button: { radius: 'none', color: undefined } } }, () =>
          h(Button, { label: 'Save' }),
        ),
      ),
    )
    const expected = rendered({ variant: 'soft', radius: 'none' })

    expect({ class: root.classes(), style: root.attributes('style') }).toEqual(expected)
  })

  it('composes its ui with the Button ui', () => {
    const root = rootOf(() =>
      h(
        App,
        {
          defaults: {
            button: { ui: { root: () => ({ class: 'shadow-sm px-8', title: 'App' }) } },
          },
        },
        () =>
          h(Button, {
            label: 'Save',
            ui: { root: () => ({ class: 'italic px-2', title: 'Own' }) },
          }),
      ),
    )

    expect(root.classes()).toEqual(expect.arrayContaining(['shadow-sm', 'italic', 'px-2']))
    expect(root.classes()).not.toContain('px-8')
    expect(root.attributes('title')).toBe('Own')
  })

  it('renders an icon from its defaults', () => {
    const root = rootOf(() =>
      h(App, { defaults: { button: { icon: 'plus' } } }, () => h(Button, { label: 'Add' })),
    )

    expect(root.find('[data-ui="button-icon"]').exists()).toBe(true)
  })

  it('reacts to defaults changes', async () => {
    const defaults = ref<AppDefaults>({ button: { radius: 'full' } })
    const wrapper = mount({
      render: () => h(App, { defaults: defaults.value }, () => h(Button, { label: 'Save' })),
    })

    defaults.value = { button: { radius: 'none' } }
    await nextTick()

    expect(wrapper.get('[data-ui="button-root"]').attributes('style')).toBe(
      rendered({ radius: 'none' }).style,
    )
  })
})
