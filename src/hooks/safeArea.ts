import { useSafeArea as useRnSafeArea } from 'react-native-safe-area-context'


/* 
 * safe area hook
 */

export const useSafeArea = () => {
  return useRnSafeArea()
}