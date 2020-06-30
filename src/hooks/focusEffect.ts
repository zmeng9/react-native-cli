import { useCallback } from 'react'
import { useFocusEffect as useRnFocusEffect, useIsFocused } from '@react-navigation/native'


/* 
 * Use foucus effect
 */


export const useFocusEffect = (fn: () => any, deps: Array<any> = []) => {
  useRnFocusEffect(
    useCallback(fn, deps)
  )
}

export {
  useIsFocused,
}