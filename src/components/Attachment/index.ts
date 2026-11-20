export { default as Attachment } from '@/components/Attachment/Attachment.vue'
export { default as AttachmentGroup } from '@/components/Attachment/AttachmentGroup.vue'
export {
  attachmentDefaults,
  attachmentOrientations,
  attachmentSizes,
  attachmentStates,
} from '@/components/Attachment/constants'
export {
  getFileDescription,
  getFileExtension,
  getFileIcon,
  isImageFile,
} from '@/components/Attachment/file'
export type { FileLike } from '@/components/Attachment/file'
export type {
  AttachmentEmits,
  AttachmentGroupSlots,
  AttachmentOrientation,
  AttachmentProps,
  AttachmentSize,
  AttachmentSlots,
  AttachmentState,
  AttachmentUi,
} from '@/components/Attachment/types'
export {
  attachmentActionsVariants,
  attachmentContentVariants,
  attachmentDescriptionVariants,
  attachmentGroupVariants,
  attachmentIconVariants,
  attachmentImageVariants,
  attachmentLabelVariants,
  attachmentMediaVariants,
  attachmentProgressIndicatorVariants,
  attachmentProgressVariants,
  attachmentRemoveButtonVariants,
  attachmentSpinnerVariants,
  attachmentTriggerVariants,
  attachmentVariants,
} from '@/components/Attachment/variants'
