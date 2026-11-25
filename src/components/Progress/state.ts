import type {
  ProgressState as SdkState,
  ProgressValueState as SdkValueState,
} from '@ui-sdk/core/progress'
import type { ProgressState, ProgressValueState } from '@/components/Progress/types'

// ui-sdk hands state as a Proxy that reads keys on access, so spreading it copies nothing.
export function toProgressState(state: SdkState, min: number, max: number): ProgressState {
  return { value: state.value, percent: state.percent, status: state.status, min, max }
}

export function toProgressValueState(
  state: SdkValueState,
  min: number,
  max: number,
): ProgressValueState {
  return { ...toProgressState(state, min, max), text: state.text }
}
