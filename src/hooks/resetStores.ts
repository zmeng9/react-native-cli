import { useEffect } from './effect'


/* 
 * Reset the state when unmount 
 */

export const useResetStores = (stores: any, isFocus: boolean = false) => {
  useEffect(() => {
    const resetStores = () => {
      if (Array.isArray(stores))
        stores.map(item => item.reset())
      else
        stores.reset()
    }

    if (isFocus)
      resetStores()
    else 
      return resetStores
  })
}