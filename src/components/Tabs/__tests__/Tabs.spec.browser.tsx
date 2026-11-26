import { describe, expect, it, vi } from 'vitest'
import { h, ref } from 'vue'
import { Tabs, tabsSizes, tabsVariantNames, type TabsItem, type TabsProps } from '@nono/ui'
import { attrsTests, invalidValueTests, Part, render, showcase, userEvent } from '@test/vue'

const items: TabsItem[] = [
  { value: 'account', label: 'Account', content: 'Manage your profile.' },
  { value: 'password', label: 'Password', content: 'Choose a new password.' },
  { value: 'billing', label: 'Billing', content: 'Update your card.' },
]

const withIcons: TabsItem[] = [
  { value: 'inbox', label: 'Inbox', icon: 'folder', content: '3 new messages.' },
  { value: 'starred', label: 'Starred', icon: 'star', content: 'Starred mail.' },
  { value: 'more', label: 'More', trailingIcon: 'chevronDown', content: 'Other folders.' },
]

const withDisabled: TabsItem[] = [
  { value: 'overview', label: 'Overview', content: 'Revenue and visitors.' },
  { value: 'reports', label: 'Reports', content: 'Monthly reports.', disabled: true },
  { value: 'analytics', label: 'Analytics', content: 'Where visitors come from.' },
]

const colors = ['primary', 'neutral', 'success', '#db2777']

function mount(props: TabsProps & Record<string, unknown> = {}, slots = {}) {
  return render(() => h(Tabs, { items, ...props }, slots))
}

