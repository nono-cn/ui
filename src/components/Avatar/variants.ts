import { cva } from 'class-variance-authority'
import { avatarDefaults } from '@/components/Avatar/constants'
import type { AvatarSize, AvatarVariant } from '@/components/Avatar/types'

export const avatarVariants = cva(
  'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-(--avatar-radius) align-middle select-none',
  {
    variants: {
      size: {
        xs: 'size-6 text-[10px]',
        sm: 'size-8 text-xs',
        md: 'size-10 text-sm',
        lg: 'size-12 text-base',
        xl: 'size-14 text-lg',
        '2xl': 'size-16 text-xl',
      } satisfies Record<AvatarSize, string>,
    },
    defaultVariants: { size: avatarDefaults.size },
  },
)

export const avatarImageVariants = cva('size-full object-cover')

export const avatarFallbackVariants = cva(
  'flex size-full items-center justify-center rounded-(--avatar-radius) border font-medium uppercase',
  {
    variants: {
      variant: {
        solid: 'border-transparent bg-(--avatar-color) text-(--avatar-color-foreground)',
        outline: 'border-(--avatar-color)/40 bg-transparent text-(--avatar-color)',
        soft: 'border-transparent bg-(--avatar-color)/10 text-(--avatar-color)',
        subtle: 'border-(--avatar-color)/20 bg-(--avatar-color)/10 text-(--avatar-color)',
      } satisfies Record<AvatarVariant, string>,
    },
    defaultVariants: { variant: avatarDefaults.variant },
  },
)

export const avatarIconVariants = cva('size-1/2')
