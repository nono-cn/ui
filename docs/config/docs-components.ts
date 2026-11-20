import type { ComponentDocConfig } from '@docs/config/component-docs'
import alert from '@docs/config/components/alert'
import avatar from '@docs/config/components/avatar'
import badge from '@docs/config/components/badge'
import button from '@docs/config/components/button'
import checkbox from '@docs/config/components/checkbox'
import chip from '@docs/config/components/chip'
import formField from '@docs/config/components/form-field'
import icon from '@docs/config/components/icon'
import input from '@docs/config/components/input'
import kbd from '@docs/config/components/kbd'
import label from '@docs/config/components/label'
import separator from '@docs/config/components/separator'
import switchDocs from '@docs/config/components/switch'
import textarea from '@docs/config/components/textarea'

export const docsComponents: ComponentDocConfig[] = [
  alert,
  avatar,
  badge,
  button,
  checkbox,
  chip,
  formField,
  icon,
  input,
  kbd,
  label,
  separator,
  switchDocs,
  textarea,
].sort((a, b) => a.title.localeCompare(b.title))

export const docsComponentsBySlug = Object.fromEntries(
  docsComponents.map((component) => [component.slug, component]),
)
