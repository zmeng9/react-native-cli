import { Dimensions } from 'react-native'


/* 
 * Window size hook
 */

export const useWindowSize = () => {
  return Dimensions.get('window')
}