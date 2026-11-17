import { cva } from 'class-variance-authority'
import { alertDefaults } from '@/components/Alert/constants'
import type { AlertVariant } from '@/components/Alert/types'

export const alertVariants = cva(
  'grid w-full items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm',
  {
    variants: {
      variant: {
        solid: 'border-transparent bg-(--alert-color) text-(--alert-color-foreground)',
        outline: 'border-(--alert-color)/40 bg-transparent text-(--alert-color)',
        plain: 'border-transparent bg-transparent text-(--alert-color)',
        subtle: 'border-(--alert-color)/20 bg-(--alert-color)/10 text-(--alert-color)',
        soft: 'border-transparent bg-(--alert-color)/10 text-(--alert-color)',
      } satisfies Record<AlertVariant, string>,
      icon: {
        true: 'grid-cols-[calc(var(--spacing)*4)_1fr_auto] gap-x-3',
        false: 'grid-cols-[0_1fr_auto]',
      },
    },
    defaultVariants: {
      variant: alertDefaults.variant,
      icon: false,
    },
  },
)

export const alertIconVariants = cva(
  'flex size-4 translate-y-0.5 items-center justify-center [&>svg]:size-full',
)

export const alertLabelVariants = cva('col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight')

export const alertDescriptionVariants = cva('col-start-2 text-current/80 [&_p]:leading-relaxed')

export const alertCloseVariants = cva('col-start-3 row-start-1 -my-1.5 ms-2 -me-2 self-start')
