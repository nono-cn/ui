<script setup lang="ts">
import type { ToggleGroupState } from '@ui-sdk/core/toggle'
import { createToggleGroupController, ToggleGroup as ToggleGroupRoot } from '@ui-sdk/vue/toggle'
import { computed, useAttrs } from 'vue'
import { oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import { toggleGroupDefaults, toggleGroupOrientations } from '@/components/ToggleGroup/constants'
import type {
  ToggleGroupEmits,
  ToggleGroupExpose,
  ToggleGroupItemState,
  ToggleGroupProps,
  ToggleGroupSlots,
  ToggleGroupValueChangeDetails,
} from '@/components/ToggleGroup/types'
import { toggleGroupVariants } from '@/components/ToggleGroup/variants'
import Toggle from '@/components/Toggle/Toggle.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ToggleGroupProps>(), {
  items: () => [],
  modelValue: undefined,
  defaultValue: undefined,
  multiple: undefined,
  deselectable: undefined,
  disabled: undefined,
  orientation: toggleGroupDefaults.orientation,
  loop: undefined,
  attached: toggleGroupDefaults.attached,
})

const emit = defineEmits<ToggleGroupEmits>()
const slots = defineSlots<ToggleGroupSlots>()
const attrs = useAttrs()
const controller = createToggleGroupController()

const orientation = computed(() =>
  oneOf(props.orientation, toggleGroupOrientations, toggleGroupDefaults.orientation),
)

const rootProps = computed(() => ({
  ...useUi({
    base: [
      { class: toggleGroupVariants({ orientation: orientation.value, attached: props.attached }) },
      attrs,
    ],
    ui: props.ui?.root?.(),
  }),
  value: props.modelValue,
  defaultValue: props.defaultValue,
  'onUpdate:value': (value: string[]) => emit('update:modelValue', value),
  onValueChange: (value: string[], details: ToggleGroupValueChangeDetails) =>
    emit('valueChange', value, details),
  multiple: props.multiple,
  deselectable: props.deselectable,
  disabled: props.disabled,
  orientation: orientation.value,
  loop: props.loop,
  controller,
}))

function itemStates(state: ToggleGroupState<string>): ToggleGroupItemState[] {
  return props.items.map((item, index) => ({
    item,
    index,
    pressed: state.value.includes(item.value),
    disabled: Boolean(state.disabled || item.disabled),
  }))
}

function itemProps(itemState: ToggleGroupItemState) {
  const { item } = itemState

  return {
    ...useUi({ base: {}, ui: props.ui?.item?.(itemState) }),
    value: item.value,
    label: item.label,
    icon: item.icon,
    trailingIcon: item.trailingIcon,
    square: item.square,
    disabled: item.disabled,
    variant: props.variant,
    activeVariant: props.activeVariant,
    color: props.color,
    activeColor: props.activeColor,
    size: props.size,
    radius: props.radius,
  }
}

defineExpose<ToggleGroupExpose>({
  getValue: () => controller.getValue(),
  setValue: (value, options) => controller.setValue(value, options),
  isPressed: (value) => controller.isPressed(value),
  toggle: (value, options) => controller.toggle(value, options),
  focus: (value) => controller.focus(value),
})
</script>

<template>
  <ToggleGroupRoot data-ui="toggle-group-root" v-bind="rootProps">
    <template #default="{ state }">
      <Toggle
        v-for="itemState in itemStates(state)"
        :key="itemState.item.value"
        data-ui="toggle-group-item"
        v-bind="itemProps(itemState)"
      >
        <template v-if="slots.item" #default>
          <slot name="item" v-bind="itemState" />
        </template>
      </Toggle>
    </template>
  </ToggleGroupRoot>
</template>
