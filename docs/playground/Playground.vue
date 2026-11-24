<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  Badge,
  Button,
  FormField,
  Icon,
  Label,
  PasswordInput,
  inputSizes,
  inputVariantNames,
  themeColors,
  type PasswordInputUi,
} from '@nono/ui'
import { dark } from '@docs/components/useDocsTheme'

const radii = ['none', 'sm', 'md', 'lg', 'full', 0, 12, '1.5rem'] as const

const password = ref('')
const visible = ref(false)
const visibleLog = ref<string[]>([])

const strengthPassword = ref('')
const strength = computed(() => {
  const value = strengthPassword.value
  let score = 0
  if (value.length >= 8) score++
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++
  if (/\d/.test(value)) score++
  if (/[^A-Za-z0-9]/.test(value)) score++
  return score
})
const strengthLabel = computed(
  () => ['Too short', 'Weak', 'Fair', 'Good', 'Strong'][strength.value],
)
const strengthColor = computed(
  () => (['error', 'error', 'warning', 'info', 'success'] as const)[strength.value],
)

const confirm = ref('')
const confirmError = computed(() =>
  confirm.value && confirm.value !== strengthPassword.value ? 'Passwords do not match' : undefined,
)

const submitted = ref<string | null>(null)
function onSubmit(event: Event) {
  const data = new FormData(event.target as HTMLFormElement)
  submitted.value = JSON.stringify(Object.fromEntries(data))
}

const styled: PasswordInputUi = {
  root: () => ({ class: 'shadow-sm' }),
  input: () => ({ class: 'font-mono tracking-widest' }),
  toggle: () => ({ class: 'text-primary' }),
  toggleIcon: () => ({ class: 'stroke-[2.5]' }),
}

function onVisible(value: boolean) {
  visibleLog.value = [`update:visible → ${value}`, ...visibleLog.value].slice(0, 5)
}
</script>

