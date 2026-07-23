import { createContext, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

export const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
  isDark: true
})

/**
 * Provider component to wrap the application and expose theme state.
 * Leverages React 19 `<Context>` syntax directly.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('linguamate-theme', () => {
    if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      return prefersDark ? 'dark' : 'light'
    }
    return 'dark'
  })

  // Apply or remove 'dark' class on HTML tag for Tailwind dark: modifiers
  useEffect(() => {
    const root = window.document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  const contextValue = {
    theme,
    toggleTheme,
    isDark: theme === 'dark'
  }

  return (
    <ThemeContext value={contextValue}>
      {children}
    </ThemeContext>
  )
}
