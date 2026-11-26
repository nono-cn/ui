import { cva } from 'class-variance-authority'
import { accordionDefaults } from '@/components/Accordion/constants'
import type {
  AccordionIndicator,
  AccordionIndicatorPosition,
  AccordionSize,
  AccordionVariant,
} from '@/components/Accordion/types'

const boxed = ['outline', 'separated', 'soft'] as const satisfies AccordionVariant[]

const insets = {
  xs: 'px-2.5',
  sm: 'px-3',
  md: 'px-4',
  lg: 'px-5',
  xl: 'px-6',
} satisfies Record<AccordionSize, string>

function insetVariants() {
  return boxed.flatMap((variant) =>
    Object.entries(insets).map(([size, inset]) => ({
      variant,
      size: size as AccordionSize,
      class: inset,
    })),
  )
}

export const accordionVariants = cva('flex w-full flex-col', {
  variants: {
    variant: {
      plain: '',
      outline: 'overflow-hidden rounded-(--accordion-radius) border border-border',
      separated: 'gap-2',
      soft: 'gap-2',
    } satisfies Record<AccordionVariant, string>,
  },
  defaultVariants: { variant: accordionDefaults.variant },
})

export const accordionItemVariants = cva('', {
  variants: {
    variant: {
      plain: 'border-b border-border last:border-b-0',
      outline: 'border-b border-border transition-colors last:border-b-0 data-open:bg-muted/50',
      separated: 'rounded-(--accordion-radius) border border-border',
      soft: 'rounded-(--accordion-radius) bg-muted',
    } satisfies Record<AccordionVariant, string>,
  },
  defaultVariants: { variant: accordionDefaults.variant },
})

export const accordionHeaderVariants = cva('flex')

export const accordionTriggerVariants = cva(
  [
    'flex min-w-0 flex-1 cursor-pointer items-center rounded-(--accordion-radius) text-start font-medium',
    'transition-[background-color,box-shadow] outline-none',
    'focus-visible:ring-[3px] focus-visible:ring-(--accordion-color)/30 focus-visible:ring-inset',
    'data-disabled:cursor-not-allowed data-disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        plain: '',
        outline: 'rounded-none interactive:hover:bg-muted/50',
        separated: 'interactive:hover:bg-muted/50',
        soft: '',
      } satisfies Record<AccordionVariant, string>,
      size: {
        xs: 'gap-1.5 py-2 text-xs',
        sm: 'gap-2 py-2.5 text-sm',
        md: 'gap-2.5 py-3 text-base',
        lg: 'gap-3 py-3.5 text-lg',
        xl: 'gap-3 py-4 text-xl',
      } satisfies Record<AccordionSize, string>,
    },
    compoundVariants: insetVariants(),
    defaultVariants: { variant: accordionDefaults.variant, size: accordionDefaults.size },
  },
)

export const accordionSlotVariants = cva('inline-flex shrink-0 items-center justify-center', {
  variants: {
    size: {
      xs: 'size-3.5',
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6',
      xl: 'size-7',
    } satisfies Record<AccordionSize, string>,
    end: { true: 'ms-auto', false: '' },
  },
  defaultVariants: { size: accordionDefaults.size, end: false },
})

export const accordionIconVariants = cva('size-full')

export const accordionIndicatorIconVariants = cva(
  'size-full text-muted-foreground transition-transform duration-200 motion-reduce:transition-none',
  {
    variants: {
      indicator: { chevron: '', plus: '' } satisfies Record<AccordionIndicator, string>,
      position: { start: '', end: '' } satisfies Record<AccordionIndicatorPosition, string>,
      open: { true: '', false: '' },
    },
    compoundVariants: [
      { indicator: 'chevron', position: 'end', open: true, class: 'rotate-180' },
      { indicator: 'chevron', position: 'start', open: false, class: 'rtl:rotate-180' },
      { indicator: 'chevron', position: 'start', open: true, class: 'rotate-90' },
      { indicator: 'plus', open: true, class: 'rotate-180' },
    ],
    defaultVariants: {
      indicator: accordionDefaults.indicator,
      position: accordionDefaults.indicatorPosition,
      open: false,
    },
  },
)

export const accordionPanelVariants = cva([
  'h-(--accordion-panel-height) overflow-hidden transition-[height] duration-200 ease-out motion-reduce:transition-none',
  'data-ending-style:h-0 data-starting-style:h-0',
])

export const accordionBodyVariants = cva('text-muted-foreground', {
  variants: {
    variant: {
      plain: '',
      outline: '',
      separated: '',
      soft: '',
    } satisfies Record<AccordionVariant, string>,
    size: {
      xs: 'pb-2 text-xs',
      sm: 'pb-2.5 text-sm',
      md: 'pb-3 text-sm',
      lg: 'pb-3.5 text-base',
      xl: 'pb-4 text-lg',
    } satisfies Record<AccordionSize, string>,
  },
  compoundVariants: insetVariants(),
  defaultVariants: { variant: accordionDefaults.variant, size: accordionDefaults.size },
})
