import { cva } from 'class-variance-authority'
import { bubbleDefaults } from '@/components/Bubble/constants'
import type {
  BubbleAlign,
  BubbleReactionsAlign,
  BubbleReactionsSide,
  BubbleVariant,
} from '@/components/Bubble/types'

export const bubbleVariants = cva('relative flex w-fit min-w-0 flex-col', {
  variants: {
    align: {
      start: 'me-auto',
      end: 'ms-auto',
    } satisfies Record<BubbleAlign, string>,
    fill: {
      true: 'max-w-full',
      false: 'max-w-[80%]',
    },
    reactions: {
      none: '',
      top: 'pt-4',
      bottom: 'pb-4',
    } satisfies Record<BubbleReactionsSide | 'none', string>,
  },
  defaultVariants: {
    align: bubbleDefaults.align,
    fill: false,
    reactions: 'none',
  },
})

export const bubbleContentVariants = cva(
  'rounded-(--bubble-radius) border px-3 py-2 text-start text-sm break-words',
  {
    variants: {
      variant: {
        solid: 'border-transparent bg-(--bubble-color) text-(--bubble-color-foreground)',
        outline: 'border-(--bubble-color)/40 bg-transparent text-(--bubble-color)',
        plain: 'border-transparent bg-transparent px-0 py-0 text-(--bubble-color)',
        subtle: 'border-(--bubble-color)/20 bg-(--bubble-color)/10 text-(--bubble-color)',
        soft: 'border-transparent bg-(--bubble-color)/10 text-(--bubble-color)',
      } satisfies Record<BubbleVariant, string>,
      interactive: {
        true: [
          'cursor-pointer transition-[color,background-color,border-color,box-shadow] outline-none',
          'focus-visible:border-(--bubble-color) focus-visible:ring-[3px] focus-visible:ring-(--bubble-color)/30',
        ],
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'solid',
        interactive: true,
        class: 'hover:bg-(--bubble-color)/90 active:bg-(--bubble-color)/80',
      },
      {
        variant: ['outline', 'plain'],
        interactive: true,
        class: 'hover:bg-(--bubble-color)/10 active:bg-(--bubble-color)/20',
      },
      {
        variant: 'subtle',
        interactive: true,
        class: 'hover:bg-(--bubble-color)/15 active:bg-(--bubble-color)/25',
      },
      {
        variant: 'soft',
        interactive: true,
        class: 'hover:bg-(--bubble-color)/20 active:bg-(--bubble-color)/30',
      },
    ],
    defaultVariants: {
      variant: bubbleDefaults.variant,
      interactive: false,
    },
  },
)

export const bubbleReactionsVariants = cva(
  [
    'absolute z-10 inline-flex min-h-6 items-center gap-1 rounded-full border border-border bg-card px-2 text-xs whitespace-nowrap text-card-foreground shadow-xs ring-2 ring-card',
    'has-[button]:p-0',
  ],
  {
    variants: {
      /* The root pads 1rem for the reactions, so they overlap the content by 0.5rem at any height. */
      side: {
        top: 'bottom-[calc(100%-1.5rem)]',
        bottom: 'top-[calc(100%-1.5rem)]',
      } satisfies Record<BubbleReactionsSide, string>,
      align: {
        start: 'start-3',
        end: 'end-3',
      } satisfies Record<BubbleReactionsAlign, string>,
    },
    defaultVariants: {
      side: bubbleDefaults.reactionsSide,
      align: bubbleDefaults.reactionsAlign,
    },
  },
)

export const bubbleGroupVariants = cva('flex w-full flex-col gap-1')
