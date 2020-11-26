/* eslint-disable @typescript-eslint/no-empty-function */
export function supportSSR<T>(value: () => T, SSRValue: T): T {
  return typeof window !== 'undefined' ? value() : SSRValue
}
