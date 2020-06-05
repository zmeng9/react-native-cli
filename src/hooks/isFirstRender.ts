import { useRef } from "react"
import { useEffect } from './effect'


/* 
 * Use first render hook
 */

export const useIsFirstRender = () => {
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender)
      isFirstRender.current = false
  }, [isFirstRender])

  return isFirstRender.current
}