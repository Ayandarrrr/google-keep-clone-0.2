import { useState, useEffect } from 'react'

// Custom hook: keeps a piece of state in sync with localStorage.
// Every note, pin, color, and the theme all persist through this hook
// so a refresh never loses the board.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch (err) {
      console.warn(`Could not read localStorage key "${key}":`, err)
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.warn(`Could not write localStorage key "${key}":`, err)
    }
  }, [key, value])

  return [value, setValue]
}
