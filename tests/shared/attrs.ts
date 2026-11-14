import { expect, it } from 'vitest'
import { measure, type StyleProperty } from '@test/shared/styles'

export interface AttrsSuiteOptions {
  mountRoot: (attrs?: Record<string, unknown>) => Promise<Element>
  class: { value: string; expected: Partial<Record<StyleProperty, string>> }
  keeps?: StyleProperty[]
}

export function attrsSuite({ mountRoot, class: customClass, keeps = [] }: AttrsSuiteOptions) {
  it('receives the attributes', async () => {
    const element = await mountRoot({ id: 'custom-id', 'data-custom': 'value' })

    expect({
      id: element.getAttribute('id'),
      data: element.getAttribute('data-custom'),
    }).toEqual({ id: 'custom-id', data: 'value' })
  })

  it('a custom class wins over the component classes', async () => {
    const element = await mountRoot({ class: customClass.value })
    const properties = Object.keys(customClass.expected) as StyleProperty[]

    expect(measure(element, properties)).toEqual(customClass.expected)
  })

  it('a custom style is applied without losing the component style', async () => {
    const element = await mountRoot({ style: { opacity: '0.5' } })
    const withoutStyle = await mountRoot()

    expect(measure(element, ['opacity', ...keeps])).toEqual({
      ...measure(withoutStyle, keeps),
      opacity: '0.5',
    })
  })
}
