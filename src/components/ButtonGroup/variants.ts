import { cva } from 'class-variance-authority'
import { buttonGroupDefaults } from '@/components/ButtonGroup/constants'
import type { ButtonGroupOrientation } from '@/components/ButtonGroup/types'

export const buttonGroupVariants = cva('relative *:focus-visible:z-1', {
  variants: {
    orientation: {
      horizontal: [
        'inline-flex -space-x-px',
        '*:not-first:rounded-s-none *:not-last:rounded-e-none',
      ],
      vertical: [
        'flex flex-col -space-y-px',
        '*:not-first:rounded-t-none *:not-last:rounded-b-none',
      ],
    } satisfies Record<ButtonGroupOrientation, string[]>,
  },
  defaultVariants: { orientation: buttonGroupDefaults.orientation },
})
