import { cva } from 'class-variance-authority'
import { inputDefaults } from '@/components/Input/constants'
import type { InputSize, InputVariant } from '@/components/Input/types'

export const inputRootVariants = cva(
  'relative inline-flex w-full min-w-0 items-center data-disabled:opacity-50',
)

export const inputVariants = cva(
  [
    'w-full min-w-0 rounded-(--input-radius) border bg-transparent text-foreground',
    'placeholder:text-muted-foreground transition-[color,background-color,border-color,box-shadow] outline-none',
    'focus-visible:border-(--input-color) focus-visible:ring-[3px] focus-visible:ring-(--input-color)/30',
    'aria-invalid:border-error aria-invalid:focus-visible:ring-error/30',
    'data-disabled:cursor-not-allowed',
  ],
  {
    variants: {
      size: {
        xs: 'h-7 px-2 text-xs',
        sm: 'h-8 px-2.5 text-sm',
        md: 'h-9 px-3 text-base',
        lg: 'h-10 px-3.5 text-lg',
        xl: 'h-11 px-4 text-xl',
      } satisfies Record<InputSize, string>,
      variant: {
        outline: 'border-input shadow-xs',
        soft: 'border-transparent bg-muted/50 interactive:hover:bg-muted focus-visible:bg-muted',
        subtle: 'border-input bg-muted',
        plain: 'border-transparent',
      } satisfies Record<InputVariant, string>,
      highlight: {
        true: 'border-(--input-color)',
        false: '',
      },
      leading: { true: '', false: '' },
      trailing: { none: '', one: '', two: '' },
    },
    compoundVariants: [
      { size: 'xs', leading: true, class: 'ps-7' },
      { size: 'sm', leading: true, class: 'ps-8' },
      { size: 'md', leading: true, class: 'ps-10' },
      { size: 'lg', leading: true, class: 'ps-12' },
      { size: 'xl', leading: true, class: 'ps-13' },
      { size: 'xs', trailing: 'one', class: 'pe-7' },
      { size: 'sm', trailing: 'one', class: 'pe-8' },
      { size: 'md', trailing: 'one', class: 'pe-10' },
      { size: 'lg', trailing: 'one', class: 'pe-12' },
      { size: 'xl', trailing: 'one', class: 'pe-13' },
      { size: 'xs', trailing: 'two', class: 'pe-11' },
      { size: 'sm', trailing: 'two', class: 'pe-14' },
      { size: 'md', trailing: 'two', class: 'pe-17' },
      { size: 'lg', trailing: 'two', class: 'pe-19' },
      { size: 'xl', trailing: 'two', class: 'pe-22' },
    ],
    defaultVariants: {
      size: inputDefaults.size,
      variant: inputDefaults.variant,
      highlight: false,
      leading: false,
      trailing: 'none',
    },
  },
)

export const inputLeadingVariants = cva(
  'absolute inset-y-0 start-0 flex items-center text-muted-foreground',
  {
    variants: {
      size: {
        xs: 'ps-2 [&>svg]:size-3',
        sm: 'ps-2.5 [&>svg]:size-4',
        md: 'ps-3 [&>svg]:size-5',
        lg: 'ps-3.5 [&>svg]:size-6',
        xl: 'ps-4 [&>svg]:size-7',
      } satisfies Record<InputSize, string>,
    },
    defaultVariants: { size: inputDefaults.size },
  },
)

export const inputTrailingVariants = cva(
  'absolute inset-y-0 end-0 flex items-center gap-1.5 text-muted-foreground',
  {
    variants: {
      size: {
        xs: 'pe-2 [&>svg]:size-3',
        sm: 'pe-2.5 [&>svg]:size-4',
        md: 'pe-3 [&>svg]:size-5',
        lg: 'pe-3.5 [&>svg]:size-6',
        xl: 'pe-4 [&>svg]:size-7',
      } satisfies Record<InputSize, string>,
    },
    defaultVariants: { size: inputDefaults.size },
  },
)

export const inputIconVariants = cva('pointer-events-none shrink-0')

export const inputClearVariants = cva(
  [
    'inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm text-muted-foreground',
    'transition-[color,box-shadow] outline-none interactive:hover:text-foreground',
    'focus-visible:ring-[3px] focus-visible:ring-(--input-color)/30',
  ],
  {
    variants: {
      size: {
        xs: 'size-3',
        sm: 'size-4',
        md: 'size-5',
        lg: 'size-6',
        xl: 'size-7',
      } satisfies Record<InputSize, string>,
    },
    defaultVariants: { size: inputDefaults.size },
  },
)
