import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines classes using clsx and merges Tailwind classes cleanly
 * using tailwind-merge to avoid override conflicts.
 * 
 * @param {...ClassValue} inputs - Tailwind classes or conditional expressions
 * @returns {string} - Merged class string
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
