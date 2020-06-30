import { useFocusEffect } from './focusEffect'
import { useStores } from './stores'



/* 
 * Reset the fields when unmount 
 */

export const useResetFields = (fns: Array<() => void>, isFocus: boolean = false) => {
  useFocusEffect(() => {
    if (isFocus)
      fns.forEach(fn => fn())
    else
      return () => fns.forEach(fn => fn())
  })
}

export const useResetWsResult = () => {
  const { globalStore } = useStores()
  const { setLibwalletResult, setTransponderResult } = globalStore

  useFocusEffect(() => {
    return () => {
      setLibwalletResult(null)
      setTransponderResult(null)
    }
  }, [])
}