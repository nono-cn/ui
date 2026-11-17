import { cva } from 'class-variance-authority'
import { buttonDefaults } from '@/components/Button/constants'
import type { ButtonSize, ButtonVariant } from '@/components/Button/types'

export const buttonVariants = cva(
  [
    'inline-flex shrink-0 cursor-pointer gap-2 items-center justify-center rounded-(--button-radius) border border-transparent font-medium whitespace-nowrap select-none',
    'transition-[color,background-color,border-color,box-shadow,opacity] outline-none',
    'focus-visible:border-(--button-color) focus-visible:ring-[3px] focus-visible:ring-(--button-color)/30',
    'data-disabled:cursor-not-allowed data-disabled:opacity-50 data-pending:cursor-wait data-pending:opacity-50',
  ],
  {
    variants: {
      size: {
        xs: 'h-7 gap-1 px-2.5 text-xs has-[>[data-slot=leading],>[data-slot=trailing]]:px-2',
        sm: 'h-8 gap-1.5 px-3 text-sm has-[>[data-slot=leading],>[data-slot=trailing]]:px-2.5',
        md: 'h-9 px-4 py-2 text-base has-[>[data-slot=leading],>[data-slot=trailing]]:px-3',
        lg: 'h-10 px-6 text-lg has-[>[data-slot=leading],>[data-slot=trailing]]:px-4',
        xl: 'h-11 px-7 text-xl has-[>[data-slot=leading],>[data-slot=trailing]]:px-5',
        'icon-xs': 'size-7 p-0',
        'icon-sm': 'size-8 p-0',
        icon: 'size-9 p-0',
        'icon-lg': 'size-10 p-0',
        'icon-xl': 'size-11 p-0',
      } satisfies Record<ButtonSize, string>,
      variant: {
        solid: [
          'bg-(--button-color) text-(--button-color-foreground)',
          'interactive:hover:bg-(--button-color)/90 interactive:active:bg-(--button-color)/80',
        ],
        outline: [
          'border-(--button-color)/40 bg-transparent text-(--button-color)',
          'interactive:hover:bg-(--button-color)/10 interactive:active:border-(--button-color)/60 interactive:active:bg-(--button-color)/20',
        ],
        plain: [
          'bg-transparent text-(--button-color)',
          'interactive:hover:bg-(--button-color)/10 interactive:active:bg-(--button-color)/20',
        ],
        subtle: [
          'border-(--button-color)/20 bg-(--button-color)/10 text-(--button-color)',
          'interactive:hover:bg-(--button-color)/15 interactive:active:bg-(--button-color)/25',
        ],
        soft: [
          'bg-(--button-color)/10 text-(--button-color)',
          'interactive:hover:bg-(--button-color)/20 interactive:active:bg-(--button-color)/30',
        ],
        link: [
          'bg-transparent text-(--button-color) underline underline-offset-4',
          'interactive:hover:no-underline',
        ],
      } satisfies Record<ButtonVariant, string[]>,
      block: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      size: buttonDefaults.size,
      variant: buttonDefaults.variant,
      block: false,
    },
  },
)

const slotSizes = {
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
} satisfies Record<ButtonSize, string>

export const buttonLeadingVariants = cva('inline-flex shrink-0 items-center justify-center', {
  variants: { size: slotSizes },
  defaultVariants: { size: buttonDefaults.size },
})

export const buttonTrailingVariants = cva('inline-flex shrink-0 items-center justify-center', {
  variants: { size: slotSizes },
  defaultVariants: { size: buttonDefaults.size },
})

export const buttonIconVariants = cva('size-full')
