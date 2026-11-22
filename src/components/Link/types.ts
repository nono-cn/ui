import type { ButtonProps, ButtonSlots } from '@/components/Button/types'

export type LinkTo = string | Record<string, unknown>

export interface LinkProps extends Omit<
  ButtonProps,
  'type' | 'onClick' | 'pendingAnnouncement' | 'focusableWhenDisabled'
> {
  to?: LinkTo
  href?: string
  external?: boolean
  target?: string
  replace?: boolean
  exact?: boolean
}

export type LinkSlots = Pick<ButtonSlots, 'default' | 'leading' | 'trailing'>
