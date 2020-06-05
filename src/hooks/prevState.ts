import { useRef } from 'react'
import { useEffect } from './effect'


/* 
 * Use prev state hook
 */


export const usePrevState = <T>(
  value: T,
  deps: Array<any> = [],
): T => {
  const ref: any = useRef()
  useEffect(() => {
    ref.current = value
  }, deps)
  return ref.current
}