import { cva } from 'class-variance-authority'

export const linkVariants = cva([
  'inline-flex items-center gap-1 rounded-xs font-medium text-(--button-color) underline-offset-4',
  'transition-[color,box-shadow] outline-none',
  'interactive:hover:underline focus-visible:underline focus-visible:ring-[3px] focus-visible:ring-(--button-color)/30',
  'data-disabled:cursor-not-allowed data-disabled:opacity-50',
])

export const linkIconSlotClass = 'size-[1em]'
