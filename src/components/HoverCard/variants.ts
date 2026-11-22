import { cva } from 'class-variance-authority'

export const hoverCardTriggerVariants = cva('inline-flex max-w-full')

export const hoverCardContentVariants = cva([
  'z-50 m-0 max-w-(--available-width) overflow-visible rounded-(--hover-card-radius) border bg-popover p-4',
  'text-sm text-popover-foreground shadow-md outline-none',
  'origin-(--transform-origin) transition-[opacity,scale] duration-150',
  'data-starting-style:scale-95 data-starting-style:opacity-0',
  'data-ending-style:scale-95 data-ending-style:opacity-0',
])

export const hoverCardArrowVariants = cva([
  'pointer-events-none size-2.5 rotate-45 border border-transparent bg-popover',
  'data-[side=bottom]:-top-[5px] data-[side=bottom]:border-t-border data-[side=bottom]:border-l-border',
  'data-[side=top]:-bottom-[5px] data-[side=top]:border-r-border data-[side=top]:border-b-border',
  'data-[side=right]:-left-[5px] data-[side=right]:border-b-border data-[side=right]:border-l-border',
  'data-[side=left]:-right-[5px] data-[side=left]:border-t-border data-[side=left]:border-r-border',
])
