import { contrastRatio, parseColor } from '@ui-sdk/core/color'

export type CssVariables = Record<`--${string}`, string>

export function getContrastColor(color: string, light = '#ffffff', dark = '#09090b'): string {
  const background = parseColor(color.trim())
  const lightColor = parseColor(light)
  const darkColor = parseColor(dark)
  /* var() and currentColor are only known in the browser, so CSS picks; 0.564 is the OKLab L where WCAG contrast flips. */
  if (!background || !lightColor || !darkColor) {
    return `oklch(from ${color.trim()} clamp(0, (0.564 - l) * 1000, 1) 0 0)`
  }

  return contrastRatio(background, lightColor) >= contrastRatio(background, darkColor)
    ? light
    : dark
}

const paletteToken = /^[a-z][\w-]*$/i

export function getColorVariables(
  color: string | undefined,
  prefix: string,
  defaultColor: string,
): CssVariables {
  const value = color?.trim() || defaultColor

  if (paletteToken.test(value)) {
    return {
      [`--${prefix}-color`]: `var(--${value}, var(--${defaultColor}))`,
      [`--${prefix}-color-foreground`]: `var(--${value}-foreground, var(--${defaultColor}-foreground))`,
    }
  }

  return {
    [`--${prefix}-color`]: value,
    [`--${prefix}-color-foreground`]: getContrastColor(value),
  }
}

export type Radius = string | number

export function resolveRadius(value: Radius): string {
  const text = String(value).trim()

  if (typeof value === 'number' || /^-?(?:\d+\.?\d*|\.\d+)$/.test(text)) return `${text}px`
  if (text === 'none') return '0'
  if (text === 'full') return '9999px'
  if (/^(?:inherit|initial|unset|revert|revert-layer)$/i.test(text)) return text
  if (/^(?:[a-z][\w-]*|\d+xl)$/i.test(text)) return `var(--radius-${text})`

  return text
}

export function getRadiusVariables(
  radius: Radius | undefined,
  prefix: string,
  defaultRadius: Radius,
): CssVariables {
  const value = radius === undefined || radius === '' ? defaultRadius : radius
  return { [`--${prefix}-radius`]: resolveRadius(value) }
}

export function oneOf<T extends string>(
  value: unknown,
  options: readonly T[],
  fallback: NoInfer<T>,
): T {
  return options.includes(value as T) ? (value as T) : fallback
}
