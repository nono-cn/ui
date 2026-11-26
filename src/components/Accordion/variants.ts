import { cva } from 'class-variance-authority'
import { accordionDefaults } from '@/components/Accordion/constants'
import type { AccordionVariant } from '@/components/Accordion/types'

export const accordionVariants = cva('flex w-full flex-col', {
  variants: {
    variant: {
      plain: '',
      outline: 'overflow-hidden rounded-md border border-border',
      separated: 'gap-2',
      frame: 'gap-1 rounded-lg border border-border bg-muted/50 p-1',
    } satisfies Record<AccordionVariant, string>,
  },
  defaultVariants: { variant: accordionDefaults.variant },
})

export const accordionItemVariants = cva('', {
  variants: {
    variant: {
      plain: 'border-b border-border last:border-b-0',
      outline: 'border-b border-border transition-colors last:border-b-0 data-open:bg-muted/50',
      separated: 'rounded-md border border-border',
      frame: 'rounded-md border border-border bg-card shadow-xs',
    } satisfies Record<AccordionVariant, string>,
  },
  defaultVariants: { variant: accordionDefaults.variant },
})

export const accordionHeaderVariants = cva('flex')

export const accordionTriggerVariants = cva(
  [
    'flex min-w-0 flex-1 cursor-pointer items-center gap-2.5 rounded-md py-3 text-start text-base font-medium',
    'transition-[background-color,box-shadow] outline-none',
    'focus-visible:ring-[3px] focus-visible:ring-neutral/30 focus-visible:ring-inset',
    'data-disabled:cursor-not-allowed data-disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        plain: '',
        outline: 'rounded-none px-4 interactive:hover:bg-muted/50',
        separated: 'px-4 interactive:hover:bg-muted/50',
        frame: 'px-4',
      } satisfies Record<AccordionVariant, string>,
    },
    defaultVariants: { variant: accordionDefaults.variant },
  },
)

export const accordionSlotVariants = cva(
  'inline-flex size-5 shrink-0 items-center justify-center',
  {
    variants: {
      end: { true: 'ms-auto', false: '' },
    },
    defaultVariants: { end: false },
  },
)

export const accordionIconVariants = cva('size-full')

export const accordionIndicatorIconVariants = cva(
  'size-full text-muted-foreground transition-transform duration-200 motion-reduce:transition-none',
  {
    variants: {
      rotation: { 0: '', 90: '', 180: '' },
      open: { true: '', false: '' },
    },
    compoundVariants: [
      { rotation: 180, open: true, class: 'rotate-180' },
      { rotation: 90, open: false, class: 'rtl:rotate-180' },
      { rotation: 90, open: true, class: 'rotate-90' },
    ],
    defaultVariants: { rotation: 180, open: false },
  },
)

export const accordionPanelVariants = cva([
  'h-(--accordion-panel-height) overflow-hidden transition-[height] duration-200 ease-out motion-reduce:transition-none',
  'data-ending-style:h-0 data-starting-style:h-0',
])

export const accordionBodyVariants = cva('pb-3 text-sm text-muted-foreground', {
  variants: {
    variant: {
      plain: '',
      outline: 'px-4',
      separated: 'px-4',
      frame: 'px-4',
    } satisfies Record<AccordionVariant, string>,
  },
  defaultVariants: { variant: accordionDefaults.variant },
})
