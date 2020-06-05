import { useEffect } from './effect'


/* 
 * Reset the fields when unmount 
 */

export const useResetFields = (fns: Array<() => void>, isFocus: boolean = false) => {
  useEffect(() => {
    if (isFocus)
      fns.forEach(fn => fn())
    else
      return () => fns.forEach(fn => fn())
  })
}