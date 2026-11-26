<script setup lang="ts">
import { createSwitchController } from '@ui-sdk/core/switch'
import { Switch as SwitchRoot, SwitchThumb } from '@ui-sdk/vue/switch'
import { computed, useAttrs } from 'vue'
import { getColorVariables, getRadiusVariables, oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import { useFormField } from '@/components/FormField/context'
import { switchDefaults, switchSizes } from '@/components/Switch/constants'
import { switchUiExclude } from '@/components/Switch/exclude'
import type {
  SwitchChangeDetails,
  SwitchEmits,
  SwitchExpose,
  SwitchProps,
  SwitchSlots,
  SwitchThumbState,
} from '@/components/Switch/types'
import {
  switchIconVariants,
  switchThumbVariants,
  switchVariants,
} from '@/components/Switch/variants'
import Icon from '@/components/Icon/Icon.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  color: switchDefaults.color,
  size: undefined,
  radius: switchDefaults.radius,
  loading: false,
  loadingIcon: 'spinner',
  disabled: undefined,
  readOnly: undefined,
  required: undefined,
})

const emit = defineEmits<SwitchEmits>()
defineSlots<SwitchSlots>()
const attrs = useAttrs()
const formField = useFormField()

const controller = createSwitchController()

const size = computed(() =>
  oneOf(props.size ?? formField?.size(), switchSizes, switchDefaults.size),
)

function onCheckedChange(checked: boolean, details: SwitchChangeDetails) {
  if (props.loading && details.reason !== 'imperative') {
    details.cancel()
    return
  }
  emit('checkedChange', checked, details)
}

const rootProps = computed(() => ({
  ...useUi({
    base: [
      {
        class: switchVariants({ size: size.value }),
        style: [
          getColorVariables(props.color, 'switch', switchDefaults.color),
          getRadiusVariables(props.radius, 'switch', switchDefaults.radius),
        ],
      },
      attrs,
    ],
    ui: props.ui?.root?.(),
    exclude: switchUiExclude.root,
  }),
  checked: props.modelValue,
  defaultChecked: props.defaultValue,
  'onUpdate:checked': (value: boolean) => emit('update:modelValue', value),
  onCheckedChange,
  'aria-busy': props.loading || undefined,
  disabled: props.disabled,
  readOnly: props.readOnly,
  required: props.required ?? formField?.required(),
  name: props.name,
  value: props.value,
  form: props.form,
  controller,
}))

function thumbState(checked: boolean): SwitchThumbState {
  return { checked, loading: props.loading }
}

function thumbProps(state: SwitchThumbState) {
  return useUi({
    base: { class: switchThumbVariants({ size: size.value }) },
    ui: props.ui?.thumb?.(state),
    exclude: switchUiExclude.thumb,
  })
}

function thumbIcon(state: SwitchThumbState) {
  if (state.loading) return props.loadingIcon
  return state.checked ? props.checkedIcon : props.uncheckedIcon
}

function iconProps(state: SwitchThumbState) {
  return {
    ...useUi({
      base: { class: switchIconVariants({ loading: state.loading }) },
      ui: props.ui?.icon?.(state),
      exclude: switchUiExclude.icon,
    }),
    name: thumbIcon(state)!,
  }
}

defineExpose<SwitchExpose>({
  toggle: (details) => controller.toggle(details),
  setChecked: (checked, details) => controller.setChecked(checked, details),
  getChecked: () => controller.getChecked(),
  focus: () => controller.focus(),
})
</script>

<template>
  <SwitchRoot data-ui="switch-root" v-bind="rootProps">
    <template #default="{ state }">
      <SwitchThumb data-ui="switch-thumb" v-bind="thumbProps(thumbState(state.checked))">
        <slot name="thumb" v-bind="thumbState(state.checked)">
          <Icon
            v-if="thumbIcon(thumbState(state.checked))"
            data-ui="switch-icon"
            v-bind="iconProps(thumbState(state.checked))"
          />
        </slot>
      </SwitchThumb>
    </template>
  </SwitchRoot>
</template>
