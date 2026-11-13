export type UiResolver<T, C> = (context: C) => T

export function useUi<T extends object, C>(resolver: UiResolver<T, C> | undefined, context: C): T {
  return resolver?.(context) ?? ({} as T)
}
