import { AvatarFallback, Avatar as AvatarRoot, AvatarImage } from '@ui-sdk/vue/avatar'
import { propsOf } from '@/composables/useUi'
import type { AvatarUi } from '@/components/Avatar/types'
import Icon from '@/components/Icon/Icon.vue'

export const avatarUiExclude = {
  root: propsOf(AvatarRoot),
  image: [...propsOf(AvatarImage), 'src'],
  fallback: propsOf(AvatarFallback),
  text: [],
  icon: propsOf(Icon),
} satisfies Record<keyof AvatarUi, readonly string[]>
