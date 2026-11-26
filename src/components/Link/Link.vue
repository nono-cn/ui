<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  mergeProps,
  useAttrs,
  type Component,
  type FunctionalComponent,
} from 'vue'
import { cn } from '@/composables/cn'
import { getColorVariables, getRadiusVariables, oneOf } from '@/composables/useTheme'
import { useUi } from '@/composables/useUi'
import { buttonSizes, buttonVariantNames } from '@/components/Button/constants'
import {
  buttonIconVariants,
  buttonLeadingVariants,
  buttonTrailingVariants,
  buttonVariants,
} from '@/components/Button/variants'
import { linkDefaults } from '@/components/Link/constants'
import { linkUiExclude } from '@/components/Link/exclude'
import type { LinkProps, LinkSlots } from '@/components/Link/types'
import { linkIconSlotVariants, linkVariants } from '@/components/Link/variants'
import Icon from '@/components/Icon/Icon.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<LinkProps>(), {
  to: undefined,
  external: undefined,
  variant: undefined,
  color: linkDefaults.color,
  size: linkDefaults.size,
  radius: linkDefaults.radius,
  square: undefined,
})

const slots = defineSlots<LinkSlots>()
const attrs = useAttrs()

interface RouterLinkScope {
  href?: string
  navigate?: (event: MouseEvent) => unknown
  isActive?: boolean
  isExactActive?: boolean
}

const PlainLink: FunctionalComponent = (_, context) => context.slots.default?.({})
PlainLink.inheritAttrs = false

const RouterLink = getCurrentInstance()?.appContext.components.RouterLink as Component | undefined

const external = computed(
  () =>
    props.external ?? (typeof props.to === 'string' && /^([a-z][\w+.-]*:|\/\/)/i.test(props.to)),
)

const routed = computed(
  () => Boolean(RouterLink) && props.to !== undefined && !props.href && !external.value,
)

const variant = computed(() =>
  props.variant === undefined ? undefined : oneOf(props.variant, buttonVariantNames, 'link'),
)
const size = computed(() => oneOf(props.size, buttonSizes, linkDefaults.size))
const hasLeading = computed(() => Boolean(props.icon || slots.leading))
const hasTrailing = computed(() => Boolean(props.trailingIcon || slots.trailing))
const hasLabel = computed(() => Boolean(props.label || slots.default))
const square = computed(
  () => props.square ?? (!hasLabel.value && (hasLeading.value || hasTrailing.value)),
)

const baseProps = computed(() =>
  variant.value
    ? {
        class: cn(
          'no-underline',
          buttonVariants({
            size: size.value,
            variant: variant.value,
            block: props.block,
            square: square.value,
          }),
        ),
        style: [
          getColorVariables(props.color, 'button', linkDefaults.color),
          getRadiusVariables(props.radius, 'button', linkDefaults.radius),
        ],
      }
    : {
        class: linkVariants(),
        style: getColorVariables(props.color, 'link', linkDefaults.color),
      },
)

const leadingProps = computed(() => ({
  class: variant.value ? buttonLeadingVariants({ size: size.value }) : linkIconSlotVariants(),
}))

const trailingProps = computed(() => ({
  class: variant.value ? buttonTrailingVariants({ size: size.value }) : linkIconSlotVariants(),
}))

const labelProps = computed(() =>
  useUi({
    base: {},
    ui: props.ui?.label?.(),
    exclude: linkUiExclude.label,
  }),
)

const leadingIconProps = computed(() => ({
  ...useUi({
    base: { class: buttonIconVariants() },
    ui: props.ui?.leadingIcon?.(),
    exclude: linkUiExclude.leadingIcon,
  }),
  name: props.icon!,
}))

const trailingIconProps = computed(() => ({
  ...useUi({
    base: { class: buttonIconVariants() },
    ui: props.ui?.trailingIcon?.(),
    exclude: linkUiExclude.trailingIcon,
  }),
  name: props.trailingIcon!,
}))

function rootProps(link: RouterLinkScope) {
  const active = props.exact ? link.isExactActive : link.isActive
  const base = {
    ...baseProps.value,
    href: props.href ?? link.href ?? (typeof props.to === 'string' ? props.to : undefined),
    'aria-disabled': props.disabled ? 'true' : undefined,
    tabindex: props.disabled ? -1 : undefined,
    'data-disabled': props.disabled ? '' : undefined,
    'data-active': active ? '' : undefined,
  }
  return mergeProps(
    useUi({ base: [base, attrs], ui: props.ui?.root?.(), exclude: linkUiExclude.root }),
    {
      onClick: (event: MouseEvent) => {
        if (props.disabled) event.preventDefault()
        else link.navigate?.(event)
      },
    },
  )
}
</script>

<template>
  <component
    :is="routed ? RouterLink : PlainLink"
    v-slot="link: RouterLinkScope"
    custom
    :to="to"
    :replace="replace"
  >
    <a data-ui="link-root" v-bind="rootProps(link)">
      <span v-if="hasLeading" data-ui="link-leading" v-bind="leadingProps">
        <slot name="leading">
          <Icon v-if="icon" data-ui="link-leading-icon" v-bind="leadingIconProps" />
        </slot>
      </span>
      <span v-if="hasLabel" data-ui="link-label" v-bind="labelProps">
        <slot>{{ label }}</slot>
      </span>
      <span v-if="hasTrailing" data-ui="link-trailing" v-bind="trailingProps">
        <slot name="trailing">
          <Icon v-if="trailingIcon" data-ui="link-trailing-icon" v-bind="trailingIconProps" />
        </slot>
      </span>
    </a>
  </component>
</template>
