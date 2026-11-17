import { cva } from 'class-variance-authority'
import { kbdDefaults } from '@/components/Kbd/constants'
import type { KbdSize, KbdVariant } from '@/components/Kbd/types'

export const kbdVariants = cva(
  'inline-flex w-fit items-center justify-center gap-1 rounded-(--kbd-radius) border font-sans font-medium uppercase',
  {
    variants: {
      size: {
        sm: 'h-4 min-w-4 px-1 text-[10px]',
        md: 'h-5 min-w-5 px-1 text-[11px]',
        lg: 'h-6 min-w-6 px-1 text-xs',
      } satisfies Record<KbdSize, string>,
      variant: {
        solid: 'border-transparent bg-(--kbd-color) text-(--kbd-color-foreground)',
        outline: 'border-(--kbd-color)/40 bg-transparent text-(--kbd-color)',
        soft: 'border-transparent bg-(--kbd-color)/10 text-(--kbd-color)',
        subtle: 'border-(--kbd-color)/20 bg-(--kbd-color)/10 text-(--kbd-color)',
      } satisfies Record<KbdVariant, string>,
    },
    defaultVariants: {
      size: kbdDefaults.size,
      variant: kbdDefaults.variant,
    },
  },
)

export const kbdGroupVariants = cva('inline-flex items-center gap-1')