describe('Tabs', () => {
  showcase({
    stories: {
      Variants: () =>
        tabsVariantNames.map((variant) => (
          <Part name={variant} title>
            <Tabs
              items={items}
              variant={variant}
              defaultValue="password"
              style={{ width: '22rem' }}
            />
          </Part>
        )),
      Sizes: () =>
        tabsSizes.flatMap((size) =>
          tabsVariantNames.map((variant) => (
            <Part name={`${variant}-${size}`} title>
              <Tabs
                items={withIcons}
                variant={variant}
                size={size}
                content={false}
                style={{ width: '28rem' }}
              />
            </Part>
          )),
        ),
      Colors: () =>
        colors.flatMap((color) =>
          tabsVariantNames.map((variant) => (
            <Part name={`${variant}-${color}`} title>
              <Tabs
                items={items}
                variant={variant}
                color={color}
                content={false}
                style={{ width: '22rem' }}
              />
            </Part>
          )),
        ),
      Vertical: () =>
        tabsVariantNames.map((variant) => (
          <Part name={variant} title>
            <Tabs
              items={items}
              variant={variant}
              orientation="vertical"
              defaultValue="password"
              style={{ width: '22rem' }}
            />
          </Part>
        )),
      Disabled: () =>
        tabsVariantNames.map((variant) => (
          <Part name={variant} title>
            <Tabs items={withDisabled} variant={variant} style={{ width: '22rem' }} />
          </Part>
        )),
      Radius: () =>
        ['none', 'md', 'full'].map((radius) => (
          <Part name={radius} title>
            <Tabs items={items} radius={radius} content={false} style={{ width: '22rem' }} />
          </Part>
        )),
    },
  })

  describe('selection', () => {
    it('selects the first enabled tab and shows its panel', async () => {
      const screen = await mount({ items: [{ ...items[0]!, disabled: true }, ...items.slice(1)] })

      await expect
        .element(screen.getByRole('tab', { name: 'Password' }))
        .toHaveAttribute('aria-selected', 'true')
      await expect.element(screen.getByRole('tabpanel')).toHaveTextContent('Choose a new password.')
    })

    it('shows the panel of defaultValue', async () => {
      const screen = await mount({ defaultValue: 'billing' })

      await expect.element(screen.getByRole('tabpanel')).toHaveTextContent('Update your card.')
    })

    it('selects a tab on click and emits the value with its reason', async () => {
      const onUpdate = vi.fn()
      const onValueChange = vi.fn()
      const screen = await mount({
        'onUpdate:modelValue': onUpdate,
        onValueChange,
      })

      await screen.getByRole('tab', { name: 'Billing' }).click()

      await expect.element(screen.getByRole('tabpanel')).toHaveTextContent('Update your card.')
      expect(onUpdate).toHaveBeenCalledWith('billing')
      expect(onValueChange.mock.calls[0]![0]).toBe('billing')
      expect(onValueChange.mock.calls[0]![1].reason).toBe('item-press')
    })

    it('follows modelValue', async () => {
      const value = ref<string | null>('account')
      const screen = await render(() =>
        h(Tabs, {
          items,
          modelValue: value.value,
          'onUpdate:modelValue': (next: string | null) => (value.value = next),
        }),
      )

      value.value = 'password'
      await expect.element(screen.getByRole('tabpanel')).toHaveTextContent('Choose a new password.')

      await screen.getByRole('tab', { name: 'Billing' }).click()
      expect(value.value).toBe('billing')
    })

    it('does not select a disabled tab', async () => {
      const screen = await mount({ items: withDisabled })

      await screen.getByRole('tab', { name: 'Reports' }).click({ force: true })

      await expect.element(screen.getByRole('tabpanel')).toHaveTextContent('Revenue and visitors.')
    })

    it('a valueChange listener can cancel the change', async () => {
      const screen = await mount({
        onValueChange: (_: string | null, details: { cancel: () => void }) => details.cancel(),
      })

      await screen.getByRole('tab', { name: 'Billing' }).click()

      await expect.element(screen.getByRole('tabpanel')).toHaveTextContent('Manage your profile.')
    })
  })

  describe('keyboard', () => {
    it('arrow keys move and select in automatic activation', async () => {
      const screen = await mount()

      await screen.getByRole('tab', { name: 'Account' }).click()
      await userEvent.keyboard('{ArrowRight}')

      await expect.element(screen.getByRole('tab', { name: 'Password' })).toHaveFocus()
      await expect.element(screen.getByRole('tabpanel')).toHaveTextContent('Choose a new password.')
    })

    it('arrow keys only move focus in manual activation, Enter selects', async () => {
      const screen = await mount({ activation: 'manual' })

      await screen.getByRole('tab', { name: 'Account' }).click()
      await userEvent.keyboard('{ArrowRight}')

      await expect.element(screen.getByRole('tab', { name: 'Password' })).toHaveFocus()
      await expect.element(screen.getByRole('tabpanel')).toHaveTextContent('Manage your profile.')

      await userEvent.keyboard('{Enter}')
      await expect.element(screen.getByRole('tabpanel')).toHaveTextContent('Choose a new password.')
    })

    it('vertical tabs move with ArrowDown and report their orientation', async () => {
      const screen = await mount({ orientation: 'vertical' })

      await expect
        .element(screen.getByRole('tablist'))
        .toHaveAttribute('aria-orientation', 'vertical')
      await screen.getByRole('tab', { name: 'Account' }).click()
      await userEvent.keyboard('{ArrowDown}')

      await expect.element(screen.getByRole('tab', { name: 'Password' })).toHaveFocus()
    })

    it('stops at the ends when loop is false', async () => {
      const screen = await mount({ loop: false, defaultValue: 'billing' })

      await screen.getByRole('tab', { name: 'Billing' }).click()
      await userEvent.keyboard('{ArrowRight}')

      await expect.element(screen.getByRole('tab', { name: 'Billing' })).toHaveFocus()
    })
  })

  describe('panels', () => {
    it('renders no panels without content', async () => {
      const screen = await mount({ content: false })

      expect(screen.container.querySelector('[data-ui=tabs-panel]')).toBeNull()
    })

    it('keeps hidden panels mounted with keepMounted', async () => {
      const screen = await mount({ keepMounted: true })

      expect(screen.container.querySelectorAll('[data-ui=tabs-panel]')).toHaveLength(3)
    })

    it('an item slot replaces its panel, and the content slot the rest', async () => {
      const screen = await mount(
        { items: [{ ...items[0]!, slot: 'profile' }, ...items.slice(1)] },
        {
          profile: ({ item }: { item: TabsItem }) => `Profile of ${item.label}`,
          content: ({ item, index }: { item: TabsItem; index: number }) =>
            `${index}: ${item.value}`,
        },
      )

      await expect.element(screen.getByRole('tabpanel')).toHaveTextContent('Profile of Account')
      await screen.getByRole('tab', { name: 'Billing' }).click()
      await expect.element(screen.getByRole('tabpanel')).toHaveTextContent('2: billing')
    })
  })

  describe('tab slots', () => {
    it('label, leading and trailing receive the item state', async () => {
      const screen = await mount(
        {},
        {
          label: ({ item, selected }: { item: TabsItem; selected: boolean }) =>
            `${item.label}${selected ? ' (on)' : ''}`,
          leading: ({ index }: { index: number }) => h('b', `#${index}`),
          trailing: ({ disabled }: { disabled: boolean }) => (disabled ? 'off' : 'ok'),
        },
      )

      await expect.element(screen.getByRole('tab', { name: 'Account (on)' })).toBeInTheDocument()
      const tab = screen.container.querySelector('[data-ui=tabs-tab]')!
      expect(tab.querySelector('[data-ui=tabs-leading]')!.textContent).toBe('#0')
      expect(tab.querySelector('[data-ui=tabs-trailing]')!.textContent).toBe('ok')
    })
  })

  describe('data-ui', () => {
    it('marks every node', async () => {
      const screen = await mount({ items: withIcons })
      const names = [...screen.container.querySelectorAll('[data-ui]')].map(
        (node) => (node as HTMLElement).dataset.ui,
      )

      expect(new Set(names)).toEqual(
        new Set([
          'tabs-root',
          'tabs-list',
          'tabs-tab',
          'tabs-leading',
          'tabs-leading-icon',
          'tabs-label',
          'tabs-trailing',
          'tabs-trailing-icon',
          'tabs-indicator',
          'tabs-panel',
        ]),
      )
    })
  })

  describe('ui', () => {
    it('passes each item state to the item keys', async () => {
      const screen = await mount({
        ui: {
          tab: ({ item, selected }) => ({ 'aria-label': item.value, 'data-on': String(selected) }),
          label: ({ index }) => ({ 'data-index': String(index) }),
          panel: ({ item }) => ({ 'data-panel': item.value }),
        },
      })

      const tab = screen.getByRole('tab', { name: 'account' })
      await expect.element(tab).toHaveAttribute('data-on', 'true')
      await expect
        .element(screen.getByRole('tab', { name: 'password' }))
        .toHaveAttribute('data-on', 'false')
      expect(
        screen.container.querySelectorAll('[data-ui=tabs-label]')[2]!.getAttribute('data-index'),
      ).toBe('2')
      await expect.element(screen.getByRole('tabpanel')).toHaveAttribute('data-panel', 'account')
    })

    it('names the tab list through ui.list', async () => {
      const screen = await mount({ ui: { list: () => ({ 'aria-label': 'Settings' }) } })

      await expect.element(screen.getByRole('tablist', { name: 'Settings' })).toBeInTheDocument()
    })

    it('keeps the attributes ui-sdk owns', async () => {
      const screen = await mount({
        ui: {
          list: () => ({ role: 'list' }),
          tab: () => ({
            role: 'link',
            tabindex: 3,
            'aria-selected': 'false',
            'aria-controls': 'other',
          }),
          panel: () => ({ role: 'region' }),
        },
      })
      const list = screen.container.querySelector('[data-ui=tabs-list]')!
      const tab = screen.container.querySelector('[data-ui=tabs-tab]')!
      const panel = screen.container.querySelector('[data-ui=tabs-panel]')!

      expect({
        list: list.getAttribute('role'),
        tab: tab.getAttribute('role'),
        tabindex: tab.getAttribute('tabindex'),
        selected: tab.getAttribute('aria-selected'),
        controls: tab.getAttribute('aria-controls'),
        panel: panel.getAttribute('role'),
      }).toEqual({
        list: 'tablist',
        tab: 'tab',
        tabindex: '0',
        selected: 'true',
        controls: panel.id,
        panel: 'tabpanel',
      })
    })

    it('links a tab and its panel through custom ids', async () => {
      const screen = await mount({
        ui: {
          tab: ({ item }) => ({ id: `${item.value}-tab` }),
          panel: ({ item }) => ({ id: `${item.value}-panel` }),
        },
      })
      const tab = screen.container.querySelector('[data-ui=tabs-tab]')!
      const panel = screen.container.querySelector('[data-ui=tabs-panel]')!

      expect({
        controls: tab.getAttribute('aria-controls'),
        labelledBy: panel.getAttribute('aria-labelledby'),
      }).toEqual({ controls: 'account-panel', labelledBy: 'account-tab' })
    })

    it('ignores component props in ui', async () => {
      const screen = await mount({
        ui: {
          tab: () => ({ disabled: true, value: 'other' }) as never,
          panel: () => ({ keepMounted: true }) as never,
        },
      })

      await screen.getByRole('tab', { name: 'Billing' }).click()

      await expect.element(screen.getByRole('tabpanel')).toHaveTextContent('Update your card.')
      expect(screen.container.querySelectorAll('[data-ui=tabs-panel]')).toHaveLength(1)
    })
  })

  describe('expose', () => {
    it('selects a tab from outside', async () => {
      const tabs = ref<{ select: (value: string) => boolean }>()
      const screen = await render(() => h(Tabs, { items, ref: tabs }))

      expect(tabs.value!.select('billing')).toBe(true)

      await expect.element(screen.getByRole('tabpanel')).toHaveTextContent('Update your card.')
    })
  })

  describe('attributes', () => {
    attrsTests({
      component: Tabs,
      props: { items },
      root: '[data-ui=tabs-root]',
      class: { value: 'gap-8', expected: { rowGap: '32px' } },
      keeps: ['display', 'rowGap'],
    })
  })

  describe('with an invalid variant', () => {
    invalidValueTests({
      component: Tabs,
      props: { items },
      root: '[data-ui=tabs-root]',
      prop: 'variant',
      values: ['solid', 'PILL', ''],
      fallback: 'pill',
    })
  })

  describe('with an invalid size', () => {
    invalidValueTests({
      component: Tabs,
      props: { items },
      root: '[data-ui=tabs-root]',
      prop: 'size',
      values: ['xxl', 'MD', ''],
      fallback: 'md',
    })
  })

  describe('with an invalid orientation', () => {
    invalidValueTests({
      component: Tabs,
      props: { items },
      root: '[data-ui=tabs-root]',
      prop: 'orientation',
      values: ['diagonal', ''],
      fallback: 'horizontal',
    })
  })
})
