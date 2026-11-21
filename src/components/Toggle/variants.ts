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
        xs: 'h-7 gap-1 px-2.5 text-xs has-[>[data-ui=toggle-leading],>[data-ui=toggle-trailing]]:px-2',
        sm: 'h-8 gap-1.5 px-3 text-sm has-[>[data-ui=toggle-leading],>[data-ui=toggle-trailing]]:px-2.5',
        md: 'h-9 px-4 py-2 text-base has-[>[data-ui=toggle-leading],>[data-ui=toggle-trailing]]:px-3',
        lg: 'h-10 px-6 text-lg has-[>[data-ui=toggle-leading],>[data-ui=toggle-trailing]]:px-4',
        xl: 'h-11 px-7 text-xl has-[>[data-ui=toggle-leading],>[data-ui=toggle-trailing]]:px-5',
        'icon-xs': 'size-7 p-0',
        'icon-sm': 'size-8 p-0',
        icon: 'size-9 p-0',
        'icon-lg': 'size-10 p-0',
        'icon-xl': 'size-11 p-0',
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
    },
    defaultVariants: {
      size: toggleDefaults.size,
      variant: toggleDefaults.variant,
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
      'icon-xs': 'size-3',
      'icon-sm': 'size-4',
      icon: 'size-5',
      'icon-lg': 'size-6',
      'icon-xl': 'size-7',
    } satisfies Record<ToggleSize, string>,
  },
  defaultVariants: { size: toggleDefaults.size },
})

export const toggleIconVariants = cva('size-full')
