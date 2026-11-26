import { describe, expect, it } from 'vitest'
import { propsOf, useUi, type UiAttributes } from '@/composables/useUi'

const untyped = (value: Record<string, unknown>) => value as unknown as UiAttributes

describe('useUi', () => {
  it('later layers win over earlier ones', () => {
    const result = useUi({
      base: [{ id: 'a', title: 'x' }, { id: 'b' }],
      ui: { id: 'c' },
    })

    expect(result).toMatchObject({ id: 'c', title: 'x' })
  })

  it('merges classes with tailwind-merge', () => {
    const result = useUi({ base: { class: 'p-2 text-sm' }, ui: { class: 'p-4' } })

    expect(result.class).toBe('text-sm p-4')
  })

  it('keeps the style of every layer in order', () => {
    const result = useUi({
      base: [{ style: { color: 'red' } }, { style: { opacity: '0.5' } }],
      ui: { style: { color: 'blue' } },
    })

    expect(result.style).toEqual([{ color: 'red' }, { opacity: '0.5' }, { color: 'blue' }])
  })

  it('always drops on*, data-ui and data-slot from ui', () => {
    const result = useUi({
      base: {},
      ui: untyped({
        onClick: () => {},
        onclick: 'alert(1)',
        'on-click': () => {},
        'data-ui': 'other',
        'data-slot': 'other',
        'data-test': 'kept',
      }),
    })

    expect(Object.keys(result).sort()).toEqual(['class', 'data-test', 'style'])
  })

  it('drops the excluded keys in camel or kebab case', () => {
    const camel = useUi({
      base: {},
      ui: untyped({ focusableWhenDisabled: true, title: 'kept' }),
      exclude: ['focusableWhenDisabled'],
    })
    const kebab = useUi({
      base: {},
      ui: untyped({ 'focusable-when-disabled': true, title: 'kept' }),
      exclude: ['focusableWhenDisabled'],
    })

    expect(camel).not.toHaveProperty('focusableWhenDisabled')
    expect(kebab).not.toHaveProperty('focusable-when-disabled')
    expect(camel.title).toBe('kept')
    expect(kebab.title).toBe('kept')
  })

  it('does not filter the base layers', () => {
    const onClick = () => {}
    const result = useUi({
      base: [{ 'data-ui': 'button-root' }, { onClick, disabled: true }],
      exclude: ['disabled'],
    })

    expect(result).toMatchObject({ 'data-ui': 'button-root', onClick, disabled: true })
  })

  it('returns the base without ui', () => {
    const result = useUi({ base: { id: 'a', class: 'p-2', style: { color: 'red' } } })

    expect(result).toEqual({ id: 'a', class: 'p-2', style: [{ color: 'red' }, undefined] })
  })
})

describe('propsOf', () => {
  it('returns the names of props declared as an object', () => {
    expect(propsOf({ props: { a: { type: String }, b: { type: Number } } })).toEqual(['a', 'b'])
  })

  it('returns the names of props declared as an array', () => {
    expect(propsOf({ props: ['a', 'b'] })).toEqual(['a', 'b'])
  })

  it('returns an empty list for a component without props', () => {
    expect(propsOf({})).toEqual([])
  })
})
