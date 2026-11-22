import { cva } from 'class-variance-authority'
import { toggleDefaults } from '@/components/Toggle/constants'
import type { ToggleSize, ToggleVariant } from '@/components/Toggle/types'

export const toggleVariants = cva(
  [
    'inline-flex shrink-0 cursor-pointer gap-2 items-center justify-center rounded-(--toggle-radius) border border-transparent font-medium whitespace-nowrap select-none',
    'transition-[color,background-color,border-color,box-shadow,opacity] outline-none',
    'focus-visible:border-(--toggle-color) focus-visible:ring-[3px] focus-visible:ring-(--toggle-color)/30',
    'data-disabled:cursor-not-allowed data-disabled:opacity-50',
  ],
  {
    variants: {
      size: {
        xs: 'h-7 gap-1 text-xs',
        sm: 'h-8 gap-1.5 text-sm',
        md: 'h-9 text-base',
        lg: 'h-10 text-lg',
        xl: 'h-11 text-xl',
      } satisfies Record<ToggleSize, string>,
      variant: {
        outline: [
          'border-(--toggle-color)/40 bg-transparent text-(--toggle-color) interactive:hover:bg-(--toggle-color)/10',
          'data-pressed:border-(--toggle-color)/60 data-pressed:bg-(--toggle-color)/20 data-pressed:interactive:hover:bg-(--toggle-color)/25',
        ],
        plain: [
          'bg-transparent text-(--toggle-color) interactive:hover:bg-(--toggle-color)/10',
          'data-pressed:bg-(--toggle-color)/20 data-pressed:interactive:hover:bg-(--toggle-color)/25',
        ],
        solid: [
          'bg-(--toggle-color)/10 text-(--toggle-color) interactive:hover:bg-(--toggle-color)/20',
          'data-pressed:bg-(--toggle-color) data-pressed:text-(--toggle-color-foreground) data-pressed:interactive:hover:bg-(--toggle-color)/90',
        ],
      } satisfies Record<ToggleVariant, string[]>,
      square: {
        true: 'p-0',
        false: '',
      },
    },
    compoundVariants: [
      ...(
        [
          ['xs', 'px-2.5 has-[>[data-ui=toggle-leading],>[data-ui=toggle-trailing]]:px-2', 'w-7'],
          ['sm', 'px-3 has-[>[data-ui=toggle-leading],>[data-ui=toggle-trailing]]:px-2.5', 'w-8'],
          [
            'md',
            'px-4 py-2 has-[>[data-ui=toggle-leading],>[data-ui=toggle-trailing]]:px-3',
            'w-9',
          ],
          ['lg', 'px-6 has-[>[data-ui=toggle-leading],>[data-ui=toggle-trailing]]:px-4', 'w-10'],
          ['xl', 'px-7 has-[>[data-ui=toggle-leading],>[data-ui=toggle-trailing]]:px-5', 'w-11'],
        ] satisfies [ToggleSize, string, string][]
      ).flatMap(([size, padding, width]) => [
        { size, square: false, class: padding },
        { size, square: true, class: width },
      ]),
    ],
    defaultVariants: {
      size: toggleDefaults.size,
      variant: toggleDefaults.variant,
      square: false,
    },
  },
)

export const toggleSlotVariants = cva('inline-flex shrink-0 items-center justify-center', {
  variants: {
    size: {
      xs: 'size-3',
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6',
      xl: 'size-7',
    } satisfies Record<ToggleSize, string>,
  },
  defaultVariants: { size: toggleDefaults.size },
})

export const toggleIconVariants = cva('size-full')
