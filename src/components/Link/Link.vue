<script setup lang="ts">
import {
  computed,
  getCurrentInstance,
  useAttrs,
  type Component,
  type FunctionalComponent,
} from 'vue'
import { cn, type ClassValue } from '@/composables/cn'
import type { UiAttributes, UiResolver } from '@/composables/useUi'
import type { ButtonUi } from '@/components/Button/types'
import { linkDefaults } from '@/components/Link/constants'
import type { LinkProps, LinkSlots } from '@/components/Link/types'
import { linkIconSlotClass, linkVariants } from '@/components/Link/variants'
import Button from '@/components/Button/Button.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<LinkProps>(), {
  to: undefined,
  external: undefined,
  variant: undefined,
  color: linkDefaults.color,
  size: linkDefaults.size,
  radius: linkDefaults.radius,
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

const inline = computed(() => props.variant === undefined)

function withIconSlot(resolver?: UiResolver): UiResolver {
  return () => {
    const ui = resolver?.() ?? {}
    return { ...ui, class: cn(linkIconSlotClass, ui.class as ClassValue) }
  }
}

const ui = computed<ButtonUi | undefined>(() =>
  inline.value
    ? {
        ...props.ui,
        leading: withIconSlot(props.ui?.leading),
        trailing: withIconSlot(props.ui?.trailing),
      }
    : props.ui,
)

function rootClass(buttonClass: unknown): string {
  if (!inline.value) return cn(buttonClass as ClassValue)
  const rootUi: UiAttributes = props.ui?.root?.() ?? {}
  return cn(linkVariants(), attrs.class as ClassValue, rootUi.class as ClassValue)
}

function buttonProps(link: RouterLinkScope) {
  const active = props.exact ? link.isExactActive : link.isActive
  const { navigate } = link
  return {
    ...attrs,
    label: props.label,
    variant: props.variant ?? 'link',
    color: props.color,
    size: props.size,
    radius: props.radius,
    leadingIcon: props.leadingIcon,
    trailingIcon: props.trailingIcon,
    block: props.block,
    disabled: props.disabled,
    ui: ui.value,
    onClick: navigate
      ? (event: MouseEvent) => {
          navigate(event)
        }
      : undefined,
    'data-active': active ? '' : undefined,
  }
}

function anchorProps(link: RouterLinkScope) {
  return {
    href: props.href ?? link.href ?? (typeof props.to === 'string' ? props.to : undefined),
    target: props.target,
    rel: props.target === '_blank' ? 'noopener noreferrer' : undefined,
  }
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
    <Button v-bind="buttonProps(link)">
      <template v-if="slots.leading" #leading><slot name="leading" /></template>
      <template v-if="slots.default" #default><slot /></template>
      <template v-if="slots.trailing" #trailing><slot name="trailing" /></template>
      <template #render="{ props: buttonAttrs, children }">
        <a v-bind="{ ...buttonAttrs, ...anchorProps(link), class: rootClass(buttonAttrs.class) }">
          <component :is="children" />
        </a>
      </template>
    </Button>
  </component>
</template>
