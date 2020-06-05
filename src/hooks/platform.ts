import { Platform } from 'react-native'

/* 
 * Platform hook
 */

export const usePlatform = () => {
  const isAndroid = Platform.OS === `android`
  const isIos = Platform.OS === `ios`

  return {
    isAndroid,
    isIos,
  }
}