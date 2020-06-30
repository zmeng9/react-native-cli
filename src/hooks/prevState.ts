import { useRef } from 'react'
import { useFocusEffect } from './focusEffect'


/* 
 * Use prev state hook
 */


export const usePrevState = <T>(
  value: T,
  deps: Array<any> = [],
): T => {
  const ref: any = useRef()

  useFocusEffect(() => {
    ref.current = value
  }, deps)
  
  return ref.current
}