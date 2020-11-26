export default function getOrDefault<T>(field: T | undefined, defaultValue: T): T {
  return typeof field !== 'undefined' ? field : defaultValue
}
