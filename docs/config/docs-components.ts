import type { ComponentDocConfig } from '@docs/config/component-docs'
import alert from '@docs/config/components/alert'
import avatar from '@docs/config/components/avatar'
import badge from '@docs/config/components/badge'
import button from '@docs/config/components/button'
import checkbox from '@docs/config/components/checkbox'
import chip from '@docs/config/components/chip'
import formField from '@docs/config/components/form-field'
import hoverCard from '@docs/config/components/hover-card'
import icon from '@docs/config/components/icon'
import input from '@docs/config/components/input'
import kbd from '@docs/config/components/kbd'
import label from '@docs/config/components/label'
import rating from '@docs/config/components/rating'
import separator from '@docs/config/components/separator'
import switchDocs from '@docs/config/components/switch'
import textarea from '@docs/config/components/textarea'
import time from '@docs/config/components/time'
import toggle from '@docs/config/components/toggle'

export const docsComponents: ComponentDocConfig[] = [
  alert,
  avatar,
  badge,
  button,
  checkbox,
  chip,
  formField,
  hoverCard,
  icon,
  input,
  kbd,
  label,
  rating,
  separator,
  switchDocs,
  textarea,
  time,
  toggle,
].sort((a, b) => a.title.localeCompare(b.title))

export const docsComponentsBySlug = Object.fromEntries(
  docsComponents.map((component) => [component.slug, component]),
)
