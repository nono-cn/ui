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
import { passwordInputDefaults } from '@/components/PasswordInput/constants'
import type {
  PasswordInputEmits,
  PasswordInputProps,
  PasswordInputSlots,
} from '@/components/PasswordInput/types'
import {
  passwordInputToggleVariants,
  passwordInputTrailingPaddingVariants,
} from '@/components/PasswordInput/variants'
import Icon from '@/components/Icon/Icon.vue'
import { useLocale } from '@/i18n/useLocale'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<PasswordInputProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  visible: undefined,
  defaultVisible: undefined,
  autoComplete: passwordInputDefaults.autoComplete,
  name: undefined,
  form: undefined,
  placeholder: undefined,
  variant: passwordInputDefaults.variant,
  color: passwordInputDefaults.color,
  size: undefined,
  radius: passwordInputDefaults.radius,
  toggleLabel: undefined,
  highlight: false,
  disabled: undefined,
  readOnly: undefined,
  required: undefined,
})

const emit = defineEmits<PasswordInputEmits>()
const slots = defineSlots<PasswordInputSlots>()
const attrs = useAttrs()
const { t } = useLocale()
const formField = useFormField()

const size = computed(() =>
  oneOf(props.size ?? formField?.size(), inputSizes, passwordInputDefaults.size),
)
const hasLeading = computed(() => Boolean(props.icon || slots.leading))

const rootProps = computed(() => ({
  ...useUi(
    [
      {
        class: inputRootVariants(),
        style: [
          getColorVariables(props.color, 'input', passwordInputDefaults.color),
          getRadiusVariables(props.radius, 'input', passwordInputDefaults.radius),
        ],
      },
      { class: attrs.class, style: attrs.style },
    ],
    props.ui?.root?.(),
  ),
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
    ...useUi(
      [
        {
          placeholder: props.placeholder,
          class: [
            inputVariants({
              size: size.value,
              variant: oneOf(props.variant, inputVariantNames, passwordInputDefaults.variant),
              highlight: props.highlight,
              leading: hasLeading.value,
              trailing: true,
            }),
            slots.trailing && passwordInputTrailingPaddingVariants({ size: size.value }),
          ],
        },
        rest,
      ],
      props.ui?.input?.(),
    ),
  }
})

const leadingProps = computed(() =>
  useUi({ class: inputLeadingVariants({ size: size.value }) }, props.ui?.leading?.()),
)

const leadingIconProps = computed(() => ({
  ...useUi({ class: inputIconVariants() }, props.ui?.leadingIcon?.()),
  name: props.icon!,
}))

const trailingProps = computed(() =>
  useUi({ class: inputTrailingVariants({ size: size.value }) }, props.ui?.trailing?.()),
)

const toggleProps = computed(() =>
  useUi(
    {
      'aria-label': props.toggleLabel || t('showPassword'),
      class: passwordInputToggleVariants({ size: size.value }),
    },
    props.ui?.toggle?.(),
  ),
)

function toggleIconProps(visible: boolean) {
  return {
    ...useUi({ class: 'size-full' }, props.ui?.toggleIcon?.()),
    name: visible ? ('eyeOff' as const) : ('eye' as const),
  }
}
</script>

<template>
  <PasswordInputRoot data-ui="password-input-root" v-bind="rootProps">
    <template #default="{ state }">
      <span v-if="hasLeading" data-ui="password-input-leading" v-bind="leadingProps">
        <slot name="leading">
          <Icon v-if="icon" data-ui="password-input-leading-icon" v-bind="leadingIconProps" />
        </slot>
      </span>
      <PasswordInputControl data-ui="password-input-input" v-bind="inputProps" />
      <span data-ui="password-input-trailing" v-bind="trailingProps">
        <slot name="trailing" v-bind="{ visible: state.visible, capsLock: state.capsLock }" />
        <PasswordInputToggle data-ui="password-input-toggle" v-bind="toggleProps">
          <slot name="iconToggle" :visible="state.visible">
            <Icon data-ui="password-input-toggle-icon" v-bind="toggleIconProps(state.visible)" />
          </slot>
        </PasswordInputToggle>
      </span>
    </template>
  </PasswordInputRoot>
</template>
