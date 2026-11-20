<script setup lang="ts">
import { computed, ref, useAttrs, watch, watchEffect } from 'vue'
import { cn, type ClassValue } from '@/composables/cn'
import { getRadiusVariables, oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import {
  attachmentDefaults,
  attachmentOrientations,
  attachmentSizes,
  attachmentStates,
} from '@/components/Attachment/constants'
import { getFileDescription, getFileIcon, isImageFile } from '@/components/Attachment/file'
import type {
  AttachmentEmits,
  AttachmentProps,
  AttachmentSlots,
} from '@/components/Attachment/types'
import {
  attachmentActionsVariants,
  attachmentContentVariants,
  attachmentDescriptionVariants,
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
import Button from '@/components/Button/Button.vue'
import Icon from '@/components/Icon/Icon.vue'
import { useLocale } from '@/i18n/useLocale'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<AttachmentProps>(), {
  file: undefined,
  state: attachmentDefaults.state,
  progress: undefined,
  size: attachmentDefaults.size,
  orientation: attachmentDefaults.orientation,
  radius: attachmentDefaults.radius,
  removable: attachmentDefaults.removable,
  removeLabel: undefined,
  openLabel: undefined,
  onOpen: undefined,
})

const emit = defineEmits<AttachmentEmits>()
const slots = defineSlots<AttachmentSlots>()
const attrs = useAttrs()
const { locale, t } = useLocale()

const state = computed(() => oneOf(props.state, attachmentStates, attachmentDefaults.state))
const size = computed(() => oneOf(props.size, attachmentSizes, attachmentDefaults.size))
const orientation = computed(() =>
  oneOf(props.orientation, attachmentOrientations, attachmentDefaults.orientation),
)
const busy = computed(() => state.value === 'uploading' || state.value === 'processing')

const name = computed(() => props.label ?? props.file?.name ?? '')
const descriptionText = computed(
  () => props.description ?? (props.file ? getFileDescription(props.file, locale.value) : ''),
)
const hasLabel = computed(() => Boolean(name.value || slots.label))
const hasDescription = computed(
  () => size.value !== 'sm' && Boolean(descriptionText.value || slots.description),
)
const hasActions = computed(() => props.removable || Boolean(slots.actions))

const objectUrl = ref<string>()

/* flush: 'post' keeps it out of SSR, where a blob URL would never be revoked. */
watchEffect(
  (onCleanup) => {
    const file = props.file
    if (props.src || !(file instanceof Blob) || !isImageFile(file)) {
      objectUrl.value = undefined
      return
    }

    const url = URL.createObjectURL(file)
    objectUrl.value = url
    onCleanup(() => URL.revokeObjectURL(url))
  },
  { flush: 'post' },
)

const imageSrc = computed(() => props.src || objectUrl.value)
const imageFailed = ref(false)
watch(imageSrc, () => (imageFailed.value = false))
const showImage = computed(() => Boolean(imageSrc.value) && !imageFailed.value)

const progress = computed(() =>
  state.value === 'uploading' && typeof props.progress === 'number'
    ? Math.min(100, Math.max(0, props.progress))
    : undefined,
)

const variantArgs = computed(() => ({ size: size.value, orientation: orientation.value }))

const mediaProps = computed(() =>
  useUi(
    { 'data-slot': 'media', class: attachmentMediaVariants(variantArgs.value) },
    props.ui?.media,
  ),
)

const imageProps = computed(() =>
  useUi(
    {
      'data-slot': 'image',
      src: imageSrc.value,
      alt: props.alt ?? '',
      class: attachmentImageVariants(),
      onError: () => (imageFailed.value = true),
    },
    props.ui?.image,
  ),
)

const iconProps = computed(() =>
  useUi(
    {
      'data-slot': 'icon',
      name: props.icon ?? (props.file ? getFileIcon(props.file) : 'file'),
      class: attachmentIconVariants(variantArgs.value),
    },
    props.ui?.icon,
  ),
)

const spinnerProps = computed(() => ({
  'data-slot': 'spinner',
  class: attachmentSpinnerVariants({ image: showImage.value }),
}))

const spinnerIconProps = computed(() => ({
  name: 'spinner' as const,
  class: cn(attachmentIconVariants(variantArgs.value), 'animate-spin'),
}))

const contentProps = computed(() =>
  useUi(
    {
      'data-slot': 'content',
      class: attachmentContentVariants({ orientation: orientation.value }),
    },
    props.ui?.content,
  ),
)

const labelProps = computed(() =>
  useUi({ 'data-slot': 'label', class: attachmentLabelVariants() }, props.ui?.label),
)

const descriptionProps = computed(() =>
  useUi(
    { 'data-slot': 'description', class: attachmentDescriptionVariants() },
    props.ui?.description,
  ),
)

const actionsProps = computed(() =>
  useUi(
    {
      'data-slot': 'actions',
      class: attachmentActionsVariants({ orientation: orientation.value }),
    },
    props.ui?.actions,
  ),
)

const removeButtonProps = computed(() =>
  useUi(
    {
      'aria-label': props.removeLabel || t('removeFile', { name: name.value }).trim(),
      type: 'button' as const,
      size: 'icon-xs' as const,
      radius: 'full',
      variant: 'plain' as const,
      color: 'neutral',
      leadingIcon: 'x' as const,
      class: attachmentRemoveButtonVariants({
        compact: size.value === 'sm' || orientation.value === 'vertical',
      }),
    },
    props.ui?.removeButton,
  ),
)

const triggerProps = computed(() =>
  useUi(
    {
      'data-slot': 'trigger',
      type: 'button' as const,
      'aria-label': props.openLabel || t('openFile', { name: name.value }).trim(),
      class: attachmentTriggerVariants(),
      onClick: props.onOpen,
    },
    props.ui?.trigger,
  ),
)

const progressProps = computed(() =>
  useUi(
    {
      'data-slot': 'progress',
      role: 'progressbar',
      'aria-label': name.value || undefined,
      'aria-valuemin': 0,
      'aria-valuemax': 100,
      'aria-valuenow': progress.value,
      class: attachmentProgressVariants(),
    },
    props.ui?.progress,
  ),
)

const progressIndicatorProps = computed(() => ({
  'data-slot': 'progress-indicator',
  class: attachmentProgressIndicatorVariants(),
  style: { width: `${progress.value}%` },
}))

const rootProps = computed(() => ({
  'data-slot': 'attachment',
  'data-state': state.value,
  'data-size': size.value,
  'data-orientation': orientation.value,
  'aria-busy': busy.value || undefined,
  ...attrs,
  class: cn(attachmentVariants(variantArgs.value), attrs.class as ClassValue),
  style: [getRadiusVariables(props.radius, 'attachment', attachmentDefaults.radius), attrs.style],
}))

function remove() {
  emit('remove')
}
</script>

<template>
  <div v-bind="rootProps">
    <div v-bind="mediaProps">
      <slot name="media">
        <img v-if="showImage" v-bind="imageProps" />
        <Icon v-else-if="!busy" v-bind="iconProps" />
        <span v-if="busy" v-bind="spinnerProps">
          <Icon v-bind="spinnerIconProps" />
        </span>
      </slot>
    </div>
    <div v-if="hasLabel || hasDescription" v-bind="contentProps">
      <div v-if="hasLabel" v-bind="labelProps">
        <slot name="label">{{ name }}</slot>
      </div>
      <div v-if="hasDescription" v-bind="descriptionProps">
        <slot name="description">{{ descriptionText }}</slot>
      </div>
    </div>
    <button v-if="onOpen" v-bind="triggerProps" />
    <div v-if="hasActions" v-bind="actionsProps">
      <slot name="actions" :remove="remove">
        <Button v-if="removable" v-bind="removeButtonProps" @click="remove" />
      </slot>
    </div>
    <div v-if="progress !== undefined" v-bind="progressProps">
      <div v-bind="progressIndicatorProps" />
    </div>
  </div>
</template>
