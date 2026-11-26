<script setup lang="ts">
import {
  PasswordInputControl,
  PasswordInput as PasswordInputRoot,
  PasswordInputToggle,
} from '@ui-sdk/vue/password-input'
import { computed, useAttrs } from 'vue'
import { getColorVariables, getRadiusVariables, oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import { useFormField } from '@/components/FormField/context'
import { inputSizes, inputVariantNames } from '@/components/Input/constants'
import {
  inputIconVariants,
  inputLeadingVariants,
  inputRootVariants,
  inputTrailingVariants,
  inputVariants,
} from '@/components/Input/variants'
import { passwordDefaults } from '@/components/Password/constants'
import { passwordUiExclude } from '@/components/Password/exclude'
import type { PasswordEmits, PasswordProps, PasswordSlots } from '@/components/Password/types'
import {
  passwordToggleVariants,
  passwordTrailingPaddingVariants,
} from '@/components/Password/variants'
import Icon from '@/components/Icon/Icon.vue'
import { useLocale } from '@/i18n/useLocale'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<PasswordProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  visible: undefined,
  defaultVisible: undefined,
  autoComplete: passwordDefaults.autoComplete,
  name: undefined,
  form: undefined,
  variant: passwordDefaults.variant,
  color: passwordDefaults.color,
  size: undefined,
  radius: passwordDefaults.radius,
  highlight: false,
  disabled: undefined,
  readOnly: undefined,
  required: undefined,
})

const emit = defineEmits<PasswordEmits>()
const slots = defineSlots<PasswordSlots>()
const attrs = useAttrs()
const { t } = useLocale()
const formField = useFormField()

const size = computed(() =>
  oneOf(props.size ?? formField?.size(), inputSizes, passwordDefaults.size),
)
const hasLeading = computed(() => Boolean(props.icon || slots.leading))

const rootProps = computed(() => ({
  ...useUi({
    base: [
      {
        class: inputRootVariants(),
        style: [
          getColorVariables(props.color, 'input', passwordDefaults.color),
          getRadiusVariables(props.radius, 'input', passwordDefaults.radius),
        ],
      },
      { class: attrs.class, style: attrs.style },
    ],
    ui: props.ui?.root?.(),
    exclude: passwordUiExclude.root,
  }),
  modelValue: props.modelValue,
  defaultValue: props.defaultValue,
  'onUpdate:modelValue': (value: string) => emit('update:modelValue', value),
  visible: props.visible,
  defaultVisible: props.defaultVisible,
  'onUpdate:visible': (visible: boolean) => emit('update:visible', visible),
  autoComplete: props.autoComplete,
  name: props.name,
  form: props.form,
  disabled: props.disabled,
  readOnly: props.readOnly,
  required: props.required ?? formField?.required(),
}))

const inputProps = computed(() => {
  const rest = Object.fromEntries(
    Object.entries(attrs).filter(([key]) => key !== 'class' && key !== 'style'),
  )

  return {
    ...useUi({
      base: [
        {
          class: [
            inputVariants({
              size: size.value,
              variant: oneOf(props.variant, inputVariantNames, passwordDefaults.variant),
              highlight: props.highlight,
              leading: hasLeading.value,
              trailing: true,
            }),
            slots.trailing && passwordTrailingPaddingVariants({ size: size.value }),
          ],
        },
        rest,
      ],
      ui: props.ui?.input?.(),
      exclude: passwordUiExclude.input,
    }),
  }
})

const leadingProps = computed(() => ({ class: inputLeadingVariants({ size: size.value }) }))

const leadingIconProps = computed(() => ({
  ...useUi({
    base: { class: inputIconVariants() },
    ui: props.ui?.leadingIcon?.(),
    exclude: passwordUiExclude.leadingIcon,
  }),
  name: props.icon!,
}))

const trailingProps = computed(() => ({ class: inputTrailingVariants({ size: size.value }) }))

const toggleProps = computed(() =>
  useUi({
    base: {
      'aria-label': t('showPassword'),
      class: passwordToggleVariants({ size: size.value }),
    },
    ui: props.ui?.toggle?.(),
    exclude: passwordUiExclude.toggle,
  }),
)

function toggleIconProps(visible: boolean) {
  return {
    ...useUi({
      base: { class: 'size-full' },
      ui: props.ui?.toggleIcon?.(),
      exclude: passwordUiExclude.toggleIcon,
    }),
    name: visible ? ('eyeOff' as const) : ('eye' as const),
  }
}
</script>

<template>
  <PasswordInputRoot data-ui="password-root" v-bind="rootProps">
    <template #default="{ state }">
      <span v-if="hasLeading" data-ui="password-leading" v-bind="leadingProps">
        <slot name="leading">
          <Icon v-if="icon" data-ui="password-leading-icon" v-bind="leadingIconProps" />
        </slot>
      </span>
      <PasswordInputControl data-ui="password-input" v-bind="inputProps" />
      <span data-ui="password-trailing" v-bind="trailingProps">
        <slot name="trailing" v-bind="{ visible: state.visible, capsLock: state.capsLock }" />
        <PasswordInputToggle data-ui="password-toggle" v-bind="toggleProps">
          <slot name="iconToggle" :visible="state.visible">
            <Icon data-ui="password-toggle-icon" v-bind="toggleIconProps(state.visible)" />
          </slot>
        </PasswordInputToggle>
      </span>
    </template>
  </PasswordInputRoot>
</template>
