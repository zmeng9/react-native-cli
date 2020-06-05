import { useHeaderHeight as useRnHeaderHeight } from '@react-navigation/stack'
import { useStores } from '@/hooks'


/* 
 * Header height hook
 */


export const useHeaderHeight = () => {
  const headerHeight = useRnHeaderHeight()
  const { globalStore } = useStores()

  const { setHeaderHeight } = globalStore

  // Set headerHeight
  setHeaderHeight(headerHeight)
}