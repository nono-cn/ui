import type { PreferenceLike } from '@ui-sdk/core'
import type { ButtonProps } from '@/components/Button/types'

export type ButtonAppDefaults = Omit<ButtonProps, 'label' | 'disabled' | 'onClick'>

export interface AppDefaults {
  button?: ButtonAppDefaults
}

export interface AppProps {
  preferences?: readonly PreferenceLike[]
  defaults?: AppDefaults
  nonce?: string
}

export interface AppSlots {
  default?(): unknown
}
