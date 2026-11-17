<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { cn, type ClassValue } from '@/composables/cn'
import { getColorVariables, oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import { alertDefaults, alertVariantNames } from '@/components/Alert/constants'
import type { AlertEmits, AlertProps, AlertSlots } from '@/components/Alert/types'
import {
  alertCloseVariants,
  alertDescriptionVariants,
  alertIconVariants,
  alertLabelVariants,
  alertVariants,
} from '@/components/Alert/variants'
import Button from '@/components/Button/Button.vue'
import Icon from '@/components/Icon/Icon.vue'
import { useLocale } from '@/i18n/useLocale'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<AlertProps>(), {
  variant: alertDefaults.variant,
  color: alertDefaults.color,
  closable: alertDefaults.closable,
  closeLabel: undefined,
  decorative: alertDefaults.decorative,
})

const emit = defineEmits<AlertEmits>()
const slots = defineSlots<AlertSlots>()
const attrs = useAttrs()
const { t } = useLocale()

const visible = ref(true)
const variant = computed(() => oneOf(props.variant, alertVariantNames, alertDefaults.variant))
const hasIcon = computed(() => Boolean(props.icon || slots.icon))
const hasLabel = computed(() => Boolean(props.label || slots.label))
const hasDescription = computed(() => Boolean(props.description || slots.description))

const iconProps = computed(() =>
  useUi({ 'data-slot': 'icon', class: alertIconVariants() }, props.ui?.icon),
)

const labelProps = computed(() =>
  useUi({ 'data-slot': 'label', class: alertLabelVariants() }, props.ui?.label),
)

const descriptionProps = computed(() =>
  useUi({ 'data-slot': 'description', class: alertDescriptionVariants() }, props.ui?.description),
)

const closeProps = computed(() =>
  useUi({ 'data-slot': 'close', class: alertCloseVariants() }, props.ui?.close),
)

const closeButtonProps = computed(() =>
  useUi(
    {
      'aria-label': props.closeLabel || t('close'),
      size: 'icon-xs' as const,
      radius: 'full',
      variant: variant.value,
      color: props.color,
      leadingIcon: 'x' as const,
    },
    props.ui?.closeButton,
  ),
)

const rootProps = computed(() => ({
  'data-slot': 'alert',
  role: props.decorative ? 'none' : 'alert',
  ...attrs,
  class: cn(
    alertVariants({ variant: variant.value, icon: hasIcon.value }),
    attrs.class as ClassValue,
  ),
  style: [getColorVariables(props.color, 'alert', alertDefaults.color), attrs.style],
}))

function close() {
  visible.value = false
  emit('close')
}
</script>

<template>
  <div v-if="visible" v-bind="rootProps">
    <span v-if="hasIcon" v-bind="iconProps">
      <slot name="icon">
        <Icon v-if="icon" :name="icon" />
      </slot>
    </span>
    <div v-if="hasLabel" v-bind="labelProps">
      <slot name="label">{{ label }}</slot>
    </div>
    <div v-if="hasDescription" v-bind="descriptionProps">
      <slot name="description">{{ description }}</slot>
    </div>
    <div v-if="closable" v-bind="closeProps">
      <slot name="close" :close="close">
        <Button v-bind="closeButtonProps" @click="close" />
      </slot>
    </div>
  </div>
</template>
