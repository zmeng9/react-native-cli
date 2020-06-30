import { useFocusEffect } from './focusEffect'


/* 
 * Reset the state when unmount 
 */


export const useResetStores = (stores: any, isFocus: boolean = false) => {
  const resetStores = () => {
    if (Array.isArray(stores))
      stores.map(item => item.reset())
    else
      stores.reset()
  }

  useFocusEffect(() => {
    if (isFocus)
      resetStores()
    else
      return resetStores
  })
}