<template>
  <main class="mx-auto flex max-w-3xl flex-col gap-8 p-8 text-foreground">
    <header class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">Playground</h1>
      <Button variant="outline" size="sm" :label="dark ? 'Light' : 'Dark'" @click="dark = !dark" />
    </header>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">PasswordInput · basic, v-model and defaultValue</h2>
      <PasswordInput v-model="password" placeholder="Password" />
      <p class="text-sm text-muted-foreground">modelValue: {{ password || '—' }}</p>
      <PasswordInput default-value="correct horse" placeholder="Uncontrolled" />
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">PasswordInput · variants</h2>
      <div class="grid grid-cols-2 gap-2">
        <PasswordInput
          v-for="variant in inputVariantNames"
          :key="variant"
          :variant="variant"
          :placeholder="variant"
        />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">PasswordInput · colors (focus) and highlight</h2>
      <div class="grid grid-cols-2 gap-2">
        <PasswordInput
          v-for="color in themeColors"
          :key="color"
          :color="color"
          :placeholder="color"
        />
        <PasswordInput color="#6366f1" placeholder="#6366f1" />
      </div>
      <div class="grid grid-cols-2 gap-2">
        <PasswordInput
          v-for="color in themeColors"
          :key="color"
          :color="color"
          highlight
          :placeholder="`${color} highlight`"
        />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">PasswordInput · sizes with icon</h2>
      <PasswordInput
        v-for="size in inputSizes"
        :key="size"
        :size="size"
        icon="lock"
        :placeholder="size"
        default-value="secret"
      />
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">PasswordInput · radius</h2>
      <div class="grid grid-cols-2 gap-2">
        <PasswordInput
          v-for="radius in radii"
          :key="radius"
          :radius="radius"
          :placeholder="`radius ${radius}`"
        />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">PasswordInput · variants × states</h2>
      <div v-for="variant in inputVariantNames" :key="variant" class="grid grid-cols-3 gap-2">
        <PasswordInput :variant="variant" :placeholder="`${variant}`" icon="lock" />
        <PasswordInput :variant="variant" default-value="read only" read-only icon="lock" />
        <PasswordInput :variant="variant" placeholder="disabled" disabled icon="lock" />
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">PasswordInput · visibility</h2>
      <PasswordInput default-value="shown at first" default-visible />
      <div class="flex items-center gap-2">
        <PasswordInput
          v-model:visible="visible"
          default-value="controlled"
          class="flex-1"
          @update:visible="onVisible"
        />
        <Button variant="outline" :label="visible ? 'Hide' : 'Show'" @click="visible = !visible" />
      </div>
      <p class="text-sm text-muted-foreground">visible: {{ visible }}</p>
      <ul class="text-xs text-muted-foreground">
        <li v-for="(entry, index) in visibleLog" :key="index">{{ entry }}</li>
      </ul>
      <PasswordInput :visible="true" default-value="always visible (no v-model)" />
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">PasswordInput · leading slot</h2>
      <PasswordInput placeholder="Icon prop" icon="lock" />
      <PasswordInput placeholder="Custom leading">
        <template #leading>
          <Icon name="user" class="size-4 text-primary" />
        </template>
      </PasswordInput>
      <PasswordInput placeholder="Text leading">
        <template #leading>
          <span class="text-xs font-medium text-muted-foreground">PIN</span>
        </template>
      </PasswordInput>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">PasswordInput · trailing slot (caps lock, visible state)</h2>
      <PasswordInput placeholder="Turn Caps Lock on while focused">
        <template #trailing="{ capsLock }">
          <Badge v-if="capsLock" size="sm" variant="soft" color="warning" label="Caps" />
        </template>
      </PasswordInput>
      <PasswordInput default-value="secret" placeholder="Shows the state">
        <template #trailing="{ visible: isVisible }">
          <span class="text-xs text-muted-foreground">{{ isVisible ? 'shown' : 'hidden' }}</span>
        </template>
      </PasswordInput>
      <div v-for="size in inputSizes" :key="size" class="flex">
        <PasswordInput :size="size" icon="lock" default-value="trailing padding" class="flex-1">
          <template #trailing>
            <Icon name="warning" class="size-4 text-warning" />
          </template>
        </PasswordInput>
      </div>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">PasswordInput · iconToggle slot and toggleLabel</h2>
      <PasswordInput default-value="secret" toggle-label="Reveal">
        <template #iconToggle="{ visible: isVisible }">
          <Icon :name="isVisible ? 'x' : 'search'" class="size-full" />
        </template>
      </PasswordInput>
      <PasswordInput default-value="secret" :ui="{ toggle: () => ({ class: 'w-auto px-1' }) }">
        <template #iconToggle="{ visible: isVisible }">
          <span class="text-xs font-medium">{{ isVisible ? 'Hide' : 'Show' }}</span>
        </template>
      </PasswordInput>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">PasswordInput · ui and attrs</h2>
      <PasswordInput default-value="styled via ui" :ui="styled" />
      <PasswordInput
        id="attrs-password"
        placeholder="class, style, aria and data attrs"
        class="max-w-xs"
        style="opacity: 0.9"
        aria-describedby="attrs-hint"
        data-test="attrs"
        maxlength="12"
      />
      <p id="attrs-hint" class="text-xs text-muted-foreground">maxlength 12, id on the input</p>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">PasswordInput · Label and FormField</h2>
      <div class="flex flex-col gap-1">
        <Label for="label-password" label="With Label" />
        <PasswordInput id="label-password" placeholder="Password" />
      </div>
      <FormField label="Current password" hint="Required" required>
        <PasswordInput placeholder="Inherits required" />
      </FormField>
      <FormField label="Large field" description="Size comes from the FormField" size="lg">
        <PasswordInput icon="lock" placeholder="lg" />
      </FormField>
      <FormField label="Invalid" error="Wrong password">
        <PasswordInput default-value="wrong" />
      </FormField>
      <FormField label="Disabled field" disabled>
        <PasswordInput placeholder="Disabled by FormField" />
      </FormField>
      <FormField label="Horizontal" orientation="horizontal">
        <PasswordInput placeholder="Password" />
      </FormField>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">PasswordInput · sign up (strength and confirm)</h2>
      <FormField label="New password" :description="strengthLabel">
        <PasswordInput
          v-model="strengthPassword"
          auto-complete="new-password"
          placeholder="At least 8 characters"
          :color="strengthColor"
          :highlight="strengthPassword.length > 0"
        >
          <template #trailing="{ capsLock }">
            <Badge v-if="capsLock" size="sm" variant="soft" color="warning" label="Caps" />
          </template>
        </PasswordInput>
      </FormField>
      <div class="flex gap-1">
        <span
          v-for="step in 4"
          :key="step"
          class="h-1 flex-1 rounded-full"
          :class="step <= strength ? 'bg-primary' : 'bg-muted'"
        />
      </div>
      <FormField label="Confirm password" :error="confirmError">
        <PasswordInput v-model="confirm" auto-complete="new-password" />
      </FormField>
    </section>

    <section class="flex flex-col gap-3">
      <h2 class="font-medium">PasswordInput · native form (name, required, reset hides)</h2>
      <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
        <PasswordInput name="password" required default-value="initial" placeholder="Required" />
        <PasswordInput name="pin" auto-complete="off" placeholder="PIN (off)" />
        <div class="flex gap-2">
          <Button type="submit" label="Submit" />
          <Button type="reset" variant="outline" label="Reset" />
        </div>
      </form>
      <form id="outside-form" @submit.prevent="onSubmit">
        <Button type="submit" variant="outline" label="Submit outside form" />
      </form>
      <PasswordInput name="outside" form="outside-form" placeholder="Belongs to #outside-form" />
      <p class="text-sm text-muted-foreground">submitted: {{ submitted ?? '—' }}</p>
    </section>
  </main>
</template>
