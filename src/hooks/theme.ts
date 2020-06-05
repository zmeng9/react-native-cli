import React from 'react'
import { ThemeContext } from '@/themes'


/* 
 * Theme hook
 */

export const useTheme = () => {
  const theme = React.useContext(ThemeContext)

  if (!theme)
    throw new Error('useTheme must be used within a themeProvider')

  return theme
}