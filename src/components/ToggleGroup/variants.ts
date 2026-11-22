import { cva } from 'class-variance-authority'
import { toggleGroupDefaults } from '@/components/ToggleGroup/constants'
import type { ToggleGroupOrientation } from '@/components/ToggleGroup/types'

export const toggleGroupVariants = cva('relative', {
  variants: {
    orientation: {
      horizontal: 'inline-flex items-center',
      vertical: 'flex flex-col',
    } satisfies Record<ToggleGroupOrientation, string>,
    attached: {
      true: '*:focus-visible:z-1',
      false: 'gap-1',
    },
  },
  compoundVariants: [
    {
      orientation: 'horizontal',
      attached: true,
      class: ['*:not-first:-ms-px', '*:not-first:rounded-s-none *:not-last:rounded-e-none'],
    },
    {
      orientation: 'vertical',
      attached: true,
      class: ['*:not-first:-mt-px', '*:not-first:rounded-t-none *:not-last:rounded-b-none'],
    },
  ],
  defaultVariants: {
    orientation: toggleGroupDefaults.orientation,
    attached: toggleGroupDefaults.attached,
  },
})
