import type { ButtonHTMLAttributes, ImgHTMLAttributes } from 'vue'
import type {
  attachmentOrientations,
  attachmentSizes,
  attachmentStates,
} from '@/components/Attachment/constants'
import type { FileLike } from '@/components/Attachment/file'
import type { ButtonProps } from '@/components/Button/types'
import type { Radius } from '@/composables/useTheme'
import type { UiAttributes, UiResolver } from '@/composables/useUi'
import type { IconName } from '@/icons'

export type AttachmentState = (typeof attachmentStates)[number]

export type AttachmentSize = (typeof attachmentSizes)[number]

export type AttachmentOrientation = (typeof attachmentOrientations)[number]

export interface AttachmentUi {
  media?: UiResolver
  image?: UiResolver<ImgHTMLAttributes & UiAttributes>
  icon?: UiResolver
  content?: UiResolver
  label?: UiResolver
  description?: UiResolver
  actions?: UiResolver
  removeButton?: UiResolver<ButtonProps & ButtonHTMLAttributes & UiAttributes>
  trigger?: UiResolver<ButtonHTMLAttributes & UiAttributes>
  progress?: UiResolver
}

export interface AttachmentProps {
  file?: FileLike
  label?: string
  description?: string
  src?: string
  alt?: string
  icon?: IconName
  state?: AttachmentState
  progress?: number
  size?: AttachmentSize
  orientation?: AttachmentOrientation
  radius?: Radius
  removable?: boolean
  removeLabel?: string
  openLabel?: string
  onOpen?: (event: MouseEvent) => unknown
  ui?: AttachmentUi
}

export interface AttachmentEmits {
  remove: []
}

export interface AttachmentSlots {
  media?(): unknown
  label?(): unknown
  description?(): unknown
  actions?(props: { remove: () => void }): unknown
}

export interface AttachmentGroupSlots {
  default?(): unknown
}
