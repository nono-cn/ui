import type { ChangeDetails } from '@ui-sdk/core'
import type { ToggleGroupController, ToggleGroupValueChangeReason } from '@ui-sdk/core/toggle'
import type { toggleGroupOrientations } from '@/components/ToggleGroup/constants'
import type { ToggleProps, ToggleSize, ToggleVariant } from '@/components/Toggle/types'
import type { Radius } from '@/composables/useTheme'
import type { UiResolver } from '@/composables/useUi'

export type ToggleGroupOrientation = (typeof toggleGroupOrientations)[number]

export type ToggleGroupValueChangeDetails = ChangeDetails<ToggleGroupValueChangeReason>

export interface ToggleGroupItem extends Pick<
  ToggleProps,
  'label' | 'icon' | 'trailingIcon' | 'square' | 'disabled'
> {
  value: string
}

export interface ToggleGroupItemState {
  item: ToggleGroupItem
  index: number
  pressed: boolean
  disabled: boolean
}

export interface ToggleGroupUi {
  root?: UiResolver
  item?: UiResolver<ToggleGroupItemState>
}

export interface ToggleGroupProps {
  items?: ToggleGroupItem[]
  modelValue?: string[]
  defaultValue?: string[]
  multiple?: boolean
  deselectable?: boolean
  disabled?: boolean
  orientation?: ToggleGroupOrientation
  loop?: boolean
  attached?: boolean
  variant?: ToggleVariant
  activeVariant?: ToggleVariant
  color?: string
  activeColor?: string
  size?: ToggleSize
  radius?: Radius
  ui?: ToggleGroupUi
}

export interface ToggleGroupEmits {
  'update:modelValue': [value: string[]]
  valueChange: [value: string[], details: ToggleGroupValueChangeDetails]
}

export interface ToggleGroupSlots {
  item?(props: ToggleGroupItemState): unknown
}

export type ToggleGroupExpose = Pick<
  ToggleGroupController,
  'getValue' | 'setValue' | 'isPressed' | 'toggle' | 'focus'
>
