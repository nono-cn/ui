import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import { Alert, provideLocale, type LocaleOptions } from '@nono/ui'

function renderAlert(initial?: string, options?: LocaleOptions) {
  const locale = ref(initial)
  const Root = defineComponent(() => {
    if (initial !== undefined) provideLocale(locale, options)
    return () => h(Alert, { label: 'Alert', closable: true })
  })
  const wrapper = mount(Root)

  return {
    locale,
    closeLabel: () => wrapper.get('[data-ui="alert-close-button"]').attributes('aria-label'),
  }
}

describe('provideLocale', () => {
  it('uses English without a provider', () => {
    expect(renderAlert().closeLabel()).toBe('Close')
  })

  it.each([
    ['en', 'Close'],
    ['es', 'Cerrar'],
    ['es-MX', 'Cerrar'],
    ['ES_mx', 'Cerrar'],
    ['pt', 'Fechar'],
    ['pt-AO', 'Fechar'],
    ['ar-EG', 'إغلاق'],
    ['fr', 'Close'],
    ['', 'Close'],
  ])('translates %s', (locale, expected) => {
    expect(renderAlert(locale).closeLabel()).toBe(expected)
  })

  it('reacts to locale changes', async () => {
    const alert = renderAlert('es')
    expect(alert.closeLabel()).toBe('Cerrar')

    alert.locale.value = 'en'
    await nextTick()
    expect(alert.closeLabel()).toBe('Close')
  })

  it('lets messages override the locale', () => {
    expect(renderAlert('es', { messages: { close: 'Descartar' } }).closeLabel()).toBe('Descartar')
  })

  it('lets closeLabel override the translation', () => {
    const Root = defineComponent(() => {
      provideLocale('es')
      return () => h(Alert, { label: 'Alert', closable: true, closeLabel: 'Ocultar' })
    })

    expect(mount(Root).get('[data-ui="alert-close-button"]').attributes('aria-label')).toBe(
      'Ocultar',
    )
  })
})
