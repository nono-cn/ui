import { Rating as RatingRoot } from '@ui-sdk/vue/rating'
import { propsOf } from '@/composables/useUi'
import type { RatingUi } from '@/components/Rating/types'
import Icon from '@/components/Icon/Icon.vue'

export const ratingUiExclude = {
  root: propsOf(RatingRoot),
  item: [],
  emptyIcon: propsOf(Icon),
  icon: propsOf(Icon),
} satisfies Record<keyof RatingUi, readonly string[]>
