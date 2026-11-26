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
        xs: 'h-7 gap-1 text-xs',
        sm: 'h-8 gap-1.5 text-sm',
        md: 'h-9 text-base',
        lg: 'h-10 text-lg',
        xl: 'h-11 text-xl',
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
      square: {
        true: 'p-0',
        false: '',
      },
    },
    compoundVariants: [
      ...(
        [
          ['xs', 'px-2.5 has-[>[data-ui$=-leading],>[data-ui$=-trailing]]:px-2', 'w-7'],
          ['sm', 'px-3 has-[>[data-ui$=-leading],>[data-ui$=-trailing]]:px-2.5', 'w-8'],
          ['md', 'px-4 py-2 has-[>[data-ui$=-leading],>[data-ui$=-trailing]]:px-3', 'w-9'],
          ['lg', 'px-6 has-[>[data-ui$=-leading],>[data-ui$=-trailing]]:px-4', 'w-10'],
          ['xl', 'px-7 has-[>[data-ui$=-leading],>[data-ui$=-trailing]]:px-5', 'w-11'],
        ] satisfies [ButtonSize, string, string][]
      ).flatMap(([size, padding, width]) => [
        { size, square: false, class: padding },
        { size, square: true, class: width },
      ]),
    ],
    defaultVariants: {
      size: buttonDefaults.size,
      variant: buttonDefaults.variant,
      block: false,
      square: false,
    },
  },
)

const slotSizes = {
  xs: 'size-3',
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
  xl: 'size-7',
} satisfies Record<ButtonSize, string>

export const buttonLeadingVariants = cva('inline-flex shrink-0 items-center justify-center', {
  variants: { size: slotSizes },
  defaultVariants: { size: buttonDefaults.size },
})

export const buttonTrailingVariants = cva('inline-flex shrink-0 items-center justify-center', {
  variants: { size: slotSizes },
  defaultVariants: { size: buttonDefaults.size },
})

export const buttonLabelVariants = cva('truncate')

export const buttonIconVariants = cva('size-full')
