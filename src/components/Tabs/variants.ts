import { cva } from 'class-variance-authority'
import { tabsDefaults } from '@/components/Tabs/constants'
import type { TabsOrientation, TabsSize, TabsVariant } from '@/components/Tabs/types'

export const tabsVariants = cva('flex', {
  variants: {
    orientation: {
      horizontal: 'flex-col gap-2',
      vertical: 'items-start gap-4',
    } satisfies Record<TabsOrientation, string>,
  },
  defaultVariants: { orientation: tabsDefaults.orientation },
})

export const tabsListVariants = cva('relative flex shrink-0', {
  variants: {
    variant: {
      pill: 'rounded-[min(calc(var(--tabs-radius)*9999),calc(var(--tabs-radius)+var(--spacing)))] bg-muted p-1',
      link: 'border-border',
    } satisfies Record<TabsVariant, string>,
    orientation: {
      horizontal: 'w-full items-center',
      vertical: 'flex-col',
    } satisfies Record<TabsOrientation, string>,
  },
  compoundVariants: [
    { variant: 'link', orientation: 'horizontal', class: 'border-b' },
    { variant: 'link', orientation: 'vertical', class: 'border-s' },
  ],
  defaultVariants: {
    variant: tabsDefaults.variant,
    orientation: tabsDefaults.orientation,
  },
})

export const tabsIndicatorVariants = cva(
  [
    'absolute bg-(--tabs-color) transition-[top,left,width,height] duration-200 ease-out',
    'data-[activation-direction=none]:transition-none',
  ],
  {
    variants: {
      variant: {
        pill: 'top-(--active-tab-top) left-(--active-tab-left) h-(--active-tab-height) w-(--active-tab-width) rounded-(--tabs-radius) shadow-xs',
        link: '',
      } satisfies Record<TabsVariant, string>,
      orientation: {
        horizontal: '',
        vertical: '',
      } satisfies Record<TabsOrientation, string>,
    },
    compoundVariants: [
      {
        variant: 'link',
        orientation: 'horizontal',
        class: '-bottom-px left-(--active-tab-left) h-0.5 w-(--active-tab-width)',
      },
      {
        variant: 'link',
        orientation: 'vertical',
        class: 'top-(--active-tab-top) -start-px h-(--active-tab-height) w-0.5',
      },
    ],
    defaultVariants: {
      variant: tabsDefaults.variant,
      orientation: tabsDefaults.orientation,
    },
  },
)

export const tabsTabVariants = cva(
  [
    'relative z-1 inline-flex min-w-0 shrink-0 cursor-pointer items-center rounded-(--tabs-radius) font-medium whitespace-nowrap text-muted-foreground select-none',
    'transition-[color,box-shadow,opacity] outline-none',
    'interactive:not-data-selected:hover:text-foreground',
    'focus-visible:ring-[3px] focus-visible:ring-(--tabs-color)/30',
    'data-disabled:cursor-not-allowed data-disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        pill: 'data-selected:text-(--tabs-color-foreground)',
        link: 'data-selected:text-(--tabs-color)',
      } satisfies Record<TabsVariant, string>,
      orientation: {
        horizontal: 'justify-center',
        vertical: 'justify-start',
      } satisfies Record<TabsOrientation, string>,
      size: {
        xs: 'gap-1 px-2 text-xs',
        sm: 'gap-1.5 px-2.5 text-sm',
        md: 'gap-2 px-3 text-base',
        lg: 'gap-2 px-4 text-lg',
        xl: 'gap-2 px-5 text-xl',
      } satisfies Record<TabsSize, string>,
    },
    compoundVariants: [
      { variant: 'pill', orientation: 'horizontal', class: 'flex-1' },
      ...(
        [
          ['xs', 'h-5', 'h-7'],
          ['sm', 'h-6', 'h-8'],
          ['md', 'h-7', 'h-9'],
          ['lg', 'h-8', 'h-10'],
          ['xl', 'h-9', 'h-11'],
        ] satisfies [TabsSize, string, string][]
      ).flatMap(([size, pill, link]) => [
        { variant: 'pill' as const, size, class: pill },
        { variant: 'link' as const, size, class: link },
      ]),
    ],
    defaultVariants: {
      variant: tabsDefaults.variant,
      orientation: tabsDefaults.orientation,
      size: tabsDefaults.size,
    },
  },
)

export const tabsSlotVariants = cva('inline-flex shrink-0 items-center justify-center', {
  variants: {
    size: {
      xs: 'size-3',
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6',
      xl: 'size-7',
    } satisfies Record<TabsSize, string>,
  },
  defaultVariants: { size: tabsDefaults.size },
})

export const tabsIconVariants = cva('size-full')

export const tabsLabelVariants = cva('truncate')

export const tabsPanelVariants = cva(
  'rounded-(--tabs-radius) outline-none focus-visible:ring-[3px] focus-visible:ring-(--tabs-color)/30',
  {
    variants: {
      orientation: {
        horizontal: 'w-full',
        vertical: 'min-w-0 flex-1',
      } satisfies Record<TabsOrientation, string>,
    },
    defaultVariants: { orientation: tabsDefaults.orientation },
  },
)
