import { cva } from 'class-variance-authority'
import { iconDefaults } from '@/components/Icon/constants'
import type { IconSize } from '@/components/Icon/types'

export const iconVariants = cva('shrink-0', {
  variants: {
    size: {
      xs: 'size-3',
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6',
      xl: 'size-7',
    } satisfies Record<IconSize, string>,
    inherit: {
      true: '',
      false: 'text-(--icon-color)',
    },
  },
  defaultVariants: { size: iconDefaults.size, inherit: true },
})
