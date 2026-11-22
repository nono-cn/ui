import { cva } from 'class-variance-authority'
import { iconTileDefaults } from '@/components/IconTile/constants'
import type { IconTileSize, IconTileVariant } from '@/components/IconTile/types'

export const iconTileVariants = cva(
  'relative isolate inline-flex shrink-0 items-center justify-center rounded-(--icon-tile-radius) border align-middle select-none',
  {
    variants: {
      size: {
        xs: 'size-6 [--icon-tile-inset:calc(var(--spacing)*0.5)]',
        sm: 'size-8 [--icon-tile-inset:calc(var(--spacing)*0.5)]',
        md: 'size-10 [--icon-tile-inset:calc(var(--spacing)*0.75)]',
        lg: 'size-12 [--icon-tile-inset:calc(var(--spacing)*1)]',
        xl: 'size-14 [--icon-tile-inset:calc(var(--spacing)*1)]',
      } satisfies Record<IconTileSize, string>,
      variant: {
        solid: 'border-transparent bg-(--icon-tile-color) text-(--icon-tile-color-foreground)',
        outline: 'border-(--icon-tile-color)/40 bg-transparent text-(--icon-tile-color)',
        soft: 'border-transparent bg-(--icon-tile-color)/10 text-(--icon-tile-color)',
        subtle: 'border-(--icon-tile-color)/20 bg-(--icon-tile-color)/10 text-(--icon-tile-color)',
        frame:
          'border-border bg-muted/50 text-(--icon-tile-color) after:absolute after:inset-(--icon-tile-inset) after:-z-10 after:rounded-[max(0px,calc(var(--icon-tile-radius)-var(--icon-tile-inset)))] after:border after:border-border after:bg-card after:shadow-xs',
        elevated:
          'border-2 border-background bg-muted text-(--icon-tile-color) shadow-[0_1px_3px_0_rgb(0_0_0/0.14)] dark:border',
      } satisfies Record<IconTileVariant, string>,
    },
    defaultVariants: {
      size: iconTileDefaults.size,
      variant: iconTileDefaults.variant,
    },
  },
)

export const iconTileIconVariants = cva('', {
  variants: {
    size: {
      xs: 'size-3.5',
      sm: 'size-4',
      md: 'size-4.5',
      lg: 'size-5.5',
      xl: 'size-7',
    } satisfies Record<IconTileSize, string>,
  },
  defaultVariants: { size: iconTileDefaults.size },
})
