import { getColorVariables, oneOf } from '@/core/composables'
import { iconDefaults, iconSizes } from '@/core/components/icon/constants'
import type { IconContext, IconProps } from '@/core/components/icon/types'
import { iconVariants } from '@/core/components/icon/variants'
import { icons } from '@/core/icons'

export { iconDefaults, iconSizes } from '@/core/components/icon/constants'
export type { IconContext, IconProps, IconSize } from '@/core/components/icon/types'
export { iconVariants } from '@/core/components/icon/variants'

function resolveStroke(stroke: unknown): number {
  const value = Number(stroke)
  return Number.isFinite(value) && value > 0 ? value : iconDefaults.stroke
}

export function getIconAttrs(props: IconProps, { labelled }: IconContext) {
  const color = props.color?.trim() || iconDefaults.color
  const inherit = color === 'currentColor'

  return {
    node: icons[props.name] ?? [],
    attrs: {
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': resolveStroke(props.stroke),
      'stroke-linecap': 'round' as const,
      'stroke-linejoin': 'round' as const,
      ...(labelled ? {} : { 'aria-hidden': 'true' as const }),
      'data-slot': 'icon',
      class: iconVariants({ size: oneOf(props.size, iconSizes, iconDefaults.size), inherit }),
      style: inherit ? {} : getColorVariables(color, 'icon', 'primary'),
    },
  }
}
