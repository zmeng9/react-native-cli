import { useRef, useCallback } from 'react'
import { useFocusEffect } from './focusEffect'

/* 
 * The memoize useCallback
 */


export const useEcb = (fn: (...args: any) => void, deps: Array<any>) => {
  const ref: any = useRef(() => {
    throw new Error('Cannot call an event handler while rendering.')
  })

  useFocusEffect(() => {
    ref.current = fn
  }, [fn, ...deps])

  return useCallback((...args: any) => {
    const fn = ref.current
    return fn(...args)
  }, [ref])
}