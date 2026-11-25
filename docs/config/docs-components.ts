import type { ComponentDocConfig } from '@docs/config/component-docs'
import alert from '@docs/config/components/alert'
import avatar from '@docs/config/components/avatar'
import badge from '@docs/config/components/badge'
import button from '@docs/config/components/button'
import buttonGroup from '@docs/config/components/button-group'
import checkbox from '@docs/config/components/checkbox'
import chip from '@docs/config/components/chip'
import empty from '@docs/config/components/empty'
import formField from '@docs/config/components/form-field'
import hoverCard from '@docs/config/components/hover-card'
import icon from '@docs/config/components/icon'
import iconTile from '@docs/config/components/icon-tile'
import input from '@docs/config/components/input'
import kbd from '@docs/config/components/kbd'
import label from '@docs/config/components/label'
import link from '@docs/config/components/link'
import password from '@docs/config/components/password'
import popover from '@docs/config/components/popover'
import progress from '@docs/config/components/progress'
import rating from '@docs/config/components/rating'
import separator from '@docs/config/components/separator'
import switchDocs from '@docs/config/components/switch'
import textarea from '@docs/config/components/textarea'
import time from '@docs/config/components/time'
import toggle from '@docs/config/components/toggle'
import toggleGroup from '@docs/config/components/toggle-group'
import tooltip from '@docs/config/components/tooltip'

export const docsComponents: ComponentDocConfig[] = [
  alert,
  avatar,
  badge,
  button,
  buttonGroup,
  checkbox,
  chip,
  empty,
  formField,
  hoverCard,
  icon,
  iconTile,
  input,
  kbd,
  label,
  link,
  password,
  popover,
  progress,
  rating,
  separator,
  switchDocs,
  textarea,
  time,
  toggle,
  toggleGroup,
  tooltip,
].sort((a, b) => a.title.localeCompare(b.title))

export const docsComponentsBySlug = Object.fromEntries(
  docsComponents.map((component) => [component.slug, component]),
)
