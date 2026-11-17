import { cva } from 'class-variance-authority'
import { chipDefaults } from '@/components/Chip/constants'
import type { ChipPosition, ChipSize } from '@/components/Chip/types'

export const chipVariants = cva('relative inline-flex shrink-0 items-center justify-center')

export const chipIndicatorVariants = cva('rounded-full bg-(--chip-color) ring-2 ring-background', {
  variants: {
    size: {
      '3xs': 'h-1 min-w-1',
      '2xs': 'h-1.25 min-w-1.25',
      xs: 'h-1.5 min-w-1.5',
      sm: 'h-1.75 min-w-1.75',
      md: 'h-2 min-w-2',
      lg: 'h-2.25 min-w-2.25',
      xl: 'h-2.5 min-w-2.5',
      '2xl': 'h-2.75 min-w-2.75',
      '3xl': 'h-3 min-w-3',
    } satisfies Record<ChipSize, string>,
    position: {
      'top-right': 'top-0 right-0',
      'bottom-right': 'right-0 bottom-0',
      'top-left': 'top-0 left-0',
      'bottom-left': 'bottom-0 left-0',
    } satisfies Record<ChipPosition, string>,
    inset: {
      true: '',
      false: '',
    },
    standalone: {
      true: '',
      false: 'absolute',
    },
  },
  compoundVariants: [
    { position: 'top-right', inset: false, class: 'translate-x-1/2 -translate-y-1/2' },
    { position: 'bottom-right', inset: false, class: 'translate-x-1/2 translate-y-1/2' },
    { position: 'top-left', inset: false, class: '-translate-x-1/2 -translate-y-1/2' },
    { position: 'bottom-left', inset: false, class: '-translate-x-1/2 translate-y-1/2' },
  ],
  defaultVariants: {
    size: chipDefaults.size,
    inset: chipDefaults.inset,
    standalone: chipDefaults.standalone,
  },
})
