import { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext.jsx'

/**
 * Custom hook to consume the ThemeContext safely.
 * 
 * @returns {{ theme: 'light'|'dark', toggleTheme: Function, isDark: boolean }}
 */
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
