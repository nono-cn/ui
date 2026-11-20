import { cva } from 'class-variance-authority'
import { switchDefaults } from '@/components/Switch/constants'
import type { SwitchSize } from '@/components/Switch/types'

export const switchVariants = cva(
  [
    'inline-flex shrink-0 cursor-pointer items-center rounded-(--switch-radius) bg-input p-0.5',
    'transition-[background-color,box-shadow] outline-none',
    'data-checked:bg-(--switch-color)',
    'focus-visible:ring-[3px] focus-visible:ring-(--switch-color)/30',
    'aria-invalid:ring-[3px] aria-invalid:ring-error/30',
    'data-disabled:cursor-not-allowed data-disabled:opacity-50',
    'data-readonly:cursor-default aria-busy:cursor-wait',
  ],
  {
    variants: {
      size: {
        xs: 'w-6',
        sm: 'w-7',
        md: 'w-8',
        lg: 'w-9',
        xl: 'w-10',
      } satisfies Record<SwitchSize, string>,
    },
    defaultVariants: { size: switchDefaults.size },
  },
)

export const switchThumbVariants = cva(
  [
    'pointer-events-none flex items-center justify-center rounded-(--switch-radius) bg-background shadow-sm',
    'text-muted-foreground transition-[translate,color] data-checked:text-(--switch-color)',
  ],
  {
    variants: {
      size: {
        xs: 'size-2.5 data-checked:translate-x-2.5 rtl:data-checked:-translate-x-2.5',
        sm: 'size-3 data-checked:translate-x-3 rtl:data-checked:-translate-x-3',
        md: 'size-3.5 data-checked:translate-x-3.5 rtl:data-checked:-translate-x-3.5',
        lg: 'size-4 data-checked:translate-x-4 rtl:data-checked:-translate-x-4',
        xl: 'size-4.5 data-checked:translate-x-4.5 rtl:data-checked:-translate-x-4.5',
      } satisfies Record<SwitchSize, string>,
    },
    defaultVariants: { size: switchDefaults.size },
  },
)

export const switchIconVariants = cva('size-[70%] shrink-0', {
  variants: {
    loading: { true: 'animate-spin', false: '' },
  },
  defaultVariants: { loading: false },
})
