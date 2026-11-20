<script setup lang="ts">
import { createRatingController, type RatingItemState } from '@ui-sdk/core/rating'
import { Rating as RatingRoot, RatingItem } from '@ui-sdk/vue/rating'
import { computed, useAttrs } from 'vue'
import { cn, type ClassValue } from '@/composables/cn'
import { getColorVariables, oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import { useFormField } from '@/components/FormField/context'
import { useLocale } from '@/i18n/useLocale'
import { ratingDefaults, ratingOrientations, ratingSizes } from '@/components/Rating/constants'
import type {
  RatingChangeDetails,
  RatingEmits,
  RatingExpose,
  RatingProps,
  RatingSlots,
} from '@/components/Rating/types'
import {
  ratingEmptyIconVariants,
  ratingIconVariants,
  ratingItemVariants,
  ratingVariants,
} from '@/components/Rating/variants'
import Icon from '@/components/Icon/Icon.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<RatingProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  max: ratingDefaults.max,
  step: ratingDefaults.step,
  color: ratingDefaults.color,
  size: undefined,
  orientation: ratingDefaults.orientation,
  icon: ratingDefaults.icon,
  emptyIcon: undefined,
  deselectable: undefined,
  disabled: undefined,
  readOnly: undefined,
  required: undefined,
  loop: undefined,
})

const emit = defineEmits<RatingEmits>()
defineSlots<RatingSlots>()
const attrs = useAttrs()
const formField = useFormField()
const { locale, t } = useLocale()

const controller = createRatingController()

const size = computed(() =>
  oneOf(props.size ?? formField?.size(), ratingSizes, ratingDefaults.size),
)

const orientation = computed(() =>
  oneOf(props.orientation, ratingOrientations, ratingDefaults.orientation),
)

const valueLabel = computed(() => {
  const { format } = new Intl.NumberFormat(locale.value)
  const message = t('ratingValue')
  return (value: number, max: number) =>
    message.replace('{value}', format(value)).replace('{max}', format(max))
})

const rootProps = computed(() => ({
  'aria-orientation': props.readOnly ? undefined : orientation.value,
  'data-orientation': orientation.value,
  ...attrs,
  class: cn(ratingVariants({ orientation: orientation.value }), attrs.class as ClassValue),
  style: [getColorVariables(props.color, 'rating', ratingDefaults.color), attrs.style],
  modelValue: props.modelValue,
  defaultValue: props.defaultValue,
  'onUpdate:modelValue': (value: number | null) => emit('update:modelValue', value),
  onValueChange: (value: number | null, details: RatingChangeDetails) =>
    emit('valueChange', value, details),
  max: props.max,
  step: props.step,
  deselectable: props.deselectable,
  disabled: props.disabled,
  readOnly: props.readOnly,
  required: props.required ?? formField?.required(),
  name: props.name,
  form: props.form,
  loop: props.loop,
  getValueLabel: props.getValueLabel ?? valueLabel.value,
  controller,
}))

function itemProps(itemAttrs: Record<string, unknown>, state: RatingItemState) {
  return useUi(
    {
      ...itemAttrs,
      class: cn(ratingItemVariants({ size: size.value }), itemAttrs.class as ClassValue),
    },
    props.ui?.item,
    state,
  )
}

function emptyIconProps(state: RatingItemState) {
  return useUi(
    {
      name: props.emptyIcon ?? props.icon,
      fill: 'currentColor',
      class: ratingEmptyIconVariants(),
    },
    props.ui?.emptyIcon,
    state,
  )
}

function iconProps(state: RatingItemState) {
  return useUi(
    {
      name: props.icon,
      fill: 'currentColor',
      class: ratingIconVariants(),
    },
    props.ui?.icon,
    state,
  )
}

defineExpose<RatingExpose>({
  getValue: () => controller.getValue(),
  setValue: (value, details) => controller.setValue(value, details),
  focus: () => controller.focus(),
})
</script>

<template>
  <RatingRoot data-ui="rating-root" v-bind="rootProps">
    <RatingItem>
      <template #render="{ props: itemAttrs, state, children }">
        <span data-ui="rating-item" v-bind="itemProps(itemAttrs, state)">
          <component :is="children" />
        </span>
      </template>
      <template #default="{ state }">
        <slot name="item" v-bind="state">
          <Icon data-ui="rating-empty-icon" v-bind="emptyIconProps(state)" />
          <Icon v-if="state.fill > 0" data-ui="rating-icon" v-bind="iconProps(state)" />
        </slot>
      </template>
    </RatingItem>
  </RatingRoot>
</template>
