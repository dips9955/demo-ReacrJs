import { useEffect, useState } from 'react'
import { readStorage, writeStorage } from '../utils/storage'

export function useLocalStorageState<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    const fallback = typeof initialValue === 'function'
      ? (initialValue as () => T)()
      : initialValue
    return readStorage(key, fallback)
  })

  useEffect(() => {
    writeStorage(key, value)
  }, [key, value])

  return [value, setValue] as const
}
