import { useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'


/* 
 * Use foucus effect
 */


export const useEffect = (fn: () => any, deps: Array<any> = []) => {
  useFocusEffect(
    useCallback(fn, deps)
  )
}