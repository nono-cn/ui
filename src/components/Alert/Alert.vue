<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { getColorVariables, oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import { alertDefaults, alertVariantNames } from '@/components/Alert/constants'
import { alertUiExclude } from '@/components/Alert/exclude'
import type { AlertEmits, AlertProps, AlertSlots } from '@/components/Alert/types'
import {
  alertCloseContainerVariants,
  alertDescriptionVariants,
  alertLabelVariants,
  alertLeadingVariants,
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
  closeButton: undefined,
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

const leadingProps = computed(() => ({ class: alertLeadingVariants() }))

const iconProps = computed(() => ({
  ...useUi({ base: {}, ui: props.ui?.icon?.(), exclude: alertUiExclude.icon }),
  name: props.icon!,
}))

const labelProps = computed(() =>
  useUi({
    base: { class: alertLabelVariants() },
    ui: props.ui?.label?.(),
    exclude: alertUiExclude.label,
  }),
)

const descriptionProps = computed(() =>
  useUi({
    base: { class: alertDescriptionVariants() },
    ui: props.ui?.description?.(),
    exclude: alertUiExclude.description,
  }),
)

const closeContainerProps = computed(() => ({ class: alertCloseContainerVariants() }))

const closeButtonProps = computed(() => ({
  ...(props.closeButton?.label ? {} : { 'aria-label': t('close') }),
  size: 'xs' as const,
  radius: 'full' as const,
  variant: variant.value,
  color: props.color,
  icon: 'x' as const,
  ...props.closeButton,
  onClick: close,
}))

const rootProps = computed(() =>
  useUi({
    base: [
      {
        role: props.decorative ? 'none' : 'alert',
        class: alertVariants({ variant: variant.value, icon: hasIcon.value }),
        style: getColorVariables(props.color, 'alert', alertDefaults.color),
      },
      attrs,
    ],
    ui: props.ui?.root?.(),
    exclude: alertUiExclude.root,
  }),
)

function close() {
  visible.value = false
  emit('close')
}
</script>

<template>
  <div v-if="visible" data-ui="alert-root" v-bind="rootProps">
    <span v-if="hasIcon" data-ui="alert-leading" v-bind="leadingProps">
      <slot name="icon">
        <Icon v-if="icon" data-ui="alert-icon" v-bind="iconProps" />
      </slot>
    </span>
    <div v-if="hasLabel" data-ui="alert-label" v-bind="labelProps">
      <slot name="label">{{ label }}</slot>
    </div>
    <div v-if="hasDescription" data-ui="alert-description" v-bind="descriptionProps">
      <slot name="description">{{ description }}</slot>
    </div>
    <div v-if="closable" data-ui="alert-close-container" v-bind="closeContainerProps">
      <slot name="close" :close="close">
        <Button data-ui="alert-close-button" v-bind="closeButtonProps" />
      </slot>
    </div>
  </div>
</template>
