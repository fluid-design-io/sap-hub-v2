type GetDefaultValueProps<T> = T | (() => T) | undefined

export const getDefaultValue = <T extends string | boolean>(
  value: GetDefaultValueProps<T>
): T | undefined => {
  if (!value) return undefined
  // Check if value is a function and call it if so
  const resolvedValue = typeof value === 'function' ? value() : value

  // Type guard to check if the resolved value is a string or boolean
  if (typeof resolvedValue === 'string' || typeof resolvedValue === 'boolean') {
    return resolvedValue
  }

  return undefined
}

/**
 * Transforms snake_case and breaks _ into spaces
 * @param str
 * @example
 * snakeToTitle('hello_world') // 'Hello world'
 */
export const snakeToTitle = (str: string) =>
  str
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce(
    (result, key) => {
      if (obj.hasOwnProperty(key)) {
        result[key] = obj[key]
      }
      return result
    },
    {} as Pick<T, K>
  )
}